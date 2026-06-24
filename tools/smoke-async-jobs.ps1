param(
  [Parameter(Mandatory = $true)]
  [string]$FilePath,

  [string]$BaseUrl = "http://localhost:3000",
  [ValidateSet("csv", "json")]
  [string]$Format = "csv",
  [int]$LogIndex = 0,
  [int]$MaxPolls = 30,
  [int]$PollIntervalSeconds = 2,
  [switch]$UseSmartEndpoint
)

$ErrorActionPreference = "Stop"

if (!(Test-Path $FilePath)) {
  throw "Input file not found: $FilePath"
}

$resolvedFile = (Resolve-Path $FilePath).Path
$endpoint = if ($UseSmartEndpoint) { "$BaseUrl/api/blackbox/convert-smart" } else { "$BaseUrl/api/blackbox/jobs/create" }

Write-Host "Creating conversion job via $endpoint"

$form = @{
  file = Get-Item $resolvedFile
  format = $Format
  logIndex = "$LogIndex"
}

$createResponse = Invoke-RestMethod -Method Post -Uri $endpoint -Form $form

if ($UseSmartEndpoint -and $createResponse.mode -ne "async") {
  Write-Host "Smart endpoint processed synchronously (small file)."
  if ($Format -eq "json") {
    $createResponse | ConvertTo-Json -Depth 10
  } else {
    $createResponse
  }
  exit 0
}

$jobId = $createResponse.jobId
if ([string]::IsNullOrWhiteSpace($jobId)) {
  throw "No jobId returned from create endpoint"
}

Write-Host "Job created: $jobId"

$statusUrl = if ($createResponse.statusUrl) { $createResponse.statusUrl } else { "$BaseUrl/api/blackbox/jobs/status?jobId=$jobId" }
$resultUrl = if ($createResponse.resultUrl) { $createResponse.resultUrl } else { "$BaseUrl/api/blackbox/jobs/result?jobId=$jobId" }
$processUrl = if ($createResponse.processUrl) { $createResponse.processUrl } else { "$BaseUrl/api/blackbox/jobs/process?jobId=$jobId" }

for ($i = 1; $i -le $MaxPolls; $i++) {
  $status = Invoke-RestMethod -Method Get -Uri $statusUrl
  Write-Host "[$i/$MaxPolls] status=$($status.status) attempts=$($status.attempts) nextRetryAt=$($status.nextRetryAt)"

  if ($status.status -eq "completed") {
    $targetPath = Join-Path $env:TEMP ("bbl-job-result-{0}.{1}" -f $jobId, $Format)
    Invoke-WebRequest -Method Get -Uri $resultUrl -OutFile $targetPath | Out-Null
    Write-Host "Downloaded result to: $targetPath"
    exit 0
  }

  if ($status.status -eq "failed") {
    $shouldKick = $true
    if ($status.nextRetryAt) {
      try {
        $retryAt = [DateTimeOffset]::Parse($status.nextRetryAt)
        if ($retryAt -gt [DateTimeOffset]::UtcNow) {
          $shouldKick = $false
        }
      } catch {
        $shouldKick = $true
      }
    }

    if ($shouldKick) {
      Write-Host "Triggering process endpoint retry"
      try {
        Invoke-RestMethod -Method Post -Uri $processUrl | Out-Null
      } catch {
        Write-Host "Process trigger returned: $($_.Exception.Message)"
      }
    }
  }

  Start-Sleep -Seconds $PollIntervalSeconds
}

throw "Timed out waiting for completion after $MaxPolls polls"
