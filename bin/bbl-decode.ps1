param(
  [Parameter(ValueFromRemainingArguments = $true)]
  [string[]]$Args
)
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$cli = Join-Path $scriptDir "..\cli-convert.js"
node $cli @Args
