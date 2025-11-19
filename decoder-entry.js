#!/usr/bin/env node
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/flightlog_fielddefs.js
function makeReadOnly(x) {
  if (Object.freeze) {
    return Object.freeze(x);
  }
  return x;
}
function adjustFieldDefsList(firmwareType, firmwareVersion) {
  if (firmwareType === FIRMWARE_TYPE_BETAFLIGHT && semver.gte(firmwareVersion, "3.3.0")) {
    ACC_HARDWARE = ACC_HARDWARE_COMPLETE.slice(0);
    MAG_HARDWARE = MAG_HARDWARE_COMPLETE.slice(0);
    DEBUG_MODE = DEBUG_MODE_COMPLETE.slice(0);
    DEBUG_MODE.splice(DEBUG_MODE.indexOf("MIXER"), 1);
    DEBUG_MODE.splice(DEBUG_MODE.indexOf("AIRMODE"), 1);
    DEBUG_MODE.splice(DEBUG_MODE.indexOf("VELOCITY"), 1);
    DEBUG_MODE.splice(DEBUG_MODE.indexOf("DTERM_FILTER"), 1);
    if (semver.gte(firmwareVersion, "3.4.0")) {
      DEBUG_MODE.splice(DEBUG_MODE.indexOf("GYRO"), 1, "GYRO_FILTERED");
      DEBUG_MODE.splice(DEBUG_MODE.indexOf("NOTCH"), 1, "GYRO_SCALED");
    }
    if (semver.gte(firmwareVersion, "4.0.0")) {
      DEBUG_MODE.splice(DEBUG_MODE.indexOf("GYRO_RAW"), 0, "RX_SFHSS_SPI");
    }
    if (semver.gte(firmwareVersion, "4.1.0")) {
      DEBUG_MODE.splice(DEBUG_MODE.indexOf("DUAL_GYRO"), 1);
      DEBUG_MODE.splice(DEBUG_MODE.indexOf("DUAL_GYRO_COMBINED"), 1);
    }
    if (semver.gte(firmwareVersion, "4.3.0")) {
      DEBUG_MODE.splice(DEBUG_MODE.indexOf("FF_INTERPOLATED"), 1, "FEEDFORWARD");
      DEBUG_MODE.splice(DEBUG_MODE.indexOf("FF_LIMIT"), 1, "FEEDFORWARD_LIMIT");
    }
    if (semver.gte(firmwareVersion, "4.5.0")) {
      MAG_HARDWARE.splice(MAG_HARDWARE.indexOf("LIS3MDL"), 0, "LIS2MDL");
      MAG_HARDWARE.push("IST8310");
    }
    if (semver.lt(firmwareVersion, "2025.12.0")) {
      DEBUG_MODE.splice(DEBUG_MODE.indexOf("D_MAX"), 1, "D_MIN");
    }
    if (semver.gte(firmwareVersion, "2025.12.0")) {
      ACC_HARDWARE.splice(ACC_HARDWARE.indexOf("ADXL345"), 1);
      ACC_HARDWARE.splice(ACC_HARDWARE.indexOf("MMA8452"), 1);
      ACC_HARDWARE.splice(ACC_HARDWARE.indexOf("BMA280"), 1);
      ACC_HARDWARE.splice(ACC_HARDWARE.indexOf("LSM303DLHC"), 1);
      ACC_HARDWARE.splice(ACC_HARDWARE.indexOf("LSM6DSV16X") + 1, 0, "IIM42653");
      DEBUG_MODE.splice(DEBUG_MODE.indexOf("GPS_RESCUE_THROTTLE_PID"), 1, "AUTOPILOT_ALTITUDE");
      DEBUG_MODE.splice(DEBUG_MODE.indexOf("GYRO_SCALED"), 1);
      DEBUG_MODE.splice(DEBUG_MODE.indexOf("RANGEFINDER_QUALITY") + 1, 0, "OPTICALFLOW");
      DEBUG_MODE.push(
        "TPA",
        "S_TERM",
        "SPA",
        "TASK",
        "GIMBAL",
        "WING_SETPOINT",
        "AUTOPILOT_POSITION",
        "CHIRP",
        "FLASH_TEST_PRBS",
        "MAVLINK_TELEMETRY"
      );
    }
    if (semver.gte(firmwareVersion, "2025.12.0")) {
      DEBUG_MODE.splice(DEBUG_MODE.indexOf("DUAL_GYRO_RAW"), 1, "MULTI_GYRO_RAW");
      DEBUG_MODE.splice(DEBUG_MODE.indexOf("DUAL_GYRO_DIFF"), 1, "MULTI_GYRO_DIFF");
      DEBUG_MODE.splice(DEBUG_MODE.indexOf("DUAL_GYRO_SCALED"), 1, "MULTI_GYRO_SCALED");
    }
    ACC_HARDWARE = makeReadOnly(ACC_HARDWARE);
    MAG_HARDWARE = makeReadOnly(MAG_HARDWARE);
    DEBUG_MODE = makeReadOnly(DEBUG_MODE);
    if (semver.gte(firmwareVersion, "2025.12.0")) {
      FLIGHT_LOG_FLIGHT_MODE_NAME = FLIGHT_LOG_FLIGHT_MODE_NAME_POST_4_5.slice(0);
    } else {
      FLIGHT_LOG_FLIGHT_MODE_NAME = FLIGHT_LOG_FLIGHT_MODE_NAME_POST_3_3.slice(0);
      if (semver.lt(firmwareVersion, "3.4.0")) {
        FLIGHT_LOG_FLIGHT_MODE_NAME.splice(
          FLIGHT_LOG_FLIGHT_MODE_NAME.indexOf("GPSRESCUE"),
          1
        );
      }
      if (semver.gte(firmwareVersion, "3.5.0")) {
        FLIGHT_LOG_FLIGHT_MODE_NAME.splice(
          FLIGHT_LOG_FLIGHT_MODE_NAME.indexOf("RANGEFINDER"),
          1
        );
        FLIGHT_LOG_FLIGHT_MODE_NAME.splice(
          FLIGHT_LOG_FLIGHT_MODE_NAME.indexOf("CAMTRIG"),
          1
        );
        FLIGHT_LOG_FLIGHT_MODE_NAME.splice(
          FLIGHT_LOG_FLIGHT_MODE_NAME.indexOf("LEDMAX"),
          1
        );
        FLIGHT_LOG_FLIGHT_MODE_NAME.splice(
          FLIGHT_LOG_FLIGHT_MODE_NAME.indexOf("LLIGHTS"),
          1
        );
        FLIGHT_LOG_FLIGHT_MODE_NAME.splice(
          FLIGHT_LOG_FLIGHT_MODE_NAME.indexOf("GOV"),
          1
        );
        FLIGHT_LOG_FLIGHT_MODE_NAME.splice(
          FLIGHT_LOG_FLIGHT_MODE_NAME.indexOf("GTUNE"),
          1
        );
      }
      if (semver.gte(firmwareVersion, "4.0.0")) {
        FLIGHT_LOG_FLIGHT_MODE_NAME.splice(
          FLIGHT_LOG_FLIGHT_MODE_NAME.indexOf("BARO"),
          1
        );
        FLIGHT_LOG_FLIGHT_MODE_NAME.splice(
          FLIGHT_LOG_FLIGHT_MODE_NAME.indexOf("GPSHOME"),
          1
        );
        FLIGHT_LOG_FLIGHT_MODE_NAME.splice(
          FLIGHT_LOG_FLIGHT_MODE_NAME.indexOf("GPSHOLD"),
          1
        );
      }
    }
    FLIGHT_LOG_FLIGHT_MODE_NAME = makeReadOnly(FLIGHT_LOG_FLIGHT_MODE_NAME);
  } else {
    DEBUG_MODE = DEBUG_MODE_COMPLETE;
    FLIGHT_LOG_FLIGHT_MODE_NAME = FLIGHT_LOG_FLIGHT_MODE_NAME_PRE_3_3.slice(0);
    if (firmwareType === FIRMWARE_TYPE_BETAFLIGHT && semver.lte(firmwareVersion, "3.1.6")) {
      FLIGHT_LOG_FLIGHT_MODE_NAME.splice(
        FLIGHT_LOG_FLIGHT_MODE_NAME.indexOf("ANTIGRAVITY"),
        1
      );
    }
    FLIGHT_LOG_FLIGHT_MODE_NAME = makeReadOnly(FLIGHT_LOG_FLIGHT_MODE_NAME);
  }
}
var MAX_MOTOR_NUMBER, DSHOT_MIN_VALUE, DSHOT_MAX_VALUE, DSHOT_RANGE, FlightLogEvent, AXIS, FLIGHT_LOG_FLIGHT_MODE_NAME, FLIGHT_LOG_FLIGHT_MODE_NAME_PRE_3_3, FLIGHT_LOG_FLIGHT_MODE_NAME_POST_3_3, FLIGHT_LOG_FLIGHT_MODE_NAME_POST_4_5, FLIGHT_LOG_FEATURES, OFF_ON, FAST_PROTOCOL, MOTOR_SYNC, SERIALRX_PROVIDER, ANTI_GRAVITY_MODE, RC_SMOOTHING_TYPE, RC_SMOOTHING_MODE, RC_SMOOTHING_DEBUG_AXIS, FILTER_TYPE, DEBUG_MODE, DEBUG_MODE_COMPLETE, SUPER_EXPO_YAW, GYRO_LPF, GYRO_HARDWARE_LPF, GYRO_32KHZ_HARDWARE_LPF, ACC_HARDWARE, ACC_HARDWARE_COMPLETE, BARO_HARDWARE, MAG_HARDWARE, MAG_HARDWARE_COMPLETE, FLIGHT_LOG_FLIGHT_STATE_NAME, FLIGHT_LOG_FAILSAFE_PHASE_NAME, FFT_CALC_STEPS, ITERM_RELAX, ITERM_RELAX_TYPE, FLIGHT_LOG_DISARM_REASON, RATES_TYPE, GYRO_TO_USE, FF_AVERAGING, SIMPLIFIED_PIDS_MODE, THROTTLE_LIMIT_TYPE;
var init_flightlog_fielddefs = __esm({
  "src/flightlog_fielddefs.js"() {
    MAX_MOTOR_NUMBER = 8;
    DSHOT_MIN_VALUE = 48;
    DSHOT_MAX_VALUE = 2047;
    DSHOT_RANGE = DSHOT_MAX_VALUE - DSHOT_MIN_VALUE;
    FlightLogEvent = makeReadOnly({
      SYNC_BEEP: 0,
      AUTOTUNE_CYCLE_START: 10,
      AUTOTUNE_CYCLE_RESULT: 11,
      AUTOTUNE_TARGETS: 12,
      INFLIGHT_ADJUSTMENT: 13,
      LOGGING_RESUME: 14,
      DISARM: 15,
      GTUNE_CYCLE_RESULT: 20,
      FLIGHT_MODE: 30,
      TWITCH_TEST: 40,
      // Feature for latency testing
      CUSTOM: 250,
      // Virtual Event Code - Never part of Log File.
      CUSTOM_BLANK: 251,
      // Virtual Event Code - Never part of Log File. - No line shown
      LOG_END: 255
    });
    AXIS = makeReadOnly({
      ROLL: 0,
      PITCH: 1,
      YAW: 2
    });
    FLIGHT_LOG_FLIGHT_MODE_NAME = [];
    FLIGHT_LOG_FLIGHT_MODE_NAME_PRE_3_3 = makeReadOnly([
      "ARM",
      "ANGLE",
      "HORIZON",
      "BARO",
      "ANTIGRAVITY",
      "MAG",
      "HEADFREE",
      "HEADADJ",
      "CAMSTAB",
      "CAMTRIG",
      "GPSHOME",
      "GPSHOLD",
      "PASSTHRU",
      "BEEPER",
      "LEDMAX",
      "LEDLOW",
      "LLIGHTS",
      "CALIB",
      "GOV",
      "OSD",
      "TELEMETRY",
      "GTUNE",
      "SONAR",
      "SERVO1",
      "SERVO2",
      "SERVO3",
      "BLACKBOX",
      "FAILSAFE",
      "AIRMODE",
      "3DDISABLE",
      "FPVANGLEMIX",
      "BLACKBOXERASE",
      "CAMERA1",
      "CAMERA2",
      "CAMERA3",
      "FLIPOVERAFTERCRASH",
      "PREARM"
    ]);
    FLIGHT_LOG_FLIGHT_MODE_NAME_POST_3_3 = makeReadOnly([
      "ARM",
      "ANGLE",
      "HORIZON",
      "MAG",
      "BARO",
      "GPSHOME",
      "GPSHOLD",
      "HEADFREE",
      "PASSTHRU",
      "RANGEFINDER",
      "FAILSAFE",
      "GPSRESCUE",
      "ANTIGRAVITY",
      "HEADADJ",
      "CAMSTAB",
      "CAMTRIG",
      "BEEPER",
      "LEDMAX",
      "LEDLOW",
      "LLIGHTS",
      "CALIB",
      "GOV",
      "OSD",
      "TELEMETRY",
      "GTUNE",
      "SERVO1",
      "SERVO2",
      "SERVO3",
      "BLACKBOX",
      "AIRMODE",
      "3D",
      "FPVANGLEMIX",
      "BLACKBOXERASE",
      "CAMERA1",
      "CAMERA2",
      "CAMERA3",
      "FLIPOVERAFTERCRASH",
      "PREARM",
      "BEEPGPSCOUNT",
      "VTXPITMODE",
      "USER1",
      "USER2",
      "USER3",
      "USER4",
      "PIDAUDIO",
      "ACROTRAINER",
      "VTXCONTROLDISABLE",
      "LAUNCHCONTROL"
    ]);
    FLIGHT_LOG_FLIGHT_MODE_NAME_POST_4_5 = makeReadOnly([
      "ARM",
      "ANGLE",
      "HORIZON",
      "MAG",
      "ALTHOLD",
      "HEADFREE",
      "CHIRP",
      "PASSTHRU",
      "FAILSAFE",
      "POSHOLD",
      "GPSRESCUE",
      "ANTIGRAVITY",
      "HEADADJ",
      "CAMSTAB",
      "BEEPER",
      "LEDLOW",
      "CALIB",
      "OSD",
      "TELEMETRY",
      "SERVO1",
      "SERVO2",
      "SERVO3",
      "BLACKBOX",
      "AIRMODE",
      "3D",
      "FPVANGLEMIX",
      "BLACKBOXERASE",
      "CAMERA1",
      "CAMERA2",
      "CAMERA3",
      "FLIPOVERAFTERCRASH",
      "PREARM",
      "BEEPGPSCOUNT",
      "VTXPITMODE",
      "USER1",
      "USER2",
      "USER3",
      "USER4",
      "PIDAUDIO",
      "ACROTRAINER",
      "VTXCONTROLDISABLE",
      "LAUNCHCONTROL"
    ]);
    FLIGHT_LOG_FEATURES = makeReadOnly([
      "RX_PPM",
      "VBAT",
      "INFLIGHT_ACC_CAL",
      "RX_SERIAL",
      "MOTOR_STOP",
      "SERVO_TILT",
      "SOFTSERIAL",
      "GPS",
      "FAILSAFE",
      "SONAR",
      "TELEMETRY",
      "CURRENT_METER",
      "3D",
      "RX_PARALLEL_PWM",
      "RX_MSP",
      "RSSI_ADC",
      "LED_STRIP",
      "DISPLAY",
      "ONESHOT125",
      "BLACKBOX",
      "CHANNEL_FORWARDING",
      "TRANSPONDER",
      "AIRMODE",
      "SUPEREXPO_RATES"
    ]);
    OFF_ON = makeReadOnly(["OFF", "ON"]);
    FAST_PROTOCOL = makeReadOnly([
      "PWM",
      "ONESHOT125",
      "ONESHOT42",
      "MULTISHOT",
      "BRUSHED",
      "DSHOT150",
      "DSHOT300",
      "DSHOT600",
      "DSHOT1200",
      //deprecated
      "PROSHOT1000"
    ]);
    MOTOR_SYNC = makeReadOnly(["SYNCED", "UNSYNCED"]);
    SERIALRX_PROVIDER = makeReadOnly([
      "SPEK1024",
      "SPEK2048",
      "SBUS",
      "SUMD",
      "SUMH",
      "XB-B",
      "XB-B-RJ01",
      "IBUS",
      "JETIEXBUS",
      "CRSF",
      "SRXL",
      "CUSTOM",
      "FPORT",
      "SRXL2",
      "GHST"
    ]);
    ANTI_GRAVITY_MODE = makeReadOnly(["SMOOTH", "STEP"]);
    RC_SMOOTHING_TYPE = makeReadOnly(["INTERPOLATION", "FILTER"]);
    RC_SMOOTHING_MODE = makeReadOnly(["OFF", "ON"]);
    RC_SMOOTHING_DEBUG_AXIS = makeReadOnly([
      "ROLL",
      "PITCH",
      "YAW",
      "THROTTLE"
    ]);
    FILTER_TYPE = makeReadOnly(["PT1", "BIQUAD", "PT2", "PT3"]);
    DEBUG_MODE = [];
    DEBUG_MODE_COMPLETE = makeReadOnly([
      "NONE",
      "CYCLETIME",
      "BATTERY",
      "GYRO",
      // deprecated (GYRO_FILTERED)
      "ACCELEROMETER",
      "MIXER",
      // deprecated
      "AIRMODE",
      // deprecated
      "PIDLOOP",
      "NOTCH",
      // deprecated (GYRO_SCALED)
      "RC_INTERPOLATION",
      "VELOCITY",
      // deprecated
      "DTERM_FILTER",
      // deprecated
      "ANGLERATE",
      "ESC_SENSOR",
      "SCHEDULER",
      "STACK",
      "ESC_SENSOR_RPM",
      "ESC_SENSOR_TMP",
      "ALTITUDE",
      "FFT",
      "FFT_TIME",
      "FFT_FREQ",
      "RX_FRSKY_SPI",
      "GYRO_RAW",
      // deprecated
      "DUAL_GYRO",
      // deprecated
      "DUAL_GYRO_RAW",
      "DUAL_GYRO_COMBINED",
      // deprecated
      "DUAL_GYRO_DIFF",
      "MAX7456_SIGNAL",
      "MAX7456_SPICLOCK",
      "SBUS",
      "FPORT",
      "RANGEFINDER",
      "RANGEFINDER_QUALITY",
      "LIDAR_TF",
      "ADC_INTERNAL",
      "RUNAWAY_TAKEOFF",
      "SDIO",
      "CURRENT_SENSOR",
      "USB",
      "SMARTAUDIO",
      "RTH",
      "ITERM_RELAX",
      "ACRO_TRAINER",
      "RC_SMOOTHING",
      "RX_SIGNAL_LOSS",
      "RC_SMOOTHING_RATE",
      "ANTI_GRAVITY",
      "DYN_LPF",
      "RX_SPECTRUM_SPI",
      "DSHOT_RPM_TELEMETRY",
      "RPM_FILTER",
      "D_MAX",
      "AC_CORRECTION",
      "AC_ERROR",
      "DUAL_GYRO_SCALED",
      "DSHOT_RPM_ERRORS",
      "CRSF_LINK_STATISTICS_UPLINK",
      "CRSF_LINK_STATISTICS_PWR",
      "CRSF_LINK_STATISTICS_DOWN",
      "BARO",
      "GPS_RESCUE_THROTTLE_PID",
      "DYN_IDLE",
      "FF_LIMIT",
      // deprecated (FEEDFORWARD_LIMIT)
      "FF_INTERPOLATED",
      // deprecated (FEEDFORWARD)
      "BLACKBOX_OUTPUT",
      "GYRO_SAMPLE",
      "RX_TIMING",
      "D_LPF",
      "VTX_TRAMP",
      "GHST",
      "GHST_MSP",
      "SCHEDULER_DETERMINISM",
      "TIMING_ACCURACY",
      "RX_EXPRESSLRS_SPI",
      "RX_EXPRESSLRS_PHASELOCK",
      "RX_STATE_TIME",
      "GPS_RESCUE_VELOCITY",
      "GPS_RESCUE_HEADING",
      "GPS_RESCUE_TRACKING",
      "GPS_CONNECTION",
      "ATTITUDE",
      "VTX_MSP",
      "GPS_DOP",
      "FAILSAFE",
      "GYRO_CALIBRATION",
      "ANGLE_MODE",
      "ANGLE_TARGET",
      "CURRENT_ANGLE",
      "DSHOT_TELEMETRY_COUNTS",
      "RPM_LIMIT",
      "RC_STATS",
      "MAG_CALIB",
      "MAG_TASK_RATE",
      "EZLANDING"
    ]);
    SUPER_EXPO_YAW = makeReadOnly(["OFF", "ON", "ALWAYS"]);
    GYRO_LPF = makeReadOnly([
      "OFF",
      "188HZ",
      "98HZ",
      "42HZ",
      "20HZ",
      "10HZ",
      "5HZ",
      "EXPERIMENTAL"
    ]);
    GYRO_HARDWARE_LPF = makeReadOnly([
      "NORMAL",
      "EXPERIMENTAL",
      "1KHZ_SAMPLING"
    ]);
    GYRO_32KHZ_HARDWARE_LPF = makeReadOnly(["NORMAL", "EXPERIMENTAL"]);
    ACC_HARDWARE = [];
    ACC_HARDWARE_COMPLETE = makeReadOnly([
      "AUTO",
      "NONE",
      "ADXL345",
      "MPU6050",
      "MMA8452",
      "BMA280",
      "LSM303DLHC",
      "MPU6000",
      "MPU6500",
      "MPU9250",
      "ICM20601",
      "ICM20602",
      "ICM20608G",
      "ICM20649",
      "ICM20689",
      "ICM42605",
      "ICM42688P",
      "BMI160",
      "BMI270",
      "LSM6DSO",
      "LSM6DSV16X",
      "VIRTUAL"
    ]);
    BARO_HARDWARE = makeReadOnly([
      "AUTO",
      "NONE",
      "BMP085",
      "MS5611",
      "BMP280",
      "LPS",
      "QMP6988",
      "BMP388",
      "DPS310",
      "2SMPB_02B"
    ]);
    MAG_HARDWARE = [];
    MAG_HARDWARE_COMPLETE = makeReadOnly([
      "AUTO",
      "NONE",
      "HMC5883",
      "AK8975",
      "AK8963",
      "QMC5883",
      "LIS3MDL",
      "MAG_MPU925X_AK8963"
    ]);
    FLIGHT_LOG_FLIGHT_STATE_NAME = makeReadOnly([
      "GPS_FIX_HOME",
      "GPS_FIX",
      "CALIBRATE_MAG",
      "SMALL_ANGLE",
      "FIXED_WING"
    ]);
    FLIGHT_LOG_FAILSAFE_PHASE_NAME = makeReadOnly([
      "IDLE",
      "RX_LOSS_DETECTED",
      "LANDING",
      "LANDED"
    ]);
    FFT_CALC_STEPS = makeReadOnly([
      "ARM_CFFT_F32",
      "BITREVERSAL",
      "STAGE_RFFT_F32",
      "ARM_CMPLX_MAG_F32",
      "CALC_FREQUENCIES",
      "UPDATE_FILTERS",
      "HANNING"
    ]);
    ITERM_RELAX = makeReadOnly([
      "OFF",
      "RP",
      "RPY",
      "RP_INC",
      "RPY_INC"
    ]);
    ITERM_RELAX_TYPE = makeReadOnly(["GYRO", "SETPOINT"]);
    FLIGHT_LOG_DISARM_REASON = makeReadOnly([
      "ARMING_DISABLED",
      "FAILSAFE",
      "THROTTLE_TIMEOUT",
      "STICKS",
      "SWITCH",
      "CRASH_PROTECTION",
      "RUNAWAY_TAKEOFF",
      "GPS_RESCUE",
      "SERIAL_IO"
    ]);
    RATES_TYPE = makeReadOnly([
      "BETAFLIGHT",
      "RACEFLIGHT",
      "KISS",
      "ACTUAL",
      "QUICK"
    ]);
    GYRO_TO_USE = makeReadOnly(["FIRST", "SECOND", "BOTH"]);
    FF_AVERAGING = makeReadOnly([
      "OFF",
      "2_POINT",
      "3_POINT",
      "4_POINT"
    ]);
    SIMPLIFIED_PIDS_MODE = makeReadOnly([
      "OFF",
      "ON - RP",
      "ON - RPY"
    ]);
    THROTTLE_LIMIT_TYPE = makeReadOnly(["OFF", "SCALE", "CLIP"]);
  }
});

// src/tools.js
function hexToFloat(string) {
  let arr = new Uint32Array(1);
  arr[0] = parseInt(string, 16);
  let floatArr = new Float32Array(arr.buffer);
  return floatArr[0];
}
function uint32ToFloat(value) {
  let arr = new Uint32Array(1);
  arr[0] = value;
  let floatArr = new Float32Array(arr.buffer);
  return floatArr[0];
}
function asciiArrayToString(arr) {
  return String.fromCharCode.apply(null, arr);
}
function asciiStringToByteArray(s) {
  let bytes = [];
  for (let i = 0; i < s.length; i++) bytes.push(s.charCodeAt(i));
  return bytes;
}
function signExtend24Bit(u) {
  return u & 8388608 ? u | 4278190080 : u;
}
function signExtend16Bit(word) {
  return word & 32768 ? word | 4294901760 : word;
}
function signExtend14Bit(word) {
  return word & 8192 ? word | 4294950912 : word;
}
function signExtend8Bit(byte) {
  return byte & 128 ? byte | 4294967040 : byte;
}
function signExtend7Bit(byte) {
  return byte & 64 ? byte | 4294967168 : byte;
}
function signExtend6Bit(byte) {
  return byte & 32 ? byte | 4294967232 : byte;
}
function signExtend5Bit(byte) {
  return byte & 16 ? byte | 4294967264 : byte;
}
function signExtend4Bit(nibble) {
  return nibble & 8 ? nibble | 4294967280 : nibble;
}
function signExtend2Bit(byte) {
  return byte & 2 ? byte | 4294967292 : byte;
}
function stringHasComma(string) {
  return string.match(/.*,.*/) != null;
}
function parseCommaSeparatedString(string, length) {
  let parts = string.split(","), result, value;
  length = length || parts.length;
  if (length < 2) {
    value = parts.indexOf(".") ? parseFloat(parts) : parseInt(parts, 10);
    return isNaN(value) ? string : value;
  } else {
    result = new Array(length);
    for (let i = 0; i < length; i++) {
      if (i < parts.length) {
        value = parts[i].indexOf(".") ? parseFloat(parts[i]) : parseInt(parts[i], 10);
        result[i] = isNaN(value) ? parts[i] : value;
      } else {
        result[i] = null;
      }
    }
    return result;
  }
}
function binarySearchOrPrevious(list, item) {
  let min = 0, max = list.length, mid, result = 0;
  while (min < max) {
    mid = Math.floor((min + max) / 2);
    if (list[mid] === item) return mid;
    else if (list[mid] < item) {
      result = mid;
      min = mid + 1;
    } else max = mid;
  }
  return result;
}
function binarySearchOrNext(list, item) {
  let min = 0, max = list.length, mid, result = list.length - 1;
  while (min < max) {
    mid = Math.floor((min + max) / 2);
    if (list[mid] === item) return mid;
    else if (list[mid] > item) {
      max = mid;
      result = mid;
    } else min = mid + 1;
  }
  return result;
}
function leftPad(string, pad, minLength) {
  string = `${string}`;
  while (string.length < minLength) string = pad + string;
  return string;
}
function formatTime(msec, displayMsec) {
  let ms, secs, mins, hours;
  ms = Math.round(Math.abs(msec));
  secs = Math.floor(ms / 1e3);
  ms %= 1e3;
  mins = Math.floor(secs / 60);
  secs %= 60;
  hours = Math.floor(mins / 60);
  mins %= 60;
  return `${(msec < 0 ? "-" : "") + (hours ? `${leftPad(hours, "0", 2)}:` : "") + leftPad(mins, "0", 2)}:${leftPad(secs, "0", 2)}${displayMsec ? `.${leftPad(ms, "0", 3)}` : ""}`;
}
function constrain(value, min, max) {
  return Math.max(min, Math.min(value, max));
}
function validate(value, defaultValue) {
  return value != null ? value : defaultValue;
}
function firmwareGreaterOrEqual(sysConfig, bf_version, cf_version) {
  if (cf_version === void 0) {
    return sysConfig.firmwareType == FIRMWARE_TYPE_BETAFLIGHT && semver.gte(sysConfig.firmwareVersion, bf_version);
  } else {
    return sysConfig.firmwareType == FIRMWARE_TYPE_BETAFLIGHT && semver.gte(sysConfig.firmwareVersion, bf_version) || sysConfig.firmwareType == FIRMWARE_TYPE_CLEANFLIGHT && semver.gte(sysConfig.firmwareVersion, cf_version);
  }
}
var mouseNotification;
var init_tools = __esm({
  "src/tools.js"() {
    if (typeof globalThis.$ === "undefined") {
      globalThis.$ = function(selector) {
        return {
          length: 0,
          addClass: function() {
            return this;
          },
          removeClass: function() {
            return this;
          },
          toggleClass: function() {
            return this;
          },
          css: function() {
            return this;
          },
          html: function() {
            return this;
          },
          text: function() {
            return this;
          },
          append: function() {
            return this;
          },
          remove: function() {
            return this;
          },
          show: function() {
            return this;
          },
          hide: function() {
            return this;
          },
          on: function() {
            return this;
          },
          off: function() {
            return this;
          },
          trigger: function() {
            return this;
          },
          val: function() {
            return "";
          },
          attr: function() {
            return "";
          },
          prop: function() {
            return false;
          },
          data: function() {
            return null;
          },
          each: function() {
            return this;
          }
        };
      };
      globalThis.$.extend = Object.assign;
      globalThis.$.isArray = Array.isArray;
      globalThis.$.isFunction = (x) => typeof x === "function";
      globalThis.$.map = (arr, fn) => arr.map(fn);
    }
    if (typeof globalThis.semver === "undefined") {
      globalThis.semver = {
        gte: function(v1, v2) {
          const parseVersion = (v) => {
            if (typeof v !== "string") return [0, 0, 0];
            return v.split(".").map((x) => parseInt(x) || 0);
          };
          const a = parseVersion(v1);
          const b = parseVersion(v2);
          for (let i = 0; i < 3; i++) {
            if (a[i] > b[i]) return true;
            if (a[i] < b[i]) return false;
          }
          return true;
        },
        lte: function(v1, v2) {
          return !this.gt(v1, v2);
        },
        gt: function(v1, v2) {
          const parseVersion = (v) => {
            if (typeof v !== "string") return [0, 0, 0];
            return v.split(".").map((x) => parseInt(x) || 0);
          };
          const a = parseVersion(v1);
          const b = parseVersion(v2);
          for (let i = 0; i < 3; i++) {
            if (a[i] > b[i]) return true;
            if (a[i] < b[i]) return false;
          }
          return false;
        },
        lt: function(v1, v2) {
          return !this.gte(v1, v2);
        }
      };
    }
    mouseNotification = {
      enabled: true,
      elem: $(".mouseNotification"),
      timeout: null,
      show: function(target, x, y, message, delay, messageClass, align, margin) {
        if (!this.enabled) return false;
        this.elem = this.elem || $(".mouseNotification");
        messageClass = messageClass || "mouseNotification-box";
        margin = margin || 10;
        let mouseNotificationElem = $("#mouse-notification");
        if (mouseNotificationElem.length != 0) {
          clearTimeout(this.timeout);
          mouseNotificationElem.replaceWith(
            `<div class="${messageClass}" id="mouse-notification">${message}</div>`
          );
        } else {
          this.elem.append(
            `<div class="${messageClass}" id="mouse-notification">${message}</div>`
          );
        }
        this.timeout = setTimeout(function() {
          $("#mouse-notification").remove();
        }, delay || 1e3);
        let popupRect = $(this.elem).get(0).getBoundingClientRect();
        let targetRect = $(target).get(0).getBoundingClientRect();
        let left = 0, top = 0;
        if (align != null) {
          if (align.indexOf("right") !== -1) {
            left = targetRect.width - (popupRect.width + margin);
          } else if (align.indexOf("center") !== -1) {
            left = targetRect.width / 2 - (popupRect.width + margin) / 2;
          } else {
            left = margin;
          }
          if (align.indexOf("bottom") !== -1) {
            top = targetRect.height - (popupRect.height + margin);
          } else if (align.indexOf("middle") !== -1) {
            top = targetRect.height / 2 - (popupRect.height + margin) / 2;
          } else {
            top = margin;
          }
          this.elem.css("left", left);
          this.elem.css("top", top);
        } else {
          this.elem.css("left", (x || 0) - targetRect.left + margin);
          this.elem.css("top", (y || 0) - targetRect.top + margin);
        }
        popupRect = $(this.elem).get(0).getBoundingClientRect();
        if (popupRect.right > targetRect.right - margin) {
          this.elem.css("left", targetRect.right - popupRect.width - margin);
        }
        return true;
      }
    };
  }
});

// src/flightlog_fields_presenter.js
function FlightLogFieldPresenter() {
}
var FRIENDLY_FIELD_NAMES, DEBUG_FRIENDLY_FIELD_NAMES_INITIAL, DEBUG_FRIENDLY_FIELD_NAMES;
var init_flightlog_fields_presenter = __esm({
  "src/flightlog_fields_presenter.js"() {
    init_flightlog_fielddefs();
    init_tools();
    FRIENDLY_FIELD_NAMES = {
      "axisP[all]": "PID P",
      "axisP[0]": "PID P [roll]",
      "axisP[1]": "PID P [pitch]",
      "axisP[2]": "PID P [yaw]",
      "axisI[all]": "PID I",
      "axisI[0]": "PID I [roll]",
      "axisI[1]": "PID I [pitch]",
      "axisI[2]": "PID I [yaw]",
      "axisD[all]": "PID D",
      "axisD[0]": "PID D [roll]",
      "axisD[1]": "PID D [pitch]",
      "axisD[2]": "PID D [yaw]",
      "axisF[all]": "PID Feedforward",
      "axisF[0]": "PID Feedforward [roll]",
      "axisF[1]": "PID Feedforward [pitch]",
      "axisF[2]": "PID Feedforward [yaw]",
      "axisS[all]": "PID S",
      "axisS[0]": "PID S [roll]",
      "axisS[1]": "PID S [pitch]",
      "axisS[2]": "PID S [yaw]",
      //Virtual field
      "axisSum[all]": "PID Sum",
      "axisSum[0]": "PID Sum [roll]",
      "axisSum[1]": "PID Sum [pitch]",
      "axisSum[2]": "PID Sum [yaw]",
      //Virtual field
      "axisError[all]": "PID Error",
      "axisError[0]": "PID Error [roll]",
      "axisError[1]": "PID Error [pitch]",
      "axisError[2]": "PID Error [yaw]",
      //Virtual field
      "rcCommands[all]": "Setpoints",
      "rcCommands[0]": "Setpoint [roll]",
      "rcCommands[1]": "Setpoint [pitch]",
      "rcCommands[2]": "Setpoint [yaw]",
      "rcCommands[3]": "Setpoint [throttle]",
      "rcCommand[all]": "RC Commands",
      "rcCommand[0]": "RC Command [roll]",
      "rcCommand[1]": "RC Command [pitch]",
      "rcCommand[2]": "RC Command [yaw]",
      "rcCommand[3]": "RC Command [throttle]",
      "gyroADC[all]": "Gyros",
      "gyroADC[0]": "Gyro [roll]",
      "gyroADC[1]": "Gyro [pitch]",
      "gyroADC[2]": "Gyro [yaw]",
      "gyroUnfilt[all]": "Unfiltered Gyros",
      "gyroUnfilt[0]": "Unfiltered Gyro [roll]",
      "gyroUnfilt[1]": "Unfiltered Gyro [pitch]",
      "gyroUnfilt[2]": "Unfiltered Gyro [yaw]",
      //End-users prefer 1-based indexing
      "motor[all]": "Motors",
      "motor[0]": "Motor [1]",
      "motor[1]": "Motor [2]",
      "motor[2]": "Motor [3]",
      "motor[3]": "Motor [4]",
      "motor[4]": "Motor [5]",
      "motor[5]": "Motor [6]",
      "motor[6]": "Motor [7]",
      "motor[7]": "Motor [8]",
      "eRPM[all]": "RPM",
      "eRPM[0]": "RPM [1]",
      "eRPM[1]": "RPM [2]",
      "eRPM[2]": "RPM [3]",
      "eRPM[3]": "RPM [4]",
      "eRPM[4]": "RPM [5]",
      "eRPM[5]": "RPM [6]",
      "eRPM[6]": "RPM [7]",
      "eRPM[7]": "RPM [8]",
      "servo[all]": "Servos",
      "servo[5]": "Servo Tail",
      vbatLatest: "Battery volt.",
      amperageLatest: "Amperage",
      baroAlt: "Barometer",
      "heading[all]": "Heading",
      "heading[0]": "Heading [roll]",
      "heading[1]": "Heading [pitch]",
      "heading[2]": "Heading [yaw]",
      "accSmooth[all]": "Accel.",
      "accSmooth[0]": "Accel. [X]",
      "accSmooth[1]": "Accel. [Y]",
      "accSmooth[2]": "Accel. [Z]",
      "magADC[all]": "Compass",
      "magADC[0]": "Compass [X]",
      "magADC[1]": "Compass [Y]",
      "magADC[2]": "Compass [Z]",
      flightModeFlags: "Flight Mode Flags",
      stateFlags: "State Flags",
      failsafePhase: "Failsafe Phase",
      rxSignalReceived: "RX Signal Received",
      rxFlightChannelsValid: "RX Flight Ch. Valid",
      rssi: "RSSI",
      GPS_numSat: "GPS Sat Count",
      "GPS_coord[0]": "GPS Latitude",
      "GPS_coord[1]": "GPS Longitude",
      GPS_altitude: "GPS Altitude ASL",
      GPS_speed: "GPS Speed",
      GPS_ground_course: "GPS Heading",
      "gpsCartesianCoords[all]": "GPS Coords",
      "gpsCartesianCoords[0]": "GPS Coords [X]",
      "gpsCartesianCoords[1]": "GPS Coords [Y]",
      "gpsCartesianCoords[2]": "GPS Coords [Z]",
      gpsDistance: "GPS Home distance",
      gpsHomeAzimuth: "GPS Home azimuth"
    };
    DEBUG_FRIENDLY_FIELD_NAMES_INITIAL = {
      NONE: {
        "debug[all]": "Debug [all]",
        "debug[0]": "Debug [0]",
        "debug[1]": "Debug [1]",
        "debug[2]": "Debug [2]",
        "debug[3]": "Debug [3]",
        "debug[4]": "Debug [4]",
        "debug[5]": "Debug [5]",
        "debug[6]": "Debug [6]",
        "debug[7]": "Debug [7]"
      },
      CYCLETIME: {
        "debug[all]": "Debug Cycle Time",
        "debug[0]": "Cycle Time",
        "debug[1]": "CPU Load",
        "debug[2]": "Motor Update",
        "debug[3]": "Motor Deviation",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      BATTERY: {
        "debug[all]": "Debug Battery",
        "debug[0]": "Battery Volt ADC",
        "debug[1]": "Battery Volt",
        "debug[2]": "Not Used",
        "debug[3]": "Not Used",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      GYRO: {
        "debug[all]": "Debug Gyro",
        "debug[0]": "Gyro Raw [X]",
        "debug[1]": "Gyro Raw [Y]",
        "debug[2]": "Gyro Raw [Z]",
        "debug[3]": "Not Used",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      GYRO_FILTERED: {
        "debug[all]": "Debug Gyro Filtered",
        "debug[0]": "Gyro Filtered [X]",
        "debug[1]": "Gyro Filtered [Y]",
        "debug[2]": "Gyro Filtered [Z]",
        "debug[3]": "Not Used",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      ACCELEROMETER: {
        "debug[all]": "Debug Accel.",
        "debug[0]": "Accel. Raw [X]",
        "debug[1]": "Accel. Raw [Y]",
        "debug[2]": "Accel. Raw [Z]",
        "debug[3]": "Not Used",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      MIXER: {
        "debug[all]": "Debug Mixer",
        "debug[0]": "Roll-Pitch-Yaw Mix [0]",
        "debug[1]": "Roll-Pitch-Yaw Mix [1]",
        "debug[2]": "Roll-Pitch-Yaw Mix [2]",
        "debug[3]": "Roll-Pitch-Yaw Mix [3]",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      PIDLOOP: {
        "debug[all]": "Debug PID",
        "debug[0]": "Wait Time",
        "debug[1]": "Sub Update Time",
        "debug[2]": "PID Update Time",
        "debug[3]": "Motor Update Time",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      NOTCH: {
        "debug[all]": "Debug Notch",
        "debug[0]": "Gyro Pre-Notch [roll]",
        "debug[1]": "Gyro Pre-Notch [pitch]",
        "debug[2]": "Gyro Pre-Notch [yaw]",
        "debug[3]": "Not Used",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      GYRO_SCALED: {
        "debug[all]": "Debug Gyro Scaled",
        "debug[0]": "Gyro Scaled [roll]",
        "debug[1]": "Gyro Scaled [pitch]",
        "debug[2]": "Gyro Scaled [yaw]",
        "debug[3]": "Not Used",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      RC_INTERPOLATION: {
        "debug[all]": "Debug RC Interpolation",
        "debug[0]": "Raw RC Command [roll]",
        "debug[1]": "Current RX Refresh Rate",
        "debug[2]": "Interpolation Step Count",
        "debug[3]": "RC Setpoint [roll]",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      DTERM_FILTER: {
        "debug[all]": "Debug Filter",
        "debug[0]": "DTerm Filter [roll]",
        "debug[1]": "DTerm Filter [pitch]",
        "debug[2]": "Not Used",
        "debug[3]": "Not Used",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      ANGLERATE: {
        "debug[all]": "Debug Angle Rate",
        "debug[0]": "Angle Rate[roll]",
        "debug[1]": "Angle Rate[pitch]",
        "debug[2]": "Angle Rate[yaw]",
        "debug[3]": "Not Used",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      ESC_SENSOR: {
        "debug[all]": "ESC Sensor",
        "debug[0]": "Motor Index",
        "debug[1]": "Timeouts",
        "debug[2]": "CNC errors",
        "debug[3]": "Data age",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      SCHEDULER: {
        "debug[all]": "Scheduler",
        "debug[0]": "Not Used",
        "debug[1]": "Not Used",
        "debug[2]": "Schedule Time",
        "debug[3]": "Function Exec Time",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      STACK: {
        "debug[all]": "Stack",
        "debug[0]": "Stack High Mem",
        "debug[1]": "Stack Low Mem",
        "debug[2]": "Stack Current",
        "debug[3]": "Stack p",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      ESC_SENSOR_RPM: {
        "debug[all]": "ESC Sensor RPM",
        "debug[0]": "Motor 1",
        "debug[1]": "Motor 2",
        "debug[2]": "Motor 3",
        "debug[3]": "Motor 4",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      ESC_SENSOR_TMP: {
        "debug[all]": "ESC Sensor Temp",
        "debug[0]": "Motor 1",
        "debug[1]": "Motor 2",
        "debug[2]": "Motor 3",
        "debug[3]": "Motor 4",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      ALTITUDE: {
        "debug[all]": "Altitude",
        "debug[0]": "GPS Trust * 100",
        "debug[1]": "Baro Altitude",
        "debug[2]": "GPS Altitude",
        "debug[3]": "Vario",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      FFT: {
        "debug[all]": "Debug FFT",
        "debug[0]": "Gyro Scaled [dbg-axis]",
        "debug[1]": "Gyro Pre-Dyn [dbg-axis]",
        "debug[2]": "Gyro Downsampled [roll]",
        "debug[3]": "FFT Center Index [roll]",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      FFT_TIME: {
        "debug[all]": "Debug FFT TIME",
        "debug[0]": "Active calc step",
        "debug[1]": "Step duration",
        "debug[2]": "Additional steps",
        "debug[3]": "Not used",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      FFT_FREQ: {
        "debug[all]": "Debug FFT FREQ",
        "debug[0]": "Center Freq [roll]",
        "debug[1]": "Center Freq [pitch]",
        "debug[2]": "Gyro Pre-Dyn [dbg-axis]",
        "debug[3]": "Gyro Scaled [dbg-axis]",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      RX_FRSKY_SPI: {
        "debug[all]": "FrSky SPI Rx",
        "debug[0]": "Looptime",
        "debug[1]": "Packet",
        "debug[2]": "Missing Packets",
        "debug[3]": "State",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      RX_SFHSS_SPI: {
        "debug[all]": "SFHSS SPI Rx",
        "debug[0]": "State",
        "debug[1]": "Missing Frame",
        "debug[2]": "Offset Max",
        "debug[3]": "Offset Min",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      GYRO_RAW: {
        "debug[all]": "Debug Gyro Raw",
        "debug[0]": "Gyro Raw [X]",
        "debug[1]": "Gyro Raw [Y]",
        "debug[2]": "Gyro Raw [Z]",
        "debug[3]": "Not Used",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      DUAL_GYRO: {
        "debug[all]": "Debug Dual Gyro",
        "debug[0]": "Gyro 1 Filtered [roll]",
        "debug[1]": "Gyro 1 Filtered [pitch]",
        "debug[2]": "Gyro 2 Filtered [roll]",
        "debug[3]": "Gyro 2 Filtered [pitch]",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      DUAL_GYRO_RAW: {
        "debug[all]": "Debug Dual Gyro Raw",
        "debug[0]": "Gyro 1 Raw [roll]",
        "debug[1]": "Gyro 1 Raw [pitch]",
        "debug[2]": "Gyro 2 Raw [roll]",
        "debug[3]": "Gyro 2 Raw [pitch]",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      DUAL_GYRO_COMBINED: {
        "debug[all]": "Debug Dual Combined",
        "debug[0]": "Not Used",
        "debug[1]": "Gyro Filtered [roll]",
        "debug[2]": "Gyro Filtered [pitch]",
        "debug[3]": "Not Used",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      DUAL_GYRO_DIFF: {
        "debug[all]": "Debug Dual Gyro Diff",
        "debug[0]": "Gyro Diff [roll]",
        "debug[1]": "Gyro Diff [pitch]",
        "debug[2]": "Gyro Diff [yaw]",
        "debug[3]": "Not Used",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      MAX7456_SIGNAL: {
        "debug[all]": "Max7456 Signal",
        "debug[0]": "Mode Reg",
        "debug[1]": "Sense",
        "debug[2]": "ReInit",
        "debug[3]": "Rows",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      MAX7456_SPICLOCK: {
        "debug[all]": "Max7456 SPI Clock",
        "debug[0]": "Overclock",
        "debug[1]": "DevType",
        "debug[2]": "Divisor",
        "debug[3]": "not used",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      SBUS: {
        "debug[all]": "SBus Rx",
        "debug[0]": "Frame Flags",
        "debug[1]": "State Flags",
        "debug[2]": "Frame Time",
        "debug[3]": "not used",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      FPORT: {
        "debug[all]": "FPort Rx",
        "debug[0]": "Frame Interval",
        "debug[1]": "Frame Errors",
        "debug[2]": "Last Error",
        "debug[3]": "Telemetry Interval",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      RANGEFINDER: {
        "debug[all]": "Rangefinder",
        "debug[0]": "not used",
        "debug[1]": "Raw Altitude",
        "debug[2]": "Calc Altituded",
        "debug[3]": "SNR",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      RANGEFINDER_QUALITY: {
        "debug[all]": "Rangefinder Quality",
        "debug[0]": "Raw Altitude",
        "debug[1]": "SNR Threshold Reached",
        "debug[2]": "Dyn Distance Threshold",
        "debug[3]": "Is Surface Altitude Valid",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      LIDAR_TF: {
        "debug[all]": "Lidar TF",
        "debug[0]": "Distance",
        "debug[1]": "Strength",
        "debug[2]": "TF Frame (4)",
        "debug[3]": "TF Frame (5)",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      ADC_INTERNAL: {
        "debug[all]": "ADC Internal",
        "debug[0]": "Core Temp",
        "debug[1]": "VRef Internal Sample",
        "debug[2]": "Temp Sensor Sample",
        "debug[3]": "Vref mV",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      RUNAWAY_TAKEOFF: {
        "debug[all]": "Runaway Takeoff",
        "debug[0]": "Enabled",
        "debug[1]": "Activating Delay",
        "debug[2]": "Deactivating Delay",
        "debug[3]": "Deactivating Time",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      CURRENT_SENSOR: {
        "debug[all]": "Current Sensor",
        "debug[0]": "milliVolts",
        "debug[1]": "centiAmps",
        "debug[2]": "Amps Latest",
        "debug[3]": "mAh Drawn",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      USB: {
        "debug[all]": "USB",
        "debug[0]": "Cable In",
        "debug[1]": "VCP Connected",
        "debug[2]": "not used",
        "debug[3]": "not used",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      "SMART AUDIO": {
        "debug[all]": "Smart Audio VTx",
        "debug[0]": "Device + Version",
        "debug[1]": "Channel",
        "debug[2]": "Frequency",
        "debug[3]": "Power",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      RTH: {
        "debug[all]": "RTH",
        "debug[0]": "Rescue Throttle",
        "debug[1]": "Rescue Angle",
        "debug[2]": "Altitude Adjustment",
        "debug[3]": "Rescue State",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      ITERM_RELAX: {
        "debug[all]": "I-term Relax",
        "debug[0]": "Setpoint HPF [roll]",
        "debug[1]": "I Relax Factor [roll]",
        "debug[2]": "Relaxed I Error [roll]",
        "debug[3]": "Axis Error [roll]",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      ACRO_TRAINER: {
        "debug[all]": "Acro Trainer (a_t_axis)",
        "debug[0]": "Current Angle * 10 [deg]",
        "debug[1]": "Axis State",
        "debug[2]": "Correction amount",
        "debug[3]": "Projected Angle * 10 [deg]",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      RC_SMOOTHING: {
        "debug[all]": "Debug RC Smoothing",
        "debug[0]": "Raw RC Command",
        "debug[1]": "Raw RC Derivative",
        "debug[2]": "Smoothed RC Derivative",
        "debug[3]": "RX Refresh Rate",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      RX_SIGNAL_LOSS: {
        "debug[all]": "Rx Signal Loss",
        "debug[0]": "Signal Received",
        "debug[1]": "Failsafe",
        "debug[2]": "Not used",
        "debug[3]": "Throttle",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      RC_SMOOTHING_RATE: {
        "debug[all]": "Debug RC Smoothing Rate",
        "debug[0]": "Current RX Refresh Rate",
        "debug[1]": "Training Step Count",
        "debug[2]": "Average RX Refresh Rate",
        "debug[3]": "Sampling State",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      ANTI_GRAVITY: {
        "debug[all]": "I-term Relax",
        "debug[0]": "Base I gain * 1000",
        "debug[1]": "Final I gain * 1000",
        "debug[2]": "P gain [roll] * 1000",
        "debug[3]": "P gain [pitch] * 1000",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      DYN_LPF: {
        "debug[all]": "Debug Dyn LPF",
        "debug[0]": "Gyro Scaled [dbg-axis]",
        "debug[1]": "Notch Center [roll]",
        "debug[2]": "Lowpass Cutoff",
        "debug[3]": "Gyro Pre-Dyn [dbg-axis]",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      DSHOT_RPM_TELEMETRY: {
        "debug[all]": "DShot Telemetry RPM",
        "debug[0]": "Motor 1 - DShot",
        "debug[1]": "Motor 2 - DShot",
        "debug[2]": "Motor 3 - DShot",
        "debug[3]": "Motor 4 - DShot",
        "debug[4]": "Motor 5 - DShot",
        "debug[5]": "Motor 6 - DShot",
        "debug[6]": "Motor 7 - DShot",
        "debug[7]": "Motor 8 - DShot"
      },
      RPM_FILTER: {
        "debug[all]": "RPM Filter",
        "debug[0]": "Motor 1 - rpmFilter",
        "debug[1]": "Motor 2 - rpmFilter",
        "debug[2]": "Motor 3 - rpmFilter",
        "debug[3]": "Motor 4 - rpmFilter",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      D_MAX: {
        "debug[all]": "D_MAX",
        "debug[0]": "Gyro Factor [roll]",
        "debug[1]": "Setpoint Factor [roll]",
        "debug[2]": "Actual D [roll]",
        "debug[3]": "Actual D [pitch]",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      AC_CORRECTION: {
        "debug[all]": "AC Correction",
        "debug[0]": "AC Correction [roll]",
        "debug[1]": "AC Correction [pitch]",
        "debug[2]": "AC Correction [yaw]",
        "debug[3]": "Not Used",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      AC_ERROR: {
        "debug[all]": "AC Error",
        "debug[0]": "AC Error [roll]",
        "debug[1]": "AC Error [pitch]",
        "debug[2]": "AC Error [yaw]",
        "debug[3]": "Not Used",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      DUAL_GYRO_SCALED: {
        "debug[all]": "Dual Gyro Scaled",
        "debug[0]": "Gyro 1 [roll]",
        "debug[1]": "Gyro 1 [pitch]",
        "debug[2]": "Gyro 2 [roll]",
        "debug[3]": "Gyro 2 [pitch]",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      DSHOT_RPM_ERRORS: {
        "debug[all]": "DSHOT RPM Error",
        "debug[0]": "DSHOT RPM Error [1]",
        "debug[1]": "DSHOT RPM Error [2]",
        "debug[2]": "DSHOT RPM Error [3]",
        "debug[3]": "DSHOT RPM Error [4]",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      CRSF_LINK_STATISTICS_UPLINK: {
        "debug[all]": "CRSF Stats Uplink",
        "debug[0]": "Uplink RSSI 1",
        "debug[1]": "Uplink RSSI 2",
        "debug[2]": "Uplink Link Quality",
        "debug[3]": "RF Mode",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      CRSF_LINK_STATISTICS_PWR: {
        "debug[all]": "CRSF Stats Power",
        "debug[0]": "Antenna",
        "debug[1]": "SNR",
        "debug[2]": "TX Power",
        "debug[3]": "Not Used",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      CRSF_LINK_STATISTICS_DOWN: {
        "debug[all]": "CRSF Stats Downlink",
        "debug[0]": "Downlink RSSI",
        "debug[1]": "Downlink Link Quality",
        "debug[2]": "Downlink SNR",
        "debug[3]": "Not Used",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      BARO: {
        "debug[all]": "Debug Barometer",
        "debug[0]": "Baro State",
        "debug[1]": "Baro Temperature",
        "debug[2]": "Baro Pressure",
        "debug[3]": "Baro Pressure Sum",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      GPS_RESCUE_THROTTLE_PID: {
        "debug[all]": "GPS Rescue Throttle PID",
        "debug[0]": "Throttle P",
        "debug[1]": "Throttle I",
        "debug[2]": "Throttle D",
        "debug[3]": "Z Velocity",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      DYN_IDLE: {
        "debug[all]": "Dyn Idle",
        "debug[0]": "Motor Range Min Inc",
        "debug[1]": "Target RPS Change Rate",
        "debug[2]": "Error",
        "debug[3]": "Min RPM",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      FF_LIMIT: {
        "debug[all]": "FF Limit",
        "debug[0]": "FF input [roll]",
        "debug[1]": "FF input [pitch]",
        "debug[2]": "FF limited [roll]",
        "debug[3]": "Not Used",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      FF_INTERPOLATED: {
        "debug[all]": "FF Interpolated [roll]",
        "debug[0]": "Setpoint Delta Impl [roll]",
        "debug[1]": "Boost amount [roll]",
        "debug[2]": "Boost amount, clipped [roll]",
        "debug[3]": "Clip amount [roll]",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      BLACKBOX_OUTPUT: {
        "debug[all]": "Blackbox Output",
        "debug[0]": "Blackbox Rate",
        "debug[1]": "Blackbox Max Rate",
        "debug[2]": "Dropouts",
        "debug[3]": "Tx Bytes Free",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      GYRO_SAMPLE: {
        "debug[all]": "Gyro Sample",
        "debug[0]": "Before downsampling",
        "debug[1]": "After downsampling",
        "debug[2]": "After RPM",
        "debug[3]": "After all but Dyn Notch",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      RX_TIMING: {
        "debug[all]": "Receiver Timing (us)",
        "debug[0]": "Frame Delta",
        "debug[1]": "Frame Age",
        "debug[2]": "not used",
        "debug[3]": "not used",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      D_LPF: {
        "debug[all]": "D-Term [D_LPF]",
        "debug[0]": "Unfiltered D [roll]",
        "debug[1]": "Unfiltered D [pitch]",
        "debug[2]": "Filtered, with DMax [roll]",
        "debug[3]": "Filtered, with DMax [pitch]",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      VTX_TRAMP: {
        "debug[all]": "Tramp VTx",
        "debug[0]": "Status",
        "debug[1]": "Reply Code",
        "debug[2]": "Pit Mode",
        "debug[3]": "Retry Count",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      GHST: {
        "debug[all]": "Ghost Rx",
        "debug[0]": "CRC Error Count",
        "debug[1]": "Unknown Frame Count",
        "debug[2]": "RSSI",
        "debug[3]": "Link Quality",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      GHST_MSP: {
        "debug[all]": "Ghost MSP",
        "debug[0]": "MSP Frame Count",
        "debug[1]": "MSP Frame Counter",
        "debug[2]": "Not used",
        "debug[3]": "Not used",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      SCHEDULER_DETERMINISM: {
        "debug[all]": "Scheduler Determinism",
        "debug[0]": "Cycle Start time",
        "debug[1]": "ID of Late Task",
        "debug[2]": "Task Delay Time",
        "debug[3]": "Gyro Clock Skew",
        "debug[4]": "Minimum Gyro period in 100th of a us",
        "debug[5]": "Maximum Gyro period in 100th of a us",
        "debug[6]": "Span of Gyro period in 100th of a us",
        "debug[7]": "Gyro cycle deviation in 100th of a us"
      },
      TIMING_ACCURACY: {
        "debug[all]": "Timing Accuracy",
        "debug[0]": "CPU Busy",
        "debug[1]": "Late Tasks per second",
        "debug[2]": "Total delay in last second",
        "debug[3]": "Total Tasks per second",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      RX_EXPRESSLRS_SPI: {
        "debug[all]": "ExpressLRS SPI Rx",
        "debug[0]": "Lost Connection Count",
        "debug[1]": "RSSI",
        "debug[2]": "SNR",
        "debug[3]": "Uplink LQ",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      RX_EXPRESSLRS_PHASELOCK: {
        "debug[all]": "ExpressLRS SPI Phaselock",
        "debug[0]": "Phase offset",
        "debug[1]": "Filtered phase offset",
        "debug[2]": "Frequency Offset",
        "debug[3]": "Phase Shift",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      RX_STATE_TIME: {
        "debug[all]": "Rx State Time",
        "debug[0]": "Time 0",
        "debug[1]": "Time 1",
        "debug[2]": "Time 2",
        "debug[3]": "Time 3",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      GPS_RESCUE_VELOCITY: {
        "debug[all]": "GPS Rescue Velocity",
        "debug[0]": "Velocity P",
        "debug[1]": "Velocity D",
        "debug[2]": "Velocity to Home",
        "debug[3]": "Target Velocity",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      GPS_RESCUE_HEADING: {
        "debug[all]": "GPS Rescue Heading",
        "debug[0]": "Ground Speed",
        "debug[1]": "GPS Heading",
        "debug[2]": "IMU Attitude",
        "debug[3]": "Angle to home",
        "debug[4]": "magYaw",
        "debug[5]": "Roll MixAtt",
        "debug[6]": "Roll Added",
        "debug[7]": "Rescue Yaw Rate"
      },
      GPS_RESCUE_TRACKING: {
        "debug[all]": "GPS Rescue Tracking",
        "debug[0]": "Velocity to home",
        "debug[1]": "Target velocity",
        "debug[2]": "Altitude",
        "debug[3]": "Target altitude",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      GPS_CONNECTION: {
        "debug[all]": "GPS Connection",
        "debug[0]": "Nav Model",
        "debug[1]": "GPS Nav interval",
        "debug[2]": "Task timer",
        "debug[3]": "Baud Rate / FC interval",
        "debug[4]": "State*100 +SubState",
        "debug[5]": "ExecuteTime",
        "debug[6]": "Ack State",
        "debug[7]": "Rx buffer size"
      },
      ATTITUDE: {
        "debug[all]": "Attitude",
        "debug[0]": "IMU Gain",
        "debug[1]": "EZ_EF",
        "debug[2]": "GroundSpeedError",
        "debug[3]": "VelocityFactor"
      },
      VTX_MSP: {
        "debug[all]": "VTX MSP",
        "debug[0]": "packetCounter",
        "debug[1]": "isCrsfPortConfig",
        "debug[2]": "isLowPowerDisarmed",
        "debug[3]": "mspTelemetryDescriptor",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      GPS_DOP: {
        "debug[all]": "GPS Dilution of Precision",
        "debug[0]": "Number of Satellites",
        "debug[1]": "pDOP (positional - 3D)",
        "debug[2]": "hDOP (horizontal - 2D)",
        "debug[3]": "vDOP (vertical - 1D)",
        "debug[4]": "Not Used",
        "debug[5]": "Not Used",
        "debug[6]": "Not Used",
        "debug[7]": "Not Used"
      },
      FAILSAFE: {
        "debug[all]": "Failsafe",
        "debug[0]": "Failsafe Phase switch",
        "debug[1]": "Failsafe State",
        "debug[2]": "Receiving data from Rx",
        "debug[3]": "Failsafe Phase"
      },
      GYRO_CALIBRATION: {
        "debug[all]": "Gyro Calibration",
        "debug[0]": "Gyro Calibration X",
        "debug[1]": "Gyro Calibration Y",
        "debug[2]": "Gyro Calibration Z",
        "debug[3]": "Calibration Cycles remaining"
      },
      ANGLE_MODE: {
        "debug[all]": "Angle Mode",
        "debug[0]": "Target Angle",
        "debug[1]": "Error P correction",
        "debug[2]": "Feedforward correction",
        "debug[3]": "Angle Achieved"
      },
      ANGLE_TARGET: {
        "debug[all]": "Angle Target",
        "debug[0]": "Angle Target",
        "debug[1]": "Sin Angle",
        "debug[2]": "Current PID Setpoint",
        "debug[3]": "Angle Current"
      },
      CURRENT_ANGLE: {
        "debug[all]": "Current Angle",
        "debug[0]": "Current Angle X",
        "debug[1]": "Current Angle Y",
        "debug[2]": "Current Angle Z"
      },
      DSHOT_TELEMETRY_COUNTS: {
        "debug[all]": "DShot Telemetry Counts",
        "debug[0]": "DShot Telemetry Debug[0] + 1",
        "debug[1]": "DShot Telemetry Debug[1] + 1",
        "debug[2]": "DShot Telemetry Debug[2] + 1",
        "debug[3]": "Preamble Skip"
      },
      RPM_LIMIT: {
        "debug[all]": "RPM Limit",
        "debug[0]": "Average RPM",
        "debug[1]": "Average RPM (unsmoothed)",
        "debug[2]": "RPM Limit throttle scale",
        "debug[3]": "Throttle",
        "debug[4]": "Error",
        "debug[5]": "Proportional",
        "debug[6]": "Integral",
        "debug[7]": "Derivative"
      },
      RC_STATS: {
        "debug[all]": "RC Stats",
        "debug[0]": "Average Throttle"
      },
      MAG_CALIB: {
        "debug[all]": "Mag Calibration",
        "debug[0]": "Mag X",
        "debug[1]": "Mag Y",
        "debug[2]": "Mag Z",
        "debug[3]": "Field Strength",
        "debug[4]": "Estimated Mag Bias X",
        "debug[5]": "Estimated Mag Bias Y",
        "debug[6]": "Estimated Mag Bias Z",
        "debug[7]": "Lambda"
      },
      MAG_TASK_RATE: {
        "debug[all]": "Mag Task Rate",
        "debug[0]": "Task Rate (Hz)",
        "debug[1]": "Actual Data Rate (Hz)",
        "debug[2]": "Data Interval (Us)",
        "debug[3]": "Execute Time (Us)",
        "debug[4]": "Bus Busy",
        "debug[5]": "Read State",
        "debug[6]": "Task Time (Us)"
      },
      EZLANDING: {
        "debug[all]": "EZ Landing",
        "debug[0]": "EZ Land Factor",
        "debug[1]": "Adjusted Throttle",
        "debug[2]": "Upper Limit",
        "debug[3]": "EZ Land Limit",
        "debug[4]": "Stick Limit",
        "debug[5]": "Speed Limit"
      },
      MAVLINK_TELEMETRY: {
        "debug[all]": "MAVLink telemetry",
        "debug[0]": "Should send telemetry",
        "debug[1]": "Actual free TX buffers space",
        "debug[2]": "Estimated free TX buffers space",
        "debug[3]": "Telemetries call counter"
      }
    };
    DEBUG_FRIENDLY_FIELD_NAMES = null;
    FlightLogFieldPresenter.adjustDebugDefsList = function(firmwareType, firmwareVersion) {
      DEBUG_FRIENDLY_FIELD_NAMES = { ...DEBUG_FRIENDLY_FIELD_NAMES_INITIAL };
      if (firmwareType === FIRMWARE_TYPE_BETAFLIGHT) {
        if (semver.gte(firmwareVersion, "4.1.0")) {
          DEBUG_FRIENDLY_FIELD_NAMES.FF_INTERPOLATED = {
            "debug[all]": "Feedforward [roll]",
            "debug[0]": "Setpoint Delta [roll]",
            "debug[1]": "Boost [roll]",
            "debug[2]": "Boost, clipped [roll]",
            "debug[3]": "Duplicate Counter [roll]",
            "debug[4]": "Not Used",
            "debug[5]": "Not Used",
            "debug[6]": "Not Used",
            "debug[7]": "Not Used"
          };
          DEBUG_FRIENDLY_FIELD_NAMES.FF_LIMIT = {
            "debug[all]": "Feedforward Limit [roll]",
            "debug[0]": "FF limit input [roll]",
            "debug[1]": "FF limit input [pitch]",
            "debug[2]": "FF limited [roll]",
            "debug[3]": "Not Used",
            "debug[4]": "Not Used",
            "debug[5]": "Not Used",
            "debug[6]": "Not Used",
            "debug[7]": "Not Used"
          };
        }
        if (semver.gte(firmwareVersion, "4.2.0")) {
          DEBUG_FRIENDLY_FIELD_NAMES.FF_INTERPOLATED = {
            "debug[all]": "Feedforward [roll]",
            "debug[0]": "Setpoint Delta [roll]",
            "debug[1]": "Acceleration [roll]",
            "debug[2]": "Acceleration, clipped [roll]",
            "debug[3]": "Duplicate Counter [roll]",
            "debug[4]": "Not Used",
            "debug[5]": "Not Used",
            "debug[6]": "Not Used",
            "debug[7]": "Not Used"
          };
        }
        if (semver.gte(firmwareVersion, "4.3.0")) {
          DEBUG_FRIENDLY_FIELD_NAMES.FEEDFORWARD = {
            "debug[all]": "Feedforward [roll]",
            "debug[0]": "Setpoint, un-smoothed [roll]",
            "debug[1]": "Delta, smoothed [roll]",
            "debug[2]": "Boost, smoothed [roll]",
            "debug[3]": "rcCommand Delta [roll]",
            "debug[4]": "Not Used",
            "debug[5]": "Not Used",
            "debug[6]": "Not Used",
            "debug[7]": "Not Used"
          };
          DEBUG_FRIENDLY_FIELD_NAMES.FEEDFORWARD_LIMIT = {
            "debug[all]": "Feedforward Limit [roll]",
            "debug[0]": "Feedforward input [roll]",
            "debug[1]": "Feedforward input [pitch]",
            "debug[2]": "Feedforward limited [roll]",
            "debug[3]": "Not Used",
            "debug[4]": "Not Used",
            "debug[5]": "Not Used",
            "debug[6]": "Not Used",
            "debug[7]": "Not Used"
          };
          DEBUG_FRIENDLY_FIELD_NAMES.DYN_IDLE = {
            "debug[all]": "Dyn Idle",
            "debug[0]": "Dyn Idle P [roll]",
            "debug[1]": "Dyn Idle I [roll]",
            "debug[2]": "Dyn Idle D [roll]",
            "debug[3]": "Min RPM",
            "debug[4]": "Not Used",
            "debug[5]": "Not Used",
            "debug[6]": "Not Used",
            "debug[7]": "Not Used"
          };
          DEBUG_FRIENDLY_FIELD_NAMES.FFT = {
            "debug[all]": "Debug FFT",
            "debug[0]": "Gyro Pre Dyn Notch [dbg-axis]",
            "debug[1]": "Gyro Post Dyn Notch [dbg-axis]",
            "debug[2]": "Gyro Downsampled [dbg-axis]",
            "debug[3]": "Not used",
            "debug[4]": "Not Used",
            "debug[5]": "Not Used",
            "debug[6]": "Not Used",
            "debug[7]": "Not Used"
          };
          DEBUG_FRIENDLY_FIELD_NAMES.FFT_TIME = {
            "debug[all]": "Debug FFT TIME",
            "debug[0]": "Active calc step",
            "debug[1]": "Step duration",
            "debug[2]": "Not used",
            "debug[3]": "Not used",
            "debug[4]": "Not Used",
            "debug[5]": "Not Used",
            "debug[6]": "Not Used",
            "debug[7]": "Not Used"
          };
          DEBUG_FRIENDLY_FIELD_NAMES.FFT_FREQ = {
            "debug[all]": "Debug FFT FREQ",
            "debug[0]": "Notch 1 Center Freq [dbg-axis]",
            "debug[1]": "Notch 2 Center Freq [dbg-axis]",
            "debug[2]": "Notch 3 Center Freq [dbg-axis]",
            "debug[3]": "Gyro Pre Dyn Notch [dbg-axis]",
            "debug[4]": "Not Used",
            "debug[5]": "Not Used",
            "debug[6]": "Not Used",
            "debug[7]": "Not Used"
          };
          DEBUG_FRIENDLY_FIELD_NAMES.GPS_RESCUE_THROTTLE_PID = {
            "debug[all]": "GPS Rescue Throttle PID",
            "debug[0]": "Throttle P",
            "debug[1]": "Throttle D",
            "debug[2]": "Altitude",
            "debug[3]": "Target Altitude",
            "debug[4]": "Not Used",
            "debug[5]": "Not Used",
            "debug[6]": "Not Used",
            "debug[7]": "Not Used"
          };
        }
        if (semver.gte(firmwareVersion, "4.4.0")) {
          DEBUG_FRIENDLY_FIELD_NAMES.BARO = {
            "debug[all]": "Debug Barometer",
            "debug[0]": "Baro State",
            "debug[1]": "Baro Pressure",
            "debug[2]": "Baro Temperature",
            "debug[3]": "Baro Altitude",
            "debug[4]": "Not Used",
            "debug[5]": "Not Used",
            "debug[6]": "Not Used",
            "debug[7]": "Not Used"
          };
          DEBUG_FRIENDLY_FIELD_NAMES.RTH = {
            "debug[all]": "RTH Rescue codes",
            "debug[0]": "Pitch angle, deg",
            "debug[1]": "Rescue Phase",
            "debug[2]": "Failure code",
            "debug[3]": "Failure timers",
            "debug[4]": "Not Used",
            "debug[5]": "Not Used",
            "debug[6]": "Not Used",
            "debug[7]": "Not Used"
          };
        }
        if (semver.gte(firmwareVersion, "4.5.0")) {
          DEBUG_FRIENDLY_FIELD_NAMES.ATTITUDE = {
            "debug[all]": "Attitude",
            "debug[0]": "Roll angle",
            "debug[1]": "Pitch angle",
            "debug[2]": "Ground speed factor",
            "debug[3]": "Heading error",
            "debug[4]": "Velocity to home",
            "debug[5]": "Ground speed error ratio",
            "debug[6]": "Pitch forward angle",
            "debug[7]": "dcmKp gain"
          };
          DEBUG_FRIENDLY_FIELD_NAMES.GPS_RESCUE_THROTTLE_PID = {
            "debug[all]": "GPS Rescue throttle PID",
            "debug[0]": "Throttle P",
            "debug[1]": "Throttle D",
            "debug[2]": "Altitude",
            "debug[3]": "Target altitude",
            "debug[4]": "Throttle I",
            "debug[5]": "Tilt adjustment",
            "debug[6]": "Throttle D before lp smoothing",
            "debug[7]": "Throttle adjustment"
          };
        }
        if (semver.gte(firmwareVersion, "2025.12.0")) {
          DEBUG_FRIENDLY_FIELD_NAMES.FFT_FREQ = {
            "debug[all]": "Debug FFT FREQ",
            "debug[0]": "Gyro Pre Dyn Notch [dbg-axis]",
            "debug[1]": "Notch 1 Center Freq [dbg-axis]",
            "debug[2]": "Notch 2 Center Freq [dbg-axis]",
            "debug[3]": "Notch 3 Center Freq [dbg-axis]",
            "debug[4]": "Notch 4 Center Freq [dbg-axis]",
            "debug[5]": "Notch 5 Center Freq [dbg-axis]",
            "debug[6]": "Notch 6 Center Freq [dbg-axis]",
            "debug[7]": "Notch 7 Center Freq [dbg-axis]"
          };
          DEBUG_FRIENDLY_FIELD_NAMES.AUTOPILOT_ALTITUDE = {
            "debug[all]": "Autopilot Altitude",
            "debug[0]": "Autopilot Throttle",
            "debug[1]": "Tilt Multiplier",
            "debug[2]": "Zero Altitude cm",
            "debug[3]": "Altitude cm",
            "debug[4]": "Altitude P",
            "debug[5]": "Altitude I",
            "debug[6]": "Altitude D",
            "debug[7]": "Altitude F"
          };
          DEBUG_FRIENDLY_FIELD_NAMES.TPA = {
            "debug[all]": "TPA",
            "debug[0]": "TPA Factor",
            "debug[1]": "TPA Attitude Roll (Wing)",
            "debug[2]": "TPA Attitude Pitch (Wing)",
            "debug[3]": "TPA Calculated Throttle (Wing)",
            "debug[4]": "TPA Speed (Wing)",
            "debug[5]": "TPA Argument (Wing)"
          };
          DEBUG_FRIENDLY_FIELD_NAMES.S_TERM = {
            "debug[all]": "S Term",
            "debug[0]": "S Term [roll]",
            "debug[1]": "S Term [pitch]",
            "debug[2]": "S Term [yaw]"
          };
          DEBUG_FRIENDLY_FIELD_NAMES.SPA = {
            "debug[all": "SPA",
            "debug[0]": "Setpoint PID Attenuation [roll]",
            "debug[1]": "Setpoint PID Attenuation [pitch]",
            "debug[2]": "Setpoint PID Attenuation [yaw]"
          };
          DEBUG_FRIENDLY_FIELD_NAMES.TASK = {
            "debug[all]": "TASK",
            "debug[0]": "Value",
            "debug[1]": "Rate (Hz)",
            "debug[2]": "Max (us)",
            "debug[3]": "Average (us)",
            "debug[4]": "Estimated execution time (us)",
            "debug[5]": "Actual execution time (us)",
            "debug[6]": "Difference estimated vs actual",
            "debug[7]": "Late count"
          };
          DEBUG_FRIENDLY_FIELD_NAMES.GIMBAL = {
            "debug[all]": "Gimbal",
            "debug[0]": "Headtracker Roll",
            "debug[1]": "Headtracker Pitch",
            "debug[2]": "Headtracker Yaw",
            "debug[3]": "Gimbal Roll",
            "debug[4]": "Gimbal Pitch",
            "debug[5]": "Gimbal Yaw"
          };
          DEBUG_FRIENDLY_FIELD_NAMES.WING_SETPOINT = {
            "debug[all]": "Wing Setpoint",
            "debug[0]": "Current Setpoint [roll]",
            "debug[1]": "Adjusted Setpoint [roll]",
            "debug[2]": "Current Setpoint [pitch]",
            "debug[3]": "Adjusted Setpoint [pitch]",
            "debug[4]": "Current Setpoint [yaw]",
            "debug[5]": "Adjusted Setpoint [yaw]"
          };
          DEBUG_FRIENDLY_FIELD_NAMES.OPTICALFLOW = {
            "debug[all]": "Optical Flow",
            "debug[0]": "Quality",
            "debug[1]": "Raw flow rates X",
            "debug[2]": "Raw flow rates Y",
            "debug[3]": "Processed flow rates X",
            "debug[4]": "Processed flow rates Y",
            "debug[5]": "Delta time"
          };
          DEBUG_FRIENDLY_FIELD_NAMES.MULTI_GYRO_RAW = {
            "debug[all]": "Debug Multi Gyro Raw",
            "debug[0]": "Gyro 1 Raw [roll]",
            "debug[1]": "Gyro 1 Raw [pitch]",
            "debug[2]": "Gyro 2 Raw [roll]",
            "debug[3]": "Gyro 2 Raw [pitch]",
            "debug[4]": "Gyro 3 Raw [roll]",
            "debug[5]": "Gyro 3 Raw [pitch]",
            "debug[6]": "Gyro 4 Raw [roll]",
            "debug[7]": "Gyro 4 Raw [pitch]"
          };
          DEBUG_FRIENDLY_FIELD_NAMES.MULTI_GYRO_DIFF = {
            "debug[all]": "Debug Multi Gyro Diff",
            "debug[0]": "Gyro 1 Diff [roll]",
            "debug[1]": "Gyro 1 Diff [pitch]",
            "debug[2]": "Gyro 2 Diff [roll]",
            "debug[3]": "Gyro 2 Diff [pitch]",
            "debug[4]": "Gyro 3 Diff [roll]",
            "debug[5]": "Gyro 3 Diff [pitch]",
            "debug[6]": "Gyro 4 Diff [roll]",
            "debug[7]": "Gyro 4 Diff [pitch]"
          };
          DEBUG_FRIENDLY_FIELD_NAMES.MULTI_GYRO_SCALED = {
            "debug[all]": "Multi Gyro Scaled",
            "debug[0]": "Gyro 1 [roll]",
            "debug[1]": "Gyro 1 [pitch]",
            "debug[2]": "Gyro 2 [roll]",
            "debug[3]": "Gyro 2 [pitch]",
            "debug[4]": "Gyro 3 [roll]",
            "debug[5]": "Gyro 3 [pitch]",
            "debug[6]": "Gyro 4 [roll]",
            "debug[7]": "Gyro 4 [pitch]"
          };
          DEBUG_FRIENDLY_FIELD_NAMES.AUTOPILOT_POSITION = {
            "debug[all]": "Autopilot Position",
            "debug[0]": "Distance",
            "debug[1]": "GPS Distance",
            "debug[2]": "PID Sum EF",
            "debug[3]": "Angle",
            "debug[4]": "pidP",
            "debug[5]": "pidI",
            "debug[6]": "pidD",
            "debug[7]": "pidA"
          };
          DEBUG_FRIENDLY_FIELD_NAMES.FEEDFORWARD = {
            "debug[all]": "Feedforward [debug_axis]",
            "debug[0]": "Setpoint, un-smoothed",
            "debug[1]": "Delta, smoothed",
            "debug[2]": "Boost, smoothed",
            "debug[3]": "rcCommand Delta",
            "debug[4]": "Jitter Attenuator",
            "debug[5]": "Duplicate Flag",
            "debug[6]": "Yaw FF BaseAmt",
            "debug[7]": "Yaw FF HoldAmt"
          };
          DEBUG_FRIENDLY_FIELD_NAMES.FEEDFORWARD_LIMIT = {
            "debug[all]": "Feedforward Limit",
            "debug[0]": "Jitter Attenuator",
            "debug[1]": "MaxRcRate [debugAxis]",
            "debug[2]": "Setpoint",
            "debug[3]": "Feedforward",
            "debug[4]": "Setpoint Speed",
            "debug[5]": "Setpoint Speed Smoothed",
            "debug[6]": "FF PT1K",
            "debug[7]": "Rx Rate"
          };
          DEBUG_FRIENDLY_FIELD_NAMES.RX_TIMING = {
            "debug[all]": "Receiver Timing",
            "debug[0]": "Frame Interval",
            "debug[1]": "Frame TimeStamp",
            "debug[2]": "Is Rate Valid",
            "debug[3]": "Interval Constrained",
            "debug[4]": "Rx Rate",
            "debug[5]": "Smoothed Rx Rate",
            "debug[6]": "LQ Percent",
            "debug[7]": "Is Receiving Signal"
          };
          DEBUG_FRIENDLY_FIELD_NAMES.RC_SMOOTHING = {
            "debug[all]": "Debug RC Smoothing",
            "debug[0]": "Rx Rate Current",
            "debug[1]": "Rx Rate For Cutoffs",
            "debug[2]": "Cutoff Hz",
            "debug[3]": "Throttle Cutoff Hz",
            "debug[4]": "FF Smoothing PT1K",
            "debug[5]": "Smoothed Rx Rate",
            "debug[6]": "Outlier Count",
            "debug[7]": "Valid Count"
          };
        }
      }
    };
    FlightLogFieldPresenter.presentFlags = function(flags, flagNames) {
      let printedFlag = false, i = 0, result = "";
      while (flags > 0) {
        if ((flags & 1) != 0) {
          if (printedFlag) {
            result += "|";
          } else {
            printedFlag = true;
          }
          result += flagNames[i];
        }
        flags >>= 1;
        i++;
      }
      if (printedFlag) {
        return result;
      } else {
        return "0";
      }
    };
    FlightLogFieldPresenter.presentChangeEvent = function presentChangeEvent(flags, lastFlags, flagNames) {
      let eventState = "";
      let found = false;
      const maxModeNumber = 32;
      let modesCount = flagNames.length;
      if (modesCount > maxModeNumber) {
        modesCount = maxModeNumber;
      }
      for (let i = 0; i < modesCount; i++) {
        if (1 << i & (flags ^ lastFlags)) {
          eventState += `${found ? "|" : ""}${flagNames[i]} ${1 << i & flags ? "ON" : "OFF"}`;
          found = true;
        }
      }
      if (!found) {
        eventState += " | ACRO";
      }
      return eventState;
    };
    FlightLogFieldPresenter.presentEnum = function presentEnum(value, enumNames) {
      if (enumNames[value] === void 0) {
        return value;
      }
      return enumNames[value];
    };
    FlightLogFieldPresenter.decodeCorrectAltitude = function(altitude, altitudeUnits) {
      switch (altitudeUnits) {
        case 1:
          return `${altitude.toFixed(2)} m`;
        case 2:
          return `${(altitude * 3.28).toFixed(2)} ft`;
      }
    };
    FlightLogFieldPresenter.decodeAltitudeLogToChart = function(altitude, altitudeUnits) {
      switch (altitudeUnits) {
        case 1:
          return altitude;
        case 2:
          return altitude * 3.28;
      }
    };
    FlightLogFieldPresenter.decodeFieldToFriendly = function(flightLog, fieldName, value, currentFlightMode) {
      if (value === void 0) {
        return "";
      }
      const highResolutionScale = flightLog && flightLog.getSysConfig().blackbox_high_resolution > 0 ? 10 : 1;
      const highResolutionAddPrecision = flightLog && flightLog.getSysConfig().blackbox_high_resolution > 0 ? 1 : 0;
      switch (fieldName) {
        case "time":
          return formatTime(value / 1e3, true);
        case "gyroADC[0]":
        case "gyroADC[1]":
        case "gyroADC[2]":
        case "gyroUnfilt[0]":
        case "gyroUnfilt[1]":
        case "gyroUnfilt[2]":
          return `${flightLog.gyroRawToDegreesPerSecond(value / highResolutionScale).toFixed(highResolutionAddPrecision)} \xB0/s`;
        case "gyroADCs[0]":
        case "gyroADCs[1]":
        case "gyroADCs[2]":
          return `${value.toFixed(0)} \xB0/s`;
        case "axisError[0]":
        case "axisError[1]":
        case "axisError[2]":
          return `${(value / highResolutionScale).toFixed(
            highResolutionAddPrecision
          )} \xB0/s`;
        case "rcCommand[0]":
        case "rcCommand[1]":
        case "rcCommand[2]":
          return `${(value / highResolutionScale + 1500).toFixed(
            highResolutionAddPrecision
          )} us`;
        case "rcCommand[3]":
          return `${(value / highResolutionScale).toFixed(
            highResolutionAddPrecision
          )} us`;
        case "motor[0]":
        case "motor[1]":
        case "motor[2]":
        case "motor[3]":
        case "motor[4]":
        case "motor[5]":
        case "motor[6]":
        case "motor[7]":
          return `${flightLog.rcMotorRawToPctPhysical(value).toFixed(2)} %`;
        case "eRPM[0]":
        case "eRPM[1]":
        case "eRPM[2]":
        case "eRPM[3]":
        case "eRPM[4]":
        case "eRPM[5]":
        case "eRPM[6]":
        case "eRPM[7]":
          let motor_poles = flightLog.getSysConfig()["motor_poles"];
          return `${(value * 200 / motor_poles).toFixed(0)} rpm / ${(value * 3.333 / motor_poles).toFixed(1)} hz`;
        case "rcCommands[0]":
        case "rcCommands[1]":
        case "rcCommands[2]":
          return `${(value / highResolutionScale).toFixed(
            highResolutionAddPrecision
          )} \xB0/s`;
        case "rcCommands[3]":
          return `${value.toFixed(1)}%`;
        case "axisSum[0]":
        case "axisSum[1]":
        case "axisSum[2]":
        case "axisP[0]":
        case "axisP[1]":
        case "axisP[2]":
        case "axisI[0]":
        case "axisI[1]":
        case "axisI[2]":
        case "axisD[0]":
        case "axisD[1]":
        case "axisD[2]":
        case "axisF[0]":
        case "axisF[1]":
        case "axisF[2]":
        case "axisS[0]":
        case "axisS[1]":
        case "axisS[2]":
          return `${flightLog.getPIDPercentage(value).toFixed(1)} %`;
        case "accSmooth[0]":
        case "accSmooth[1]":
        case "accSmooth[2]":
          return `${flightLog.accRawToGs(value).toFixed(2 + highResolutionAddPrecision)} g`;
        case "vbatLatest":
          if (flightLog.getSysConfig().firmwareType === FIRMWARE_TYPE_BETAFLIGHT && semver.gte(flightLog.getSysConfig().firmwareVersion, "4.0.0")) {
            return `${(value / 100).toFixed(2)}V, ${(value / 100 / flightLog.getNumCellsEstimate()).toFixed(
              2
            )} V/cell`;
          } else if (flightLog.getSysConfig().firmwareType === FIRMWARE_TYPE_BETAFLIGHT && semver.gte(flightLog.getSysConfig().firmwareVersion, "3.1.0") || flightLog.getSysConfig().firmwareType === FIRMWARE_TYPE_CLEANFLIGHT && semver.gte(flightLog.getSysConfig().firmwareVersion, "2.0.0")) {
            return `${(value / 10).toFixed(2)}V, ${(value / 10 / flightLog.getNumCellsEstimate()).toFixed(
              2
            )} V/cell`;
          } else {
            return `${(flightLog.vbatADCToMillivolts(value) / 1e3).toFixed(2)}V, ${(flightLog.vbatADCToMillivolts(value) / 1e3 / flightLog.getNumCellsEstimate()).toFixed(2)} V/cell`;
          }
        case "amperageLatest":
          if (flightLog.getSysConfig().firmwareType == FIRMWARE_TYPE_BETAFLIGHT && semver.gte(flightLog.getSysConfig().firmwareVersion, "3.1.7") || flightLog.getSysConfig().firmwareType == FIRMWARE_TYPE_CLEANFLIGHT && semver.gte(flightLog.getSysConfig().firmwareVersion, "2.0.0")) {
            return `${(value / 100).toFixed(2)}A, ${(value / 100 / flightLog.getNumMotors()).toFixed(2)} A/motor`;
          } else if (flightLog.getSysConfig().firmwareType == FIRMWARE_TYPE_BETAFLIGHT && semver.gte(flightLog.getSysConfig().firmwareVersion, "3.1.0")) {
            return `${(value / 100).toFixed(2)}A, ${(value / 100 / flightLog.getNumMotors()).toFixed(2)} A/motor`;
          } else {
            return `${(flightLog.amperageADCToMillivolts(value) / 1e3).toFixed(2)}A, ${(flightLog.amperageADCToMillivolts(value) / 1e3 / flightLog.getNumMotors()).toFixed(2)} A/motor`;
          }
        case "heading[0]":
        case "heading[1]":
        case "heading[2]":
          return `${(value / Math.PI * 180).toFixed(1)}\xB0`;
        case "baroAlt":
          return FlightLogFieldPresenter.decodeCorrectAltitude(
            value / 100,
            userSettings.altitudeUnits
          );
        case "flightModeFlags":
          return FlightLogFieldPresenter.presentFlags(
            value,
            FLIGHT_LOG_FLIGHT_MODE_NAME
          );
        case "stateFlags":
          return FlightLogFieldPresenter.presentFlags(
            value,
            FLIGHT_LOG_FLIGHT_STATE_NAME
          );
        case "failsafePhase":
          return FlightLogFieldPresenter.presentEnum(
            value,
            FLIGHT_LOG_FAILSAFE_PHASE_NAME
          );
        case "features":
          return FlightLogFieldPresenter.presentEnum(value, FLIGHT_LOG_FEATURES);
        case "rssi":
          return `${(value / 1024 * 100).toFixed(2)} %`;
        case "GPS_numSat":
          return `${value}`;
        case "GPS_coord[0]":
        case "GPS_coord[1]":
          return `${(value / 1e7).toFixed(5)}`;
        case "GPS_altitude":
          return FlightLogFieldPresenter.decodeCorrectAltitude(
            value / 10,
            userSettings.altitudeUnits
          );
        case "GPS_speed":
          switch (userSettings.speedUnits) {
            case 1:
              return `${(value / 100).toFixed(2)} m/s`;
            case 2:
              return `${(value / 100 * 3.6).toFixed(2)} kph`;
            case 3:
              return `${(value / 100 * 2.2369).toFixed(2)} mph`;
          }
        case "GPS_ground_course":
          return `${(value / 10).toFixed(1)} \xB0`;
        case "gpsCartesianCoords[0]":
        case "gpsCartesianCoords[1]":
        case "gpsCartesianCoords[2]":
        case "gpsDistance":
          return `${value.toFixed(0)} m`;
        case "gpsHomeAzimuth":
          return `${value.toFixed(1)} \xB0`;
        case "magADC[0]":
        case "magADC[1]":
        case "magADC[2]":
          return `${(value / 10).toFixed(1)} \xB0`;
        case "debug[0]":
        case "debug[1]":
        case "debug[2]":
        case "debug[3]":
        case "debug[4]":
        case "debug[5]":
        case "debug[6]":
        case "debug[7]":
          return FlightLogFieldPresenter.decodeDebugFieldToFriendly(
            flightLog,
            fieldName,
            value
          );
        default:
          return value?.toFixed(0);
      }
    };
    FlightLogFieldPresenter.decodeDebugFieldToFriendly = function(flightLog, fieldName, value) {
      if (flightLog) {
        const debugModeName = DEBUG_MODE[flightLog.getSysConfig().debug_mode];
        switch (debugModeName) {
          case "NONE":
          case "AIRMODE":
          case "BARO":
            switch (fieldName) {
              case "debug[1]":
                return `${value.toFixed(0)} hPa`;
              case "debug[2]":
                return `${(value / 100).toFixed(2)} \xB0C`;
              case "debug[3]":
                return `${(value / 100).toFixed(2)} m`;
              default:
                return `${value.toFixed(0)}`;
            }
          case "VELOCITY":
          case "DFILTER":
            return "";
          case "CYCLETIME":
            switch (fieldName) {
              case "debug[1]":
                return `${value.toFixed(0)} %`;
              default:
                return `${value.toFixed(0)}\u03BCS`;
            }
          case "BATTERY":
            switch (fieldName) {
              case "debug[0]":
                return value.toFixed(0);
              default:
                return `${(value / 10).toFixed(1)} V`;
            }
          case "ACCELEROMETER":
            return `${flightLog.accRawToGs(value).toFixed(2)} g`;
          case "MIXER":
            return `${Math.round(flightLog.rcCommandRawToThrottle(value))} %`;
          case "PIDLOOP":
            return `${value.toFixed(0)} \u03BCS`;
          case "RC_INTERPOLATION":
            switch (fieldName) {
              case "debug[1]":
                return `${value.toFixed(0)} ms`;
              case "debug[3]":
                return `${value.toFixed(0)} \xB0/s`;
              default:
                return value.toFixed(0);
            }
          case "GYRO":
          case "GYRO_FILTERED":
          case "GYRO_SCALED":
          case "DUAL_GYRO":
          case "DUAL_GYRO_COMBINED":
          case "DUAL_GYRO_DIFF":
          case "DUAL_GYRO_RAW":
          case "MULTI_GYRO_DIFF":
          case "MULTI_GYRO_RAW":
          case "MULTI_GYRO_SCALED":
          case "NOTCH":
          case "GYRO_SAMPLE":
            return `${Math.round(flightLog.gyroRawToDegreesPerSecond(value))} \xB0/s`;
          case "ANGLERATE":
            return `${value.toFixed(0)} \xB0/s`;
          case "ESC_SENSOR":
            switch (fieldName) {
              case "debug[3]":
                return `${value.toFixed(0)} \u03BCS`;
              default:
                return value.toFixed(0);
            }
          case "SCHEDULER":
            return `${value.toFixed(0)} \u03BCS`;
          case "STACK":
            return value.toFixed(0);
          case "ESC_SENSOR_RPM":
            return `${value.toFixed(0)} rpm`;
          case "ESC_SENSOR_TMP":
            return `${value.toFixed(0)} \xB0C`;
          case "ALTITUDE":
            switch (fieldName) {
              case "debug[0]":
                return value.toFixed(0);
              case "debug[1]":
              case "debug[2]":
              case "debug[3]":
                return `${(value / 100).toFixed(2)} m`;
              default:
                return value.toFixed(0);
            }
          case "FFT":
            switch (fieldName) {
              case "debug[0]":
              case "debug[1]":
              case "debug[2]":
                return `${Math.round(
                  flightLog.gyroRawToDegreesPerSecond(value)
                )} \xB0/s`;
              default:
                return value.toFixed(0);
            }
          case "FFT_TIME":
            switch (fieldName) {
              case "debug[0]":
                return FlightLogFieldPresenter.presentEnum(value, FFT_CALC_STEPS);
              case "debug[1]":
                return `${value.toFixed(0)} \u03BCs`;
              default:
                return value.toFixed(0);
            }
          case "FFT_FREQ":
            if (semver.gte(flightLog.getSysConfig().firmwareVersion, "2025.12.0")) {
              switch (fieldName) {
                case "debug[0]":
                  return Math.round(flightLog.gyroRawToDegreesPerSecond(value)) + " \xB0/s";
                default:
                  return value.toFixed(0) + " Hz";
              }
            } else {
              switch (fieldName) {
                case "debug[3]":
                  return Math.round(flightLog.gyroRawToDegreesPerSecond(value)) + " \xB0/s";
                default:
                  return value.toFixed(0) + " Hz";
              }
            }
          case "RTH":
            switch (fieldName) {
              default:
                return value.toFixed(0);
            }
          case "ITERM_RELAX":
            switch (fieldName) {
              case "debug[0]":
                return `${value.toFixed(0)} \xB0/s`;
              case "debug[1]":
                return `${value.toFixed(0)} %`;
              case "debug[3]":
                return `${(value / 10).toFixed(1)} \xB0`;
              default:
                return value.toFixed(0);
            }
          case "RC_SMOOTHING":
            switch (fieldName) {
              case "debug[0]":
              case "debug[1]":
              case "debug[2]":
              case "debug[3]":
              case "debug[5]":
                return `${value.toFixed(0)} Hz`;
              case "debug[4]":
                return `${(value / 1e3).toFixed(3)}`;
              default:
                return value.toFixed(0);
            }
          case "RC_SMOOTHING_RATE":
            switch (fieldName) {
              case "debug[0]":
                return `${(value / 1e3).toFixed(2)} ms`;
              case "debug[2]":
                return `${value.toFixed(0)} Hz`;
              default:
                return value.toFixed(0);
            }
          case "DSHOT_RPM_TELEMETRY":
            return `${(value * 200 / flightLog.getSysConfig()["motor_poles"]).toFixed(0)} rpm / ${(value * 3.333 / flightLog.getSysConfig()["motor_poles"]).toFixed(0)} hz`;
          case "RPM_FILTER":
            return `${(value * 60).toFixed(0)}rpm / ${value.toFixed(0)} Hz`;
          case "D_MAX":
            switch (fieldName) {
              case "debug[0]":
              case "debug[1]":
                return `${value.toFixed(0)} %`;
              case "debug[2]":
              case "debug[3]":
                return (value / 10).toFixed(1);
              default:
                return value.toFixed(0);
            }
          case "DYN_LPF":
            switch (fieldName) {
              case "debug[0]":
              case "debug[3]":
                return `${Math.round(
                  flightLog.gyroRawToDegreesPerSecond(value)
                )} \xB0/s`;
              default:
                return `${value.toFixed(0)} Hz`;
            }
          case "DYN_IDLE":
            switch (fieldName) {
              case "debug[3]":
                return `${value * 6} rpm / ${(value / 10).toFixed(0)} hz`;
              default:
                return value.toFixed(0);
            }
          case "AC_CORRECTION":
            return `${(value / 10).toFixed(1)} \xB0/s`;
          case "AC_ERROR":
            return `${(value / 10).toFixed(1)} \xB0`;
          case "RX_TIMING":
            switch (fieldName) {
              case "debug[0]":
              case "debug[3]":
                return `${(value / 100).toFixed(2)} ms`;
              case "debug[1]":
                return `${(value / 10).toFixed(1)} ms`;
              case "debug[4]":
              case "debug[5]":
                return `${value.toFixed(0)} Hz`;
              case "debug[6]":
              case "debug[2]":
              case "debug[7]":
              default:
                return value.toFixed(0);
            }
          case "GHST":
            switch (fieldName) {
              case "debug[3]":
                return `${value.toFixed(0)} %`;
              default:
                return value.toFixed(0);
            }
          case "GHST_MSP":
            switch (fieldName) {
              default:
                return value.toFixed(0);
            }
          case "SCHEDULER_DETERMINISM":
            switch (fieldName) {
              case "debug[0]":
              case "debug[2]":
              case "debug[3]":
                return `${(value / 10).toFixed(1)} us`;
              default:
                return value.toFixed(0);
            }
          case "TIMING_ACCURACY":
            switch (fieldName) {
              case "debug[0]":
                return `${value.toFixed(1)} %`;
              case "debug[2]":
                return `${(value / 10).toFixed(1)} us`;
              default:
                return value.toFixed(0);
            }
          case "RX_EXPRESSLRS_SPI":
            switch (fieldName) {
              case "debug[3]":
                return `${value.toFixed(1)} %`;
              default:
                return value.toFixed(0);
            }
          case "RX_EXPRESSLRS_PHASELOCK":
            switch (fieldName) {
              case "debug[2]":
                return `${value.toFixed(0)} ticks`;
              default:
                return `${value.toFixed(0)} us`;
            }
          case "GPS_RESCUE_THROTTLE_PID":
            switch (fieldName) {
              case "debug[0]":
              case "debug[1]":
              case "debug[4]":
              case "debug[6]":
                return `${value.toFixed(0)} uS`;
              case "debug[2]":
              case "debug[3]":
                return `${(value / 100).toFixed(1)} m`;
              default:
                return value.toFixed(0);
            }
          case "GPS_RESCUE_VELOCITY":
            switch (fieldName) {
              case "debug[0]":
              case "debug[1]":
                return `${(value / 100).toFixed(1)} \xB0`;
              case "debug[2]":
              case "debug[3]":
                return `${(value / 100).toFixed(1)} m/s`;
              default:
                return value.toFixed(0);
            }
          case "GPS_RESCUE_HEADING":
            switch (fieldName) {
              case "debug[0]":
                return `${(value / 100).toFixed(2)} m/s`;
              case "debug[1]":
              case "debug[2]":
              case "debug[3]":
              case "debug[4]":
                return `${(value / 10).toFixed(1)} \xB0`;
              case "debug[6]":
                return `${(value / 100).toFixed(1)} \xB0`;
              case "debug[5]":
              case "debug[7]":
              default:
                return value.toFixed(0);
            }
          case "GPS_RESCUE_TRACKING":
            switch (fieldName) {
              case "debug[0]":
              case "debug[1]":
                return `${(value / 100).toFixed(1)} m/s`;
              case "debug[2]":
              case "debug[3]":
                return `${(value / 100).toFixed(1)} m`;
              default:
                return value.toFixed(0);
            }
          case "GPS__CONNECTION":
            switch (fieldName) {
              case "debug[0]":
              case "debug[1]":
              case "debug[2]":
                return value.toFixed(0);
              case "debug[3]":
                return (value * 100).toFixed(0);
              case "debug[4]":
              case "debug[5]":
              case "debug[6]":
              case "debug[7]":
              default:
                return value.toFixed(0);
            }
          case "ATTITUDE":
            switch (fieldName) {
              case "debug[0]":
              case "debug[1]":
              case "debug[2]":
              case "debug[3]":
              case "debug[4]":
              case "debug[5]":
              case "debug[6]":
              case "debug[7]":
              default:
                return value.toFixed(0);
            }
          case "VTX_MSP":
            switch (fieldName) {
              case "debug[0]":
              case "debug[1]":
              case "debug[2]":
              case "debug[3]":
              default:
                return value.toFixed(0);
            }
          case "GPS_DOP":
            switch (fieldName) {
              case "debug[0]":
                return value.toFixed(0);
              case "debug[1]":
              case "debug[2]":
              case "debug[3]":
              default:
                return (value / 100).toFixed(2);
            }
          case "FAILSAFE":
            return value.toFixed(0);
          case "GYRO_CALIBRATION":
            return value.toFixed(0);
          case "ANGLE_MODE":
            switch (fieldName) {
              case "debug[0]":
              case "debug[1]":
              case "debug[2]":
              case "debug[3]":
                return `${(value / 10).toFixed(1)} \xB0`;
              default:
                return value.toFixed(0);
            }
          case "ANGLE_TARGET":
            return value.toFixed(0);
          case "CURRENT_ANGLE":
            return value.toFixed(0);
          case "DSHOT_TELEMETRY_COUNTS":
            return value.toFixed(0);
          case "EZLANDING":
            return `${(value / 100).toFixed(2)} %`;
          case "OPTICALFLOW":
            switch (fieldName) {
              case "debug[1]":
              case "debug[2]":
              case "debug[3]":
              case "debug[4]":
                return `${(value / 1e3).toFixed(1)}`;
              default:
                return value.toFixed(1);
            }
          case "AUTOPILOT_POSITION":
            switch (fieldName) {
              case "debug[2]":
              case "debug[3]":
              case "debug[4]":
              case "debug[5]":
              case "debug[6]":
              case "debug[7]":
                return `${(value / 10).toFixed(1)}`;
              default:
                return value.toFixed(1);
            }
          case "TPA":
            switch (fieldName) {
              case "debug[1]":
              case "debug[2]":
                return `${(value / 10).toFixed(1)} \xB0`;
              case "debug[4]":
                return `${(value / 10).toFixed(1)} m/s`;
              default:
                return value.toFixed(1);
            }
          case "FEEDFORWARD":
            switch (fieldName) {
              case "debug[0]":
                return `${value.toFixed(0)} \xB0/s`;
              case "debug[1]":
                return `${value.toFixed(0)} \xB0/s/s`;
              case "debug[3]":
                return `${(value / 10).toFixed(1)}`;
              case "debug[4]":
                return `${value.toFixed(0)} %`;
              default:
                return value.toFixed(0);
            }
          case "FEEDFORWARD_LIMIT":
            switch (fieldName) {
              case "debug[0]":
                return `${value.toFixed(0)} %`;
              case "debug[6]":
                return `${(value / 1e3).toFixed(3)}`;
              case "debug[7]":
                return `${value.toFixed(0)} Hz`;
              default:
                return value.toFixed(0);
            }
        }
        return value.toFixed(0);
      }
      return value.toFixed(0);
    };
    FlightLogFieldPresenter.fieldNameToFriendly = function(fieldName, debugMode) {
      if (debugMode) {
        if (fieldName.includes("debug")) {
          let debugModeName = DEBUG_MODE[debugMode];
          let debugFields;
          if (debugModeName) {
            debugFields = DEBUG_FRIENDLY_FIELD_NAMES[debugModeName];
          }
          if (!debugFields) {
            if (fieldName === "debug[all]") {
              return `Debug (${debugModeName || debugMode})`;
            }
            debugFields = DEBUG_FRIENDLY_FIELD_NAMES[DEBUG_MODE[0]];
          }
          return debugFields[fieldName] ?? fieldName;
        }
      }
      if (FRIENDLY_FIELD_NAMES[fieldName]) {
        return FRIENDLY_FIELD_NAMES[fieldName];
      }
      return fieldName;
    };
    FlightLogFieldPresenter.ConvertFieldValue = function(flightLog, fieldName, toFriendly, value) {
      if (value === void 0) {
        return 0;
      }
      const highResolutionScale = flightLog && flightLog.getSysConfig().blackbox_high_resolution > 0 ? 10 : 1;
      const highResolutionAddPrecision = flightLog && flightLog.getSysConfig().blackbox_high_resolution > 0 ? 1 : 0;
      switch (fieldName) {
        case "time":
          return toFriendly ? value / 1e3 : value * 1e3;
        case "gyroADC[0]":
        case "gyroADC[1]":
        case "gyroADC[2]":
        case "gyroUnfilt[0]":
        case "gyroUnfilt[1]":
        case "gyroUnfilt[2]":
          return toFriendly ? flightLog.gyroRawToDegreesPerSecond(value / highResolutionScale) : value * highResolutionScale / flightLog.gyroRawToDegreesPerSecond(1);
        case "axisError[0]":
        case "axisError[1]":
        case "axisError[2]":
          return toFriendly ? value / highResolutionScale : value * highResolutionScale;
        case "rcCommand[0]":
        case "rcCommand[1]":
        case "rcCommand[2]":
          return toFriendly ? value / highResolutionScale + 1500 : (value - 1500) * highResolutionScale;
        case "rcCommand[3]":
          return toFriendly ? value / highResolutionScale : value * highResolutionScale;
        case "motor[0]":
        case "motor[1]":
        case "motor[2]":
        case "motor[3]":
        case "motor[4]":
        case "motor[5]":
        case "motor[6]":
        case "motor[7]":
          return toFriendly ? flightLog.rcMotorRawToPctPhysical(value) : flightLog.PctPhysicalTorcMotorRaw(value);
        case "eRPM[0]":
        case "eRPM[1]":
        case "eRPM[2]":
        case "eRPM[3]":
        case "eRPM[4]":
        case "eRPM[5]":
        case "eRPM[6]":
        case "eRPM[7]":
          let motor_poles = flightLog.getSysConfig()["motor_poles"];
          return toFriendly ? value * 200 / motor_poles : value * motor_poles / 200;
        case "axisSum[0]":
        case "axisSum[1]":
        case "axisSum[2]":
        case "axisP[0]":
        case "axisP[1]":
        case "axisP[2]":
        case "axisI[0]":
        case "axisI[1]":
        case "axisI[2]":
        case "axisD[0]":
        case "axisD[1]":
        case "axisD[2]":
        case "axisF[0]":
        case "axisF[1]":
        case "axisF[2]":
        case "axisS[0]":
        case "axisS[1]":
        case "axisS[2]":
          return toFriendly ? flightLog.getPIDPercentage(value) : value / flightLog.getPIDPercentage(1);
        case "accSmooth[0]":
        case "accSmooth[1]":
        case "accSmooth[2]":
          return toFriendly ? flightLog.accRawToGs(value) : value / flightLog.accRawToGs(1);
        case "vbatLatest":
          if (flightLog.getSysConfig().firmwareType === FIRMWARE_TYPE_BETAFLIGHT && semver.gte(flightLog.getSysConfig().firmwareVersion, "4.0.0")) {
            return toFriendly ? value / 100 : value * 100;
          } else if (flightLog.getSysConfig().firmwareType === FIRMWARE_TYPE_BETAFLIGHT && semver.gte(flightLog.getSysConfig().firmwareVersion, "3.1.0") || flightLog.getSysConfig().firmwareType === FIRMWARE_TYPE_CLEANFLIGHT && semver.gte(flightLog.getSysConfig().firmwareVersion, "2.0.0")) {
            return toFriendly ? value / 10 : value * 10;
          } else {
            return toFriendly ? value / 1e3 : value * 1e3;
          }
        case "amperageLatest":
          if (flightLog.getSysConfig().firmwareType == FIRMWARE_TYPE_BETAFLIGHT && semver.gte(flightLog.getSysConfig().firmwareVersion, "3.1.7") || flightLog.getSysConfig().firmwareType == FIRMWARE_TYPE_CLEANFLIGHT && semver.gte(flightLog.getSysConfig().firmwareVersion, "2.0.0")) {
            return toFriendly ? value / 100 : value * 100;
          } else if (flightLog.getSysConfig().firmwareType == FIRMWARE_TYPE_BETAFLIGHT && semver.gte(flightLog.getSysConfig().firmwareVersion, "3.1.0")) {
            return toFriendly ? value / 100 : value * 100;
          } else {
            return toFriendly ? value / 1e3 : value * 1e3;
          }
        case "heading[0]":
        case "heading[1]":
        case "heading[2]":
          return toFriendly ? value / Math.PI * 180 : value * Math.PI / 180;
        case "baroAlt":
          return toFriendly ? FlightLogFieldPresenter.decodeAltitudeLogToChart(
            value / 100,
            userSettings.altitudeUnits
          ) : value * 100 / FlightLogFieldPresenter.decodeAltitudeLogToChart(
            1,
            userSettings.altitudeUnits
          );
        case "flightModeFlags":
          return value;
        case "stateFlags":
          return value;
        case "failsafePhase":
          return value;
        case "features":
          return value;
        case "rssi":
          return toFriendly ? value / 1024 * 100 : value * 1024 / 100;
        case "GPS_numSat":
          return value;
        case "GPS_coord[0]":
        case "GPS_coord[1]":
          return toFriendly ? value / 1e7 : value * 1e7;
        case "GPS_altitude":
          return toFriendly ? FlightLogFieldPresenter.decodeAltitudeLogToChart(
            value / 10,
            userSettings.altitudeUnits
          ) : value * 10 / FlightLogFieldPresenter.decodeAltitudeLogToChart(
            1,
            userSettings.altitudeUnits
          );
        case "GPS_speed":
          switch (userSettings.speedUnits) {
            case 1:
              return toFriendly ? value / 100 : value * 100;
            case 2:
              return toFriendly ? value / 100 * 3.6 : 100 * value / 3.6;
            case 3:
              return toFriendly ? value / 100 * 2.2369 : value * 100 / 2.2369;
          }
        case "GPS_ground_course":
          return toFriendly ? value / 10 : value * 10;
        case "magADC[0]":
        case "magADC[1]":
        case "magADC[2]":
          return toFriendly ? value / 10 : value * 10;
        case "debug[0]":
        case "debug[1]":
        case "debug[2]":
        case "debug[3]":
        case "debug[4]":
        case "debug[5]":
        case "debug[6]":
        case "debug[7]":
          return FlightLogFieldPresenter.ConvertDebugFieldValue(
            flightLog,
            fieldName,
            toFriendly,
            value
          );
        default:
          return value;
      }
    };
    FlightLogFieldPresenter.ConvertDebugFieldValue = function(flightLog, fieldName, toFriendly, value) {
      if (flightLog) {
        const debugModeName = DEBUG_MODE[flightLog.getSysConfig().debug_mode];
        switch (debugModeName) {
          case "NONE":
          case "AIRMODE":
          case "BARO":
            switch (fieldName) {
              case "debug[1]":
                return value;
              case "debug[2]":
                return toFriendly ? value / 100 : value * 100;
              case "debug[3]":
                return toFriendly ? value / 100 : value * 100;
              default:
                return value;
            }
          case "VELOCITY":
          case "DFILTER":
            return value;
          case "CYCLETIME":
            switch (fieldName) {
              case "debug[1]":
                return value;
              default:
                return value;
            }
          case "BATTERY":
            switch (fieldName) {
              case "debug[0]":
                return value;
              default:
                return toFriendly ? value / 10 : value * 10;
            }
          case "ACCELEROMETER":
            return toFriendly ? flightLog.accRawToGs(value) : value / flightLog.accRawToGs(1);
          case "MIXER":
            return toFriendly ? flightLog.rcCommandRawToThrottle(value) : flightLog.ThrottleTorcCommandRaw(value);
          case "PIDLOOP":
            return value;
          case "RC_INTERPOLATION":
            switch (fieldName) {
              case "debug[1]":
                return value;
              case "debug[3]":
                return value;
              default:
                return value;
            }
          case "GYRO":
          case "GYRO_FILTERED":
          case "GYRO_SCALED":
          case "DUAL_GYRO":
          case "DUAL_GYRO_COMBINED":
          case "DUAL_GYRO_DIFF":
          case "DUAL_GYRO_RAW":
          case "MULTI_GYRO_DIFF":
          case "MULTI_GYRO_RAW":
          case "MULTI_GYRO_SCALED":
          case "NOTCH":
          case "GYRO_SAMPLE":
            return toFriendly ? flightLog.gyroRawToDegreesPerSecond(value) : value / flightLog.gyroRawToDegreesPerSecond(1);
          case "ANGLERATE":
            return value;
          case "ESC_SENSOR":
            switch (fieldName) {
              case "debug[3]":
                return value;
              default:
                return value;
            }
          case "SCHEDULER":
            return value;
          case "STACK":
            return value;
          case "ESC_SENSOR_RPM":
            return value;
          case "ESC_SENSOR_TMP":
            return value;
          case "ALTITUDE":
            switch (fieldName) {
              case "debug[0]":
                return value;
              case "debug[1]":
              case "debug[2]":
              case "debug[3]":
                return toFriendly ? value / 100 : value * 100;
              default:
                return value;
            }
          case "FFT":
            switch (fieldName) {
              case "debug[0]":
              case "debug[1]":
              case "debug[2]":
                return toFriendly ? flightLog.gyroRawToDegreesPerSecond(value) : value / flightLog.gyroRawToDegreesPerSecond(1);
              default:
                return value;
            }
          case "FFT_TIME":
            switch (fieldName) {
              case "debug[0]":
                return value;
              case "debug[1]":
                return value;
              default:
                return value;
            }
          case "FFT_FREQ":
            if (semver.gte(flightLog.getSysConfig().firmwareVersion, "2025.12.0")) {
              switch (fieldName) {
                case "debug[0]":
                  return toFriendly ? flightLog.gyroRawToDegreesPerSecond(value) : value / flightLog.gyroRawToDegreesPerSecond(1);
                default:
                  return value;
              }
            } else {
              switch (fieldName) {
                case "debug[3]":
                  return toFriendly ? flightLog.gyroRawToDegreesPerSecond(value) : value / flightLog.gyroRawToDegreesPerSecond(1);
                default:
                  return value;
              }
            }
          case "RTH":
            switch (fieldName) {
              default:
                return value;
            }
          case "ITERM_RELAX":
            switch (fieldName) {
              case "debug[0]":
                return value;
              case "debug[1]":
                return value;
              case "debug[3]":
                return toFriendly ? value / 10 : value * 10;
              default:
                return value;
            }
          case "RC_SMOOTHING":
            switch (fieldName) {
              case "debug[4]":
                return toFriendly ? value / 1e3 : value * 1e3;
              default:
                return value;
            }
          case "RC_SMOOTHING_RATE":
            switch (fieldName) {
              case "debug[0]":
                return toFriendly ? value / 1e3 : value * 1e3;
              case "debug[2]":
              case "debug[3]":
              default:
                return value;
            }
          case "DSHOT_RPM_TELEMETRY":
            let pole = flightLog.getSysConfig()["motor_poles"];
            return toFriendly ? value * 200 / pole : value * pole / 200;
          case "RPM_FILTER":
            return toFriendly ? value * 60 : value / 60;
          case "D_MAX":
            switch (fieldName) {
              case "debug[0]":
              case "debug[1]":
                return value;
              case "debug[2]":
              case "debug[3]":
                return toFriendly ? value / 10 : value * 10;
              default:
                return value;
            }
          case "DYN_LPF":
            switch (fieldName) {
              case "debug[0]":
              case "debug[3]":
                return toFriendly ? flightLog.gyroRawToDegreesPerSecond(value) : value / flightLog.gyroRawToDegreesPerSecond(1);
              default:
                return value;
            }
          case "DYN_IDLE":
            switch (fieldName) {
              case "debug[3]":
                return toFriendly ? value * 6 : value / 6;
              default:
                return value;
            }
          case "AC_CORRECTION":
            return toFriendly ? value / 10 : value * 10;
          case "AC_ERROR":
            return toFriendly ? value / 10 : value * 10;
          case "RX_TIMING":
            switch (fieldName) {
              case "debug[0]":
              case "debug[3]":
                return toFriendly ? value / 100 : value * 100;
              case "debug[1]":
                return toFriendly ? value / 10 : value * 10;
              default:
                return value;
            }
          case "GHST":
            switch (fieldName) {
              case "debug[3]":
                return value;
              default:
                return value;
            }
          case "GHST_MSP":
            switch (fieldName) {
              default:
                return value;
            }
          case "SCHEDULER_DETERMINISM":
            switch (fieldName) {
              case "debug[0]":
              case "debug[2]":
              case "debug[3]":
                return toFriendly ? value / 10 : value * 10;
              default:
                return value;
            }
          case "TIMING_ACCURACY":
            switch (fieldName) {
              case "debug[0]":
                return value;
              case "debug[2]":
                return toFriendly ? value / 10 : value * 10;
              default:
                return value;
            }
          case "RX_EXPRESSLRS_SPI":
            switch (fieldName) {
              case "debug[3]":
                return value;
              default:
                return value;
            }
          case "RX_EXPRESSLRS_PHASELOCK":
            switch (fieldName) {
              case "debug[2]":
                return value;
              default:
                return value;
            }
          case "GPS_RESCUE_THROTTLE_PID":
            switch (fieldName) {
              case "debug[0]":
              case "debug[1]":
              case "debug[4]":
              case "debug[6]":
                return value;
              case "debug[2]":
              case "debug[3]":
                return toFriendly ? value / 100 : value * 100;
              default:
                return value;
            }
          case "GPS_RESCUE_VELOCITY":
            switch (fieldName) {
              case "debug[0]":
              case "debug[1]":
                return toFriendly ? value / 100 : value * 100;
              case "debug[2]":
              case "debug[3]":
                return toFriendly ? value / 100 : value * 100;
              default:
                return value;
            }
          case "GPS_RESCUE_HEADING":
            switch (fieldName) {
              case "debug[0]":
                return toFriendly ? value / 100 : value * 100;
              case "debug[1]":
              case "debug[2]":
              case "debug[3]":
              case "debug[4]":
                return toFriendly ? value / 10 : value * 10;
              case "debug[6]":
                return toFriendly ? value / 100 : value * 100;
              case "debug[5]":
              case "debug[7]":
              default:
                return value;
            }
          case "GPS_RESCUE_TRACKING":
            switch (fieldName) {
              case "debug[0]":
              case "debug[1]":
                return toFriendly ? value / 100 : value * 100;
              case "debug[2]":
              case "debug[3]":
                return toFriendly ? value / 100 : value * 100;
              default:
                return value;
            }
          case "GPS__CONNECTION":
            switch (fieldName) {
              case "debug[0]":
              case "debug[1]":
              case "debug[2]":
                return value;
              case "debug[3]":
                return toFriendly ? value * 100 : value / 100;
              case "debug[4]":
              case "debug[5]":
              case "debug[6]":
              case "debug[7]":
              default:
                return value;
            }
          case "ATTITUDE":
            switch (fieldName) {
              case "debug[0]":
              case "debug[1]":
              case "debug[2]":
              case "debug[3]":
              case "debug[4]":
              case "debug[5]":
              case "debug[6]":
              case "debug[7]":
              default:
                return value;
            }
          case "VTX_MSP":
            switch (fieldName) {
              case "debug[0]":
              case "debug[1]":
              case "debug[2]":
              case "debug[3]":
              default:
                return value;
            }
          case "GPS_DOP":
            switch (fieldName) {
              case "debug[0]":
                return value;
              case "debug[1]":
              case "debug[2]":
              case "debug[3]":
              default:
                return toFriendly ? value / 100 : value * 100;
            }
          case "FAILSAFE":
            return value;
          case "GYRO_CALIBRATION":
            return value;
          case "ANGLE_MODE":
            switch (fieldName) {
              case "debug[0]":
              case "debug[1]":
              case "debug[2]":
              case "debug[3]":
                return toFriendly ? value / 10 : value * 10;
              default:
                return value;
            }
          case "ANGLE_TARGET":
            return value;
          case "CURRENT_ANGLE":
            return value;
          case "DSHOT_TELEMETRY_COUNTS":
            return value;
          case "OPTICALFLOW":
            switch (fieldName) {
              case "debug[1]":
              case "debug[2]":
              case "debug[3]":
              case "debug[4]":
                return toFriendly ? value / 1e3 : value * 1e3;
              default:
                return value;
            }
          case "AUTOPILOT_POSITION":
            switch (fieldName) {
              case "debug[2]":
              case "debug[3]":
              case "debug[4]":
              case "debug[5]":
              case "debug[6]":
              case "debug[7]":
                return toFriendly ? value / 10 : value * 10;
              default:
                return value;
            }
          case "TPA":
            switch (fieldName) {
              case "debug[1]":
              case "debug[2]":
              case "debug[4]":
                return toFriendly ? value / 10 : value * 10;
              default:
                return value;
            }
          case "FEEDFORWARD":
            switch (fieldName) {
              case "debug[3]":
                return toFriendly ? value / 10 : value * 10;
              default:
                return value;
            }
          case "FEEDFORWARD_LIMIT":
            switch (fieldName) {
              case "debug[6]":
                return toFriendly ? value / 1e3 : value * 1e3;
              default:
                return value;
            }
        }
      }
      return value;
    };
  }
});

// src/datastream.js
var EOF, ArrayDataStream;
var init_datastream = __esm({
  "src/datastream.js"() {
    init_tools();
    EOF = -1;
    ArrayDataStream = function(data, start, end) {
      this.data = data;
      this.eof = false;
      this.start = start === void 0 ? 0 : start;
      this.end = end === void 0 ? data.length : end;
      this.pos = this.start;
    };
    ArrayDataStream.prototype.readChar = function() {
      if (this.pos < this.end) return String.fromCharCode(this.data[this.pos++]);
      this.eof = true;
      return EOF;
    };
    ArrayDataStream.prototype.readByte = function() {
      if (this.pos < this.end) return this.data[this.pos++];
      this.eof = true;
      return EOF;
    };
    ArrayDataStream.prototype.readU8 = ArrayDataStream.prototype.readByte;
    ArrayDataStream.prototype.readS8 = function() {
      return signExtend8Bit(this.readByte());
    };
    ArrayDataStream.prototype.unreadChar = function(c) {
      this.pos--;
    };
    ArrayDataStream.prototype.peekChar = function() {
      if (this.pos < this.end) return String.fromCharCode(this.data[this.pos]);
      this.eof = true;
      return EOF;
    };
    ArrayDataStream.prototype.readUnsignedVB = function() {
      let i, b, shift = 0, result = 0;
      for (i = 0; i < 5; i++) {
        b = this.readByte();
        if (b == EOF) return 0;
        result = result | (b & ~128) << shift;
        if (b < 128) {
          return result >>> 0;
        }
        shift += 7;
      }
      return 0;
    };
    ArrayDataStream.prototype.readSignedVB = function() {
      let unsigned = this.readUnsignedVB();
      return unsigned >>> 1 ^ -(unsigned & 1);
    };
    ArrayDataStream.prototype.readString = function(length) {
      let chars = new Array(length), i;
      for (i = 0; i < length; i++) {
        chars[i] = this.readChar();
      }
      return chars.join("");
    };
    ArrayDataStream.prototype.readS16 = function() {
      let b1 = this.readByte(), b2 = this.readByte();
      return signExtend16Bit(b1 | b2 << 8);
    };
    ArrayDataStream.prototype.readU16 = function() {
      let b1 = this.readByte(), b2 = this.readByte();
      return b1 | b2 << 8;
    };
    ArrayDataStream.prototype.readU32 = function() {
      let b1 = this.readByte(), b2 = this.readByte(), b3 = this.readByte(), b4 = this.readByte();
      return b1 | b2 << 8 | b3 << 16 | b4 << 24;
    };
    ArrayDataStream.prototype.nextOffsetOf = function(needle) {
      let i, j;
      for (i = this.pos; i <= this.end - needle.length; i++) {
        if (this.data[i] == needle[0]) {
          for (j = 1; j < needle.length && this.data[i + j] == needle[j]; j++) ;
          if (j == needle.length) return i;
        }
      }
      return -1;
    };
    ArrayDataStream.prototype.EOF = EOF;
  }
});

// src/decoders.js
var init_decoders = __esm({
  "src/decoders.js"() {
    init_datastream();
    init_tools();
    ArrayDataStream.prototype.readTag2_3S32 = function(values) {
      let leadByte, byte1, byte2, byte3, byte4, i;
      leadByte = this.readByte();
      switch (leadByte >> 6) {
        case 0:
          values[0] = signExtend2Bit(leadByte >> 4 & 3);
          values[1] = signExtend2Bit(leadByte >> 2 & 3);
          values[2] = signExtend2Bit(leadByte & 3);
          break;
        case 1:
          values[0] = signExtend4Bit(leadByte & 15);
          leadByte = this.readByte();
          values[1] = signExtend4Bit(leadByte >> 4);
          values[2] = signExtend4Bit(leadByte & 15);
          break;
        case 2:
          values[0] = signExtend6Bit(leadByte & 63);
          leadByte = this.readByte();
          values[1] = signExtend6Bit(leadByte & 63);
          leadByte = this.readByte();
          values[2] = signExtend6Bit(leadByte & 63);
          break;
        case 3:
          for (i = 0; i < 3; i++) {
            switch (leadByte & 3) {
              case 0:
                byte1 = this.readByte();
                values[i] = signExtend8Bit(byte1);
                break;
              case 1:
                byte1 = this.readByte();
                byte2 = this.readByte();
                values[i] = signExtend16Bit(byte1 | byte2 << 8);
                break;
              case 2:
                byte1 = this.readByte();
                byte2 = this.readByte();
                byte3 = this.readByte();
                values[i] = signExtend24Bit(byte1 | byte2 << 8 | byte3 << 16);
                break;
              case 3:
                byte1 = this.readByte();
                byte2 = this.readByte();
                byte3 = this.readByte();
                byte4 = this.readByte();
                values[i] = byte1 | byte2 << 8 | byte3 << 16 | byte4 << 24;
                break;
            }
            leadByte >>= 2;
          }
          break;
      }
    };
    ArrayDataStream.prototype.readTag2_3SVariable = function(values) {
      let leadByte, leadByte2, leadByte3, byte1, byte2, byte3, byte4, i;
      leadByte = this.readByte();
      switch (leadByte >> 6) {
        case 0:
          values[0] = signExtend2Bit(leadByte >> 4 & 3);
          values[1] = signExtend2Bit(leadByte >> 2 & 3);
          values[2] = signExtend2Bit(leadByte & 3);
          break;
        case 1:
          values[0] = signExtend5Bit((leadByte & 62) >> 1);
          leadByte2 = this.readByte();
          values[1] = signExtend5Bit(
            (leadByte & 1) << 5 | (leadByte2 & 15) >> 4
          );
          values[2] = signExtend4Bit(leadByte2 & 15);
          break;
        case 2:
          leadByte2 = this.readByte();
          values[1] = signExtend8Bit(
            (leadByte & 63) << 2 | (leadByte2 & 192) >> 6
          );
          leadByte3 = this.readByte();
          values[1] = signExtend7Bit(
            (leadByte2 & 63) << 1 | (leadByte2 & 128) >> 7
          );
          values[2] = signExtend7Bit(leadByte3 & 127);
          break;
        case 3:
          for (i = 0; i < 3; i++) {
            switch (leadByte & 3) {
              case 0:
                byte1 = this.readByte();
                values[i] = signExtend8Bit(byte1);
                break;
              case 1:
                byte1 = this.readByte();
                byte2 = this.readByte();
                values[i] = signExtend16Bit(byte1 | byte2 << 8);
                break;
              case 2:
                byte1 = this.readByte();
                byte2 = this.readByte();
                byte3 = this.readByte();
                values[i] = signExtend24Bit(byte1 | byte2 << 8 | byte3 << 16);
                break;
              case 3:
                byte1 = this.readByte();
                byte2 = this.readByte();
                byte3 = this.readByte();
                byte4 = this.readByte();
                values[i] = byte1 | byte2 << 8 | byte3 << 16 | byte4 << 24;
                break;
            }
            leadByte >>= 2;
          }
          break;
      }
    };
    ArrayDataStream.prototype.readTag8_4S16_v1 = function(values) {
      let selector, combinedChar, char1, char2, i, FIELD_ZERO = 0, FIELD_4BIT = 1, FIELD_8BIT = 2, FIELD_16BIT = 3;
      selector = this.readByte();
      for (i = 0; i < 4; i++) {
        switch (selector & 3) {
          case FIELD_ZERO:
            values[i] = 0;
            break;
          case FIELD_4BIT:
            combinedChar = this.readByte();
            values[i] = signExtend4Bit(combinedChar & 15);
            i++;
            selector >>= 2;
            values[i] = signExtend4Bit(combinedChar >> 4);
            break;
          case FIELD_8BIT:
            values[i] = signExtend8Bit(this.readByte());
            break;
          case FIELD_16BIT:
            char1 = this.readByte();
            char2 = this.readByte();
            values[i] = signExtend16Bit(char1 | char2 << 8);
            break;
        }
        selector >>= 2;
      }
    };
    ArrayDataStream.prototype.readTag8_4S16_v2 = function(values) {
      let selector, i, char1, char2, buffer, nibbleIndex, FIELD_ZERO = 0, FIELD_4BIT = 1, FIELD_8BIT = 2, FIELD_16BIT = 3;
      selector = this.readByte();
      nibbleIndex = 0;
      for (i = 0; i < 4; i++) {
        switch (selector & 3) {
          case FIELD_ZERO:
            values[i] = 0;
            break;
          case FIELD_4BIT:
            if (nibbleIndex === 0) {
              buffer = this.readByte();
              values[i] = signExtend4Bit(buffer >> 4);
              nibbleIndex = 1;
            } else {
              values[i] = signExtend4Bit(buffer & 15);
              nibbleIndex = 0;
            }
            break;
          case FIELD_8BIT:
            if (nibbleIndex === 0) {
              values[i] = signExtend8Bit(this.readByte());
            } else {
              char1 = (buffer & 15) << 4;
              buffer = this.readByte();
              char1 |= buffer >> 4;
              values[i] = signExtend8Bit(char1);
            }
            break;
          case FIELD_16BIT:
            if (nibbleIndex === 0) {
              char1 = this.readByte();
              char2 = this.readByte();
              values[i] = signExtend16Bit(char1 << 8 | char2);
            } else {
              char1 = this.readByte();
              char2 = this.readByte();
              values[i] = signExtend16Bit(
                (buffer & 15) << 12 | char1 << 4 | char2 >> 4
              );
              buffer = char2;
            }
            break;
        }
        selector >>= 2;
      }
    };
    ArrayDataStream.prototype.readTag8_8SVB = function(values, valueCount) {
      let i, header;
      if (valueCount == 1) {
        values[0] = this.readSignedVB();
      } else {
        header = this.readByte();
        for (i = 0; i < 8; i++, header >>= 1)
          values[i] = header & 1 ? this.readSignedVB() : 0;
      }
    };
  }
});

// src/flightlog_parser.js
function FlightLogParser(logData) {
  let FLIGHT_LOG_MAX_FIELDS = 128, FLIGHT_LOG_MAX_FRAME_LENGTH = 256, MAXIMUM_TIME_JUMP_BETWEEN_FRAMES = 10 * 1e6, MAXIMUM_ITERATION_JUMP_BETWEEN_FRAMES = 500 * 10, FLIGHT_LOG_FIELD_PREDICTOR_0 = 0, FLIGHT_LOG_FIELD_PREDICTOR_PREVIOUS = 1, FLIGHT_LOG_FIELD_PREDICTOR_STRAIGHT_LINE = 2, FLIGHT_LOG_FIELD_PREDICTOR_AVERAGE_2 = 3, FLIGHT_LOG_FIELD_PREDICTOR_MINTHROTTLE = 4, FLIGHT_LOG_FIELD_PREDICTOR_MOTOR_0 = 5, FLIGHT_LOG_FIELD_PREDICTOR_INC = 6, FLIGHT_LOG_FIELD_PREDICTOR_HOME_COORD = 7, FLIGHT_LOG_FIELD_PREDICTOR_1500 = 8, FLIGHT_LOG_FIELD_PREDICTOR_VBATREF = 9, FLIGHT_LOG_FIELD_PREDICTOR_LAST_MAIN_FRAME_TIME = 10, FLIGHT_LOG_FIELD_PREDICTOR_MINMOTOR = 11, FLIGHT_LOG_FIELD_PREDICTOR_HOME_COORD_1 = 256, FLIGHT_LOG_FIELD_ENCODING_SIGNED_VB = 0, FLIGHT_LOG_FIELD_ENCODING_UNSIGNED_VB = 1, FLIGHT_LOG_FIELD_ENCODING_NEG_14BIT = 3, FLIGHT_LOG_FIELD_ENCODING_TAG8_8SVB = 6, FLIGHT_LOG_FIELD_ENCODING_TAG2_3S32 = 7, FLIGHT_LOG_FIELD_ENCODING_TAG8_4S16 = 8, FLIGHT_LOG_FIELD_ENCODING_NULL = 9, FLIGHT_LOG_FIELD_ENCODING_TAG2_3SVARIABLE = 10, FLIGHT_LOG_EVENT_LOG_END = 255, EOF2 = ArrayDataStream.prototype.EOF, NEWLINE = "\n".charCodeAt(0), INFLIGHT_ADJUSTMENT_FUNCTIONS = [
    {
      name: "None"
    },
    {
      name: "RC Rate",
      scale: 0.01
    },
    {
      name: "RC Expo",
      scale: 0.01
    },
    {
      name: "Throttle Expo",
      scale: 0.01
    },
    {
      name: "Pitch & Roll Rate",
      scale: 0.01
    },
    {
      name: "Yaw rate",
      scale: 0.01
    },
    {
      name: "Pitch & Roll P",
      scale: 0.1,
      scalef: 1
    },
    {
      name: "Pitch & Roll I",
      scale: 1e-3,
      scalef: 0.1
    },
    {
      name: "Pitch & Roll D",
      scalef: 1e3
    },
    {
      name: "Yaw P",
      scale: 0.1,
      scalef: 1
    },
    {
      name: "Yaw I",
      scale: 1e-3,
      scalef: 0.1
    },
    {
      name: "Yaw D",
      scalef: 1e3
    },
    {
      name: "Rate Profile"
    },
    {
      name: "Pitch Rate",
      scale: 0.01
    },
    {
      name: "Roll Rate",
      scale: 0.01
    },
    {
      name: "Pitch P",
      scale: 0.1,
      scalef: 1
    },
    {
      name: "Pitch I",
      scale: 1e-3,
      scalef: 0.1
    },
    {
      name: "Pitch D",
      scalef: 1e3
    },
    {
      name: "Roll P",
      scale: 0.1,
      scalef: 1
    },
    {
      name: "Roll I",
      scale: 1e-3,
      scalef: 0.1
    },
    {
      name: "Roll D",
      scalef: 1e3
    }
  ];
  let that = this, dataVersion, defaultSysConfig = {
    frameIntervalI: 32,
    frameIntervalPNum: 1,
    frameIntervalPDenom: 1,
    firmwareType: FIRMWARE_TYPE_UNKNOWN,
    rcRate: 90,
    vbatscale: 110,
    vbatref: 4095,
    vbatmincellvoltage: 33,
    vbatmaxcellvoltage: 43,
    vbatwarningcellvoltage: 35,
    gyroScale: 1e-4,
    // Not even close to the default, but it's hardware specific so we can't do much better
    acc_1G: 2048,
    // Ditto ^
    minthrottle: 1150,
    maxthrottle: 1850,
    currentMeterOffset: 0,
    currentMeterScale: 400,
    deviceUID: null
  }, defaultSysConfigExtension = {
    abs_control_gain: null,
    // Absolute control gain
    anti_gravity_gain: null,
    // Anti gravity gain
    anti_gravity_p_gain: null,
    // Anti gravity P gain
    anti_gravity_mode: null,
    // Anti gravity mode
    anti_gravity_threshold: null,
    // Anti gravity threshold for step mode
    anti_gravity_cutoff_hz: null,
    // Anti gravity Cutoff
    blackbox_high_resolution: null,
    // Blackbox high resolution mode
    thrMid: null,
    // Throttle Mid Position
    thrExpo: null,
    // Throttle Expo
    tpa_mode: null,
    // TPA Mode
    tpa_breakpoint: null,
    // TPA Breakpoint
    airmode_activate_throttle: null,
    // airmode activation level
    serialrx_provider: null,
    // name of the serial rx provider
    superExpoFactor: null,
    // Super Expo Factor
    rates: [null, null, null],
    // Rates [ROLL, PITCH, YAW]
    rate_limits: [1998, 1998, 1998],
    // Limits [ROLL, PITCH, YAW] with defaults for backward compatibility
    rc_rates: [null, null, null],
    // RC Rates [ROLL, PITCH, YAW]
    rc_expo: [null, null, null],
    // RC Expo [ROLL, PITCH, YAW]
    looptime: null,
    // Looptime
    gyro_sync_denom: null,
    // Gyro Sync Denom
    pid_process_denom: null,
    // PID Process Denom
    pidController: null,
    // Active PID Controller
    rollPID: [null, null, null],
    // Roll [P, I, D]
    pitchPID: [null, null, null],
    // Pitch[P, I, D]
    yawPID: [null, null, null],
    // Yaw  [P, I, D]
    altPID: [null, null, null],
    // Altitude Hold [P, I, D]
    posPID: [null, null, null],
    // Position Hold [P, I, D]
    posrPID: [null, null, null],
    // Position Rate [P, I, D]
    navrPID: [null, null, null],
    // Nav Rate      [P, I, D]
    levelPID: [null, null, null],
    // Level Mode    [P, I, D]
    magPID: null,
    // Magnetometer   P
    velPID: [null, null, null],
    // Velocity      [P, I, D]
    yaw_p_limit: null,
    // Yaw P Limit
    yaw_lpf_hz: null,
    // Yaw LowPass Filter Hz
    dterm_average_count: null,
    // DTerm Average Count
    rollPitchItermResetRate: null,
    // ITerm Reset rate for Roll and Pitch
    yawItermResetRate: null,
    // ITerm Reset Rate for Yaw
    dshot_bidir: null,
    // DShot bidir protocol enabled
    dterm_lpf_hz: null,
    // DTerm Lowpass Filter Hz
    dterm_lpf_dyn_hz: [null, null],
    // DTerm Lowpass Dynamic Filter Min and Max Hz
    dterm_lpf_dyn_expo: null,
    // DTerm Lowpass Dynamic Filter Expo
    dterm_lpf2_hz: null,
    // DTerm Lowpass Filter Hz 2
    dterm_differentiator: null,
    // DTerm Differentiator
    H_sensitivity: null,
    // Horizon Sensitivity
    iterm_reset_offset: null,
    // I-Term reset offset
    deadband: null,
    // Roll, Pitch Deadband
    yaw_deadband: null,
    // Yaw Deadband
    gyro_lpf: null,
    // Gyro lpf setting.
    gyro_32khz_hardware_lpf: null,
    // Gyro 32khz hardware lpf setting. (post BF3.4)
    gyro_lowpass_hz: null,
    // Gyro Soft Lowpass Filter Hz
    gyro_lowpass_dyn_hz: [null, null],
    // Gyro Soft Lowpass Dynamic Filter Min and Max Hz
    gyro_lowpass_dyn_expo: null,
    // Gyro Soft Lowpass Dynamic Filter Expo
    gyro_lowpass2_hz: null,
    // Gyro Soft Lowpass Filter Hz 2
    gyro_notch_hz: null,
    // Gyro Notch Frequency
    gyro_notch_cutoff: null,
    // Gyro Notch Cutoff
    gyro_rpm_notch_harmonics: null,
    // Number of Harmonics in the gyro rpm filter
    gyro_rpm_notch_q: null,
    // Value of Q in the gyro rpm filter
    gyro_rpm_notch_min: null,
    // Min Hz for the gyro rpm filter
    rpm_notch_lpf: null,
    // Cutoff for smoothing rpm filter data
    dterm_rpm_notch_harmonics: null,
    // Number of Harmonics in the dterm rpm filter
    dterm_rpm_notch_q: null,
    // Value of Q in the dterm rpm filter
    dterm_rpm_notch_min: null,
    // Min Hz for the dterm rpm filter
    dterm_notch_hz: null,
    // Dterm Notch Frequency
    dterm_notch_cutoff: null,
    // Dterm Notch Cutoff
    acc_lpf_hz: null,
    // Accelerometer Lowpass filter Hz
    acc_hardware: null,
    // Accelerometer Hardware type
    baro_hardware: null,
    // Barometer Hardware type
    mag_hardware: null,
    // Magnetometer Hardware type
    gyro_cal_on_first_arm: null,
    // Gyro Calibrate on first arm
    vbat_pid_compensation: null,
    // VBAT PID compensation
    rate_limits: [null, null, null],
    // RC Rate limits
    rc_smoothing: null,
    // RC Control Smoothing
    rc_interpolation: null,
    // RC Control Interpolation type
    rc_interpolation_channels: null,
    // RC Control Interpotlation channels
    rc_interpolation_interval: null,
    // RC Control Interpolation Interval
    rc_smoothing_active_cutoffs: [null, null],
    // RC Smoothing active cutoffs
    rc_smoothing_cutoffs: [null, null],
    // RC Smoothing input and derivative cutoff
    rc_smoothing_filter_type: [null, null],
    // RC Smoothing input and derivative type
    rc_smoothing_rx_average: null,
    // RC Smoothing rx average read in ms
    rc_smoothing_debug_axis: null,
    // Axis recorded in the debug mode of rc_smoothing
    dterm_filter_type: null,
    // D term filtering type (PT1, BIQUAD, PT2, PT3)
    dterm_filter2_type: null,
    // D term 2 filtering type (PT1, BIQUAD, PT2, PT3)
    pidAtMinThrottle: null,
    // Stabilisation at zero throttle
    itermThrottleGain: null,
    // Betaflight PID
    ptermSetpointWeight: null,
    // Betaflight PID
    dtermSetpointWeight: null,
    // Betaflight PID
    yawRateAccelLimit: null,
    // Betaflight PID
    rateAccelLimit: null,
    // Betaflight PID
    gyro_soft_type: null,
    // Gyro soft filter type (PT1, BIQUAD, PT2, PT3)
    gyro_soft2_type: null,
    // Gyro soft filter 2 type (PT1, BIQUAD, PT2, PT3)
    debug_mode: null,
    // Selected Debug Mode
    features: null,
    // Activated features (e.g. MOTORSTOP etc)
    Craft_name: null,
    // Craft Name
    motorOutput: [null, null],
    // Minimum and maximum outputs to motor's
    digitalIdleOffset: null,
    // min throttle for d-shot (as a percentage)
    pidSumLimit: null,
    // PID sum limit
    pidSumLimitYaw: null,
    // PID sum limit yaw
    use_integrated_yaw: null,
    // Use integrated yaw
    d_max: [null, null, null],
    // D_MAX [ROLL, PITCH, YAW]
    d_max_gain: null,
    // D_MAX gain
    d_max_advance: null,
    // D_MAX advance
    iterm_relax: null,
    // ITerm Relax mode
    iterm_relax_type: null,
    // ITerm Relax type
    iterm_relax_cutoff: null,
    // ITerm Relax cutoff
    dyn_notch_range: null,
    // Dyn Notch Range (LOW, MED, HIGH or AUTO)
    dyn_notch_width_percent: null,
    // Dyn Notch width percent distance between the two notches
    dyn_notch_q: null,
    // Dyn Notch width of each dynamic filter
    dyn_notch_min_hz: null,
    // Dyn Notch min limit in Hz for the filter
    dyn_notch_max_hz: null,
    // Dyn Notch max limit in Hz for the filter
    rates_type: null,
    fields_disabled_mask: null,
    vbat_sag_compensation: null,
    gyro_to_use: null,
    gyro_enabled_bitmask: null,
    dynamic_idle_min_rpm: null,
    motor_poles: 1,
    ff_transition: null,
    ff_averaging: null,
    ff_smooth_factor: null,
    ff_jitter_factor: null,
    ff_boost: null,
    ff_max_rate_limit: null,
    rc_smoothing_mode: null,
    // ** 4.3** RC on or off (0 or 1)
    rc_smoothing_feedforward_hz: null,
    // RC Smoothing manual cutoff for feedforward
    rc_smoothing_setpoint_hz: null,
    // RC Smoothing manual cutoff for setpoint
    rc_smoothing_auto_factor_setpoint: null,
    // RC Smoothing auto factor for roll, pitch and yaw setpoint
    rc_smoothing_throttle_hz: null,
    // RC Smoothing manual cutoff for throttle
    rc_smoothing_auto_factor_throttle: null,
    // RC Smoothing cutoff for throttle
    rc_smoothing_active_cutoffs_ff_sp_thr: [null, null, null],
    // RC Smoothing active cutoffs feedforward, setpoint, throttle
    rc_smoothing_rx_smoothed: null,
    dyn_notch_count: null,
    // Number of dynamic notches 4.3
    rpm_filter_fade_range_hz: null,
    // Fade range for RPM notch filters in Hz
    dyn_idle_p_gain: null,
    dyn_idle_i_gain: null,
    dyn_idle_d_gain: null,
    dyn_idle_start_increase: null,
    dyn_idle_max_increase: null,
    simplified_pids_mode: null,
    // Simplified / slider PIDS
    simplified_pi_gain: null,
    simplified_i_gain: null,
    simplified_d_gain: null,
    simplified_d_max_gain: null,
    simplified_feedforward_gain: null,
    simplified_pitch_d_gain: null,
    simplified_pitch_pi_gain: null,
    simplified_master_multiplier: null,
    simplified_dterm_filter: null,
    simplified_dterm_filter_multiplier: null,
    simplified_gyro_filter: null,
    simplified_gyro_filter_multiplier: null,
    motor_output_limit: null,
    // motor output limit
    throttle_limit_type: null,
    // throttle limit
    throttle_limit_percent: null,
    throttle_boost: null,
    // throttle boost
    throttle_boost_cutoff: null,
    thrust_linear: null,
    tpa_low_rate: null,
    tpa_low_breakpoint: null,
    tpa_low_always: null,
    mixer_type: null,
    chirp_lag_freq_hz: null,
    chirp_lead_freq_hz: null,
    chirp_amplitude_roll: null,
    chirp_amplitude_pitch: null,
    chirp_amplitude_yaw: null,
    chirp_frequency_start_deci_hz: null,
    chirp_frequency_end_deci_hz: null,
    chirp_time_seconds: null,
    unknownHeaders: []
    // Unknown Extra Headers
  }, translationValues = {
    acc_limit_yaw: "yawRateAccelLimit",
    accel_limit: "rateAccelLimit",
    acc_limit: "rateAccelLimit",
    anti_gravity_thresh: "anti_gravity_threshold",
    currentSensor: "currentMeter",
    d_notch_cut: "dterm_notch_cutoff",
    d_setpoint_weight: "dtermSetpointWeight",
    dterm_lowpass_hz: "dterm_lpf_hz",
    dterm_lowpass_dyn_hz: "dterm_lpf_dyn_hz",
    dterm_lowpass2_hz: "dterm_lpf2_hz",
    dterm_lpf1_type: "dterm_filter_type",
    dterm_lpf1_static_hz: "dterm_lpf_hz",
    dterm_lpf1_dyn_hz: "dterm_lpf_dyn_hz",
    dterm_lpf1_dyn_expo: "dterm_lpf_dyn_expo",
    dterm_lpf2_type: "dterm_filter2_type",
    dterm_lpf2_static_hz: "dterm_lpf2_hz",
    dterm_setpoint_weight: "dtermSetpointWeight",
    digital_idle_value: "digitalIdleOffset",
    simplified_dmax_gain: "simplified_d_max_gain",
    d_max: "d_min",
    dshot_idle_value: "digitalIdleOffset",
    dyn_idle_min_rpm: "dynamic_idle_min_rpm",
    feedforward_transition: "ff_transition",
    feedforward_averaging: "ff_averaging",
    feedforward_smooth_factor: "ff_smooth_factor",
    feedforward_jitter_factor: "ff_jitter_factor",
    feedforward_boost: "ff_boost",
    feedforward_max_rate_limit: "ff_max_rate_limit",
    feedforward_weight: "dtermSetpointWeight",
    gyro_hardware_lpf: "gyro_lpf",
    gyro_lowpass: "gyro_lowpass_hz",
    gyro_lowpass_type: "gyro_soft_type",
    gyro_lowpass2_type: "gyro_soft2_type",
    gyro_lpf1_type: "gyro_soft_type",
    gyro_lpf1_static_hz: "gyro_lowpass_hz",
    gyro_lpf1_dyn_hz: "gyro_lowpass_dyn_hz",
    gyro_lpf1_dyn_expo: "gyro_lowpass_dyn_expo",
    gyro_lpf2_type: "gyro_soft2_type",
    gyro_lpf2_static_hz: "gyro_lowpass2_hz",
    "gyro.scale": "gyro_scale",
    iterm_windup: "itermWindupPointPercent",
    motor_pwm_protocol: "fast_pwm_protocol",
    pid_at_min_throttle: "pidAtMinThrottle",
    pidsum_limit: "pidSumLimit",
    pidsum_limit_yaw: "pidSumLimitYaw",
    rc_expo_yaw: "rcYawExpo",
    rc_interp: "rc_interpolation",
    rc_interp_int: "rc_interpolation_interval",
    rc_rate: "rc_rates",
    rc_rate_yaw: "rcYawRate",
    rc_smoothing: "rc_smoothing_mode",
    rc_smoothing_auto_factor: "rc_smoothing_auto_factor_setpoint",
    rc_smoothing_feedforward_cutoff: "rc_smoothing_feedforward_hz",
    rc_smoothing_setpoint_cutoff: "rc_smoothing_setpoint_hz",
    rc_smoothing_throttle_cutoff: "rc_smoothing_throttle_hz",
    rc_smoothing_type: "rc_smoothing_mode",
    rc_yaw_expo: "rcYawExpo",
    rcExpo: "rc_expo",
    rcRate: "rc_rates",
    rpm_filter_harmonics: "gyro_rpm_notch_harmonics",
    rpm_filter_q: "gyro_rpm_notch_q",
    rpm_filter_min_hz: "gyro_rpm_notch_min",
    rpm_filter_lpf_hz: "rpm_notch_lpf",
    setpoint_relax_ratio: "setpointRelaxRatio",
    setpoint_relaxation_ratio: "setpointRelaxRatio",
    thr_expo: "thrExpo",
    thr_mid: "thrMid",
    dynThrPID: "tpa_rate",
    use_unsynced_pwm: "unsynced_fast_pwm",
    vbat_scale: "vbatscale",
    vbat_pid_gain: "vbat_pid_compensation",
    yaw_accel_limit: "yawRateAccelLimit",
    yaw_lowpass_hz: "yaw_lpf_hz",
    thrust_linear: "thrust_linear",
    tpa_low_rate: "tpa_low_rate",
    tpa_low_breakpoint: "tpa_low_breakpoint",
    tpa_low_always: "tpa_low_always",
    mixer_type: "mixer_type",
    chirp_lag_freq_hz: "chirp_lag_freq_hz",
    chirp_lead_freq_hz: "chirp_lead_freq_hz",
    chirp_amplitude_roll: "chirp_amplitude_roll",
    chirp_amplitude_pitch: "chirp_amplitude_pitch",
    chirp_amplitude_yaw: "chirp_amplitude_yaw",
    chirp_frequency_start_deci_hz: "chirp_frequency_start_deci_hz",
    chirp_frequency_end_deci_hz: "chirp_frequency_end_deci_hz",
    chirp_time_seconds: "chirp_time_seconds",
    // MULTI_GYRO to DUAL_GYRO debug mode aliases
    multi_gyro: "dual_gyro",
    multi_gyro_raw: "dual_gyro_raw",
    multi_gyro_combined: "dual_gyro_combined",
    multi_gyro_diff: "dual_gyro_diff",
    multi_gyro_scaled: "dual_gyro_scaled"
  }, frameTypes, mainHistoryRing, mainHistory = [null, null, null], mainStreamIsValid = false, gpsHomeHistory = new Array(2), gpsHomeIsValid = false, lastEvent, lastGPS, lastSlow, lastSkippedFrames, lastMainFrameIteration, lastMainFrameTime, stream;
  this.frameDefs = {};
  let completeSysConfig = $.extend(
    {},
    defaultSysConfig,
    defaultSysConfigExtension
  );
  this.sysConfig = Object.create(completeSysConfig);
  this.onFrameReady = null;
  function mapFieldNamesToIndex(fieldNames) {
    let result = {};
    for (let i = 0; i < fieldNames.length; i++) {
      result[fieldNames[i]] = i;
    }
    return result;
  }
  function translateLegacyFieldNames(names) {
    for (let i = 0; i < names.length; i++) {
      var matches;
      if (matches = names[i].match(/^gyroData(.+)$/)) {
        names[i] = `gyroADC${matches[1]}`;
      }
    }
    return names;
  }
  function translateFieldName(fieldName) {
    let translation = translationValues[fieldName];
    if (translation !== void 0) {
      return translation;
    } else {
      return fieldName;
    }
  }
  function parseHeaderLine() {
    var COLON = ":".charCodeAt(0), fieldName, fieldValue, lineStart, lineEnd, separatorPos = false, matches, i, c;
    if (stream.peekChar() != " ") return;
    stream.readChar();
    lineStart = stream.pos;
    for (; stream.pos < lineStart + 1024 && stream.pos < stream.end; stream.pos++) {
      if (separatorPos === false && stream.data[stream.pos] == COLON)
        separatorPos = stream.pos;
      if (stream.data[stream.pos] == NEWLINE || stream.data[stream.pos] === 0)
        break;
    }
    if (stream.data[stream.pos] != NEWLINE || separatorPos === false) return;
    lineEnd = stream.pos;
    fieldName = asciiArrayToString(
      stream.data.subarray(lineStart, separatorPos)
    );
    fieldValue = asciiArrayToString(
      stream.data.subarray(separatorPos + 1, lineEnd)
    );
    fieldName = translateFieldName(fieldName);
    switch (fieldName) {
      case "I interval":
        that.sysConfig.frameIntervalI = parseInt(fieldValue, 10);
        if (that.sysConfig.frameIntervalI < 1)
          that.sysConfig.frameIntervalI = 1;
        break;
      case "P interval":
        matches = fieldValue.match(/(\d+)\/(\d+)/);
        if (matches) {
          that.sysConfig.frameIntervalPNum = parseInt(matches[1], 10);
          that.sysConfig.frameIntervalPDenom = parseInt(matches[2], 10);
        } else {
          that.sysConfig.frameIntervalPNum = 1;
          that.sysConfig.frameIntervalPDenom = parseInt(fieldValue, 10);
        }
        break;
      case "P denom":
      case "P ratio":
        break;
      case "Data version":
        dataVersion = parseInt(fieldValue, 10);
        break;
      case "Firmware type":
        switch (fieldValue) {
          case "Cleanflight":
            that.sysConfig.firmwareType = FIRMWARE_TYPE_CLEANFLIGHT;
            $("html").removeClass("isBaseF");
            $("html").addClass("isCF");
            $("html").removeClass("isBF");
            $("html").removeClass("isINAV");
            break;
          default:
            that.sysConfig.firmwareType = FIRMWARE_TYPE_BASEFLIGHT;
            $("html").addClass("isBaseF");
            $("html").removeClass("isCF");
            $("html").removeClass("isBF");
            $("html").removeClass("isINAV");
        }
        break;
      case "minthrottle":
        that.sysConfig[fieldName] = parseInt(fieldValue, 10);
        that.sysConfig.motorOutput[0] = that.sysConfig[fieldName];
        break;
      case "maxthrottle":
        that.sysConfig[fieldName] = parseInt(fieldValue, 10);
        that.sysConfig.motorOutput[1] = that.sysConfig[fieldName];
        break;
      case "rcRate":
      case "thrMid":
      case "thrExpo":
      case "tpa_rate":
      case "tpa_mode":
      case "tpa_breakpoint":
      case "airmode_activate_throttle":
      case "serialrx_provider":
      case "looptime":
      case "gyro_sync_denom":
      case "pid_process_denom":
      case "pidController":
      case "yaw_p_limit":
      case "dterm_average_count":
      case "rollPitchItermResetRate":
      case "yawItermResetRate":
      case "rollPitchItermIgnoreRate":
      case "yawItermIgnoreRate":
      case "dterm_differentiator":
      case "deltaMethod":
      case "dynamic_dterm_threshold":
      case "dynamic_pterm":
      case "iterm_reset_offset":
      case "deadband":
      case "yaw_deadband":
      case "gyro_lpf":
      case "gyro_hardware_lpf":
      case "gyro_32khz_hardware_lpf":
      case "acc_lpf_hz":
      case "acc_hardware":
      case "baro_hardware":
      case "mag_hardware":
      case "gyro_cal_on_first_arm":
      case "vbat_pid_compensation":
      case "rc_smoothing":
      case "rc_smoothing_type":
      case "rc_smoothing_debug_axis":
      case "rc_smoothing_rx_average":
      case "rc_smoothing_rx_smoothed":
      case "rc_smoothing_mode":
      case "rc_smoothing_auto_factor_setpoint":
      case "rc_smoothing_auto_factor_throttle":
      case "rc_smoothing_feedforward_hz":
      case "rc_smoothing_setpoint_hz":
      case "rc_smoothing_feedforward_hz":
      case "rc_smoothing_throttle_hz":
      case "superExpoYawMode":
      case "features":
      case "dynamic_pid":
      case "rc_interpolation":
      case "rc_interpolation_channels":
      case "rc_interpolation_interval":
      case "unsynced_fast_pwm":
      case "fast_pwm_protocol":
      case "motor_pwm_rate":
      case "vbatscale":
      case "vbatref":
      case "acc_1G":
      case "dterm_filter_type":
      case "dterm_filter2_type":
      case "pidAtMinThrottle":
      case "pidSumLimit":
      case "pidSumLimitYaw":
      case "anti_gravity_threshold":
      case "itermWindupPointPercent":
      case "ptermSRateWeight":
      case "setpointRelaxRatio":
      case "ff_transition":
      case "ff_averaging":
      case "ff_smooth_factor":
      case "ff_jitter_factor":
      case "ff_boost":
      case "ff_max_rate_limit":
      case "dtermSetpointWeight":
      case "gyro_soft_type":
      case "gyro_soft2_type":
      case "debug_mode":
      case "anti_gravity_mode":
      case "anti_gravity_gain":
      case "anti_gravity_p_gain":
      case "anti_gravity_cutoff_hz":
      case "abs_control_gain":
      case "use_integrated_yaw":
      case "d_max_gain":
      case "d_max_advance":
      case "dshot_bidir":
      case "gyro_rpm_notch_harmonics":
      case "gyro_rpm_notch_q":
      case "gyro_rpm_notch_min":
      case "rpm_filter_fade_range_hz":
      case "rpm_notch_lpf":
      case "dterm_rpm_notch_harmonics":
      case "dterm_rpm_notch_q":
      case "dterm_rpm_notch_min":
      case "iterm_relax":
      case "iterm_relax_type":
      case "iterm_relax_cutoff":
      case "dyn_notch_range":
      case "dyn_notch_width_percent":
      case "dyn_notch_q":
      case "dyn_notch_count":
      case "dyn_notch_min_hz":
      case "dyn_notch_max_hz":
      case "rates_type":
      case "vbat_sag_compensation":
      case "fields_disabled_mask":
      case "motor_pwm_protocol":
      case "gyro_to_use":
      case "gyro_enabled_bitmask":
      case "dynamic_idle_min_rpm":
      case "dyn_idle_p_gain":
      case "dyn_idle_i_gain":
      case "dyn_idle_d_gain":
      case "dyn_idle_start_increase":
      case "dyn_idle_max_increase":
      case "simplified_pids_mode":
      case "simplified_pi_gain":
      case "simplified_i_gain":
      case "simplified_d_gain":
      case "simplified_dmax_gain":
      case "simplified_d_max_gain":
      case "simplified_feedforward_gain":
      case "simplified_pitch_d_gain":
      case "simplified_pitch_pi_gain":
      case "simplified_master_multiplier":
      case "simplified_dterm_filter":
      case "simplified_dterm_filter_multiplier":
      case "simplified_gyro_filter":
      case "simplified_gyro_filter_multiplier":
      case "motor_output_limit":
      case "throttle_limit_type":
      case "throttle_limit_percent":
      case "throttle_boost":
      case "throttle_boost_cutoff":
      case "motor_poles":
      case "blackbox_high_resolution":
        that.sysConfig[fieldName] = parseInt(fieldValue, 10);
        break;
      case "rc_expo":
      case "rc_rates":
        if (stringHasComma(fieldValue)) {
          that.sysConfig[fieldName] = parseCommaSeparatedString(fieldValue);
        } else {
          that.sysConfig[fieldName][0] = parseInt(fieldValue, 10);
          that.sysConfig[fieldName][1] = parseInt(fieldValue, 10);
        }
        break;
      case "rcYawExpo":
        that.sysConfig["rc_expo"][2] = parseInt(fieldValue, 10);
        break;
      case "rcYawRate":
        that.sysConfig["rc_rates"][2] = parseInt(fieldValue, 10);
        break;
      case "yawRateAccelLimit":
      case "rateAccelLimit":
        if (that.sysConfig.firmwareType == FIRMWARE_TYPE_BETAFLIGHT && semver.gte(that.sysConfig.firmwareVersion, "3.1.0") || that.sysConfig.firmwareType == FIRMWARE_TYPE_CLEANFLIGHT && semver.gte(that.sysConfig.firmwareVersion, "2.0.0")) {
          that.sysConfig[fieldName] = parseInt(fieldValue, 10) / 1e3;
        } else {
          that.sysConfig[fieldName] = parseInt(fieldValue, 10);
        }
        break;
      case "yaw_lpf_hz":
      case "gyro_lowpass_hz":
      case "gyro_lowpass2_hz":
      case "dterm_notch_hz":
      case "dterm_notch_cutoff":
      case "dterm_lpf_hz":
      case "dterm_lpf2_hz":
        if (that.sysConfig.firmwareType == FIRMWARE_TYPE_BETAFLIGHT && semver.gte(that.sysConfig.firmwareVersion, "3.0.1") || that.sysConfig.firmwareType == FIRMWARE_TYPE_CLEANFLIGHT && semver.gte(that.sysConfig.firmwareVersion, "2.0.0")) {
          that.sysConfig[fieldName] = parseInt(fieldValue, 10);
        } else {
          that.sysConfig[fieldName] = parseInt(fieldValue, 10) / 100;
        }
        break;
      case "gyro_notch_hz":
      case "gyro_notch_cutoff":
        if (that.sysConfig.firmwareType == FIRMWARE_TYPE_BETAFLIGHT && semver.gte(that.sysConfig.firmwareVersion, "3.0.1") || that.sysConfig.firmwareType == FIRMWARE_TYPE_CLEANFLIGHT && semver.gte(that.sysConfig.firmwareVersion, "2.0.0")) {
          that.sysConfig[fieldName] = parseCommaSeparatedString(fieldValue);
        } else {
          that.sysConfig[fieldName] = parseInt(fieldValue, 10) / 100;
        }
        break;
      case "motor_idle":
      case "digitalIdleOffset":
        that.sysConfig[fieldName] = parseInt(fieldValue, 10) / 100;
      case "dterm_cut_hz":
      case "acc_cut_hz":
        that.sysConfig[fieldName] = parseInt(fieldValue, 10);
        break;
      case "superExpoFactor":
        if (stringHasComma(fieldValue)) {
          let expoParams = parseCommaSeparatedString(fieldValue);
          that.sysConfig.superExpoFactor = expoParams[0];
          that.sysConfig.superExpoFactorYaw = expoParams[1];
        } else {
          that.sysConfig.superExpoFactor = parseInt(fieldValue, 10);
        }
        break;
      case "rates":
      case "rate_limits":
      case "rollPID":
      case "pitchPID":
      case "yawPID":
      case "altPID":
      case "posPID":
      case "posrPID":
      case "navrPID":
      case "levelPID":
      case "velPID":
      case "motorOutput":
      case "rate_limits":
      case "rc_smoothing_cutoffs":
      case "rc_smoothing_active_cutoffs":
      case "rc_smoothing_active_cutoffs_ff_sp_thr":
      case "gyro_lowpass_dyn_hz":
      case "gyro_lowpass_dyn_expo":
      case "dterm_lpf_dyn_expo":
      case "thrust_linear":
      case "tpa_low_rate":
      case "tpa_low_breakpoint":
      case "tpa_low_always":
      case "mixer_type":
      case "chirp_lag_freq_hz":
      case "chirp_lead_freq_hz":
      case "chirp_amplitude_roll":
      case "chirp_amplitude_pitch":
      case "chirp_amplitude_yaw":
      case "chirp_frequency_start_deci_hz":
      case "chirp_frequency_end_deci_hz":
      case "chirp_time_seconds":
      case "dterm_lpf_dyn_hz":
        that.sysConfig[fieldName] = parseCommaSeparatedString(fieldValue);
        break;
      case "magPID":
        that.sysConfig.magPID = parseCommaSeparatedString(fieldValue, 3);
        break;
      case "d_min":
      case "d_max":
        var dMaxValues = parseCommaSeparatedString(fieldValue);
        that.sysConfig["rollPID"].push(dMaxValues[0]);
        that.sysConfig["pitchPID"].push(dMaxValues[1]);
        that.sysConfig["yawPID"].push(dMaxValues[2]);
        break;
      case "ff_weight":
        var ffValues = parseCommaSeparatedString(fieldValue);
        that.sysConfig["rollPID"].push(ffValues[0]);
        that.sysConfig["pitchPID"].push(ffValues[1]);
        that.sysConfig["yawPID"].push(ffValues[2]);
        break;
      case "vbatcellvoltage":
        var vbatcellvoltageParams = parseCommaSeparatedString(fieldValue);
        that.sysConfig.vbatmincellvoltage = vbatcellvoltageParams[0];
        that.sysConfig.vbatwarningcellvoltage = vbatcellvoltageParams[1];
        that.sysConfig.vbatmaxcellvoltage = vbatcellvoltageParams[2];
        break;
      case "currentMeter":
      case "currentSensor":
        var currentMeterParams = parseCommaSeparatedString(fieldValue);
        that.sysConfig.currentMeterOffset = currentMeterParams[0];
        that.sysConfig.currentMeterScale = currentMeterParams[1];
        break;
      case "gyro.scale":
      case "gyro_scale":
        that.sysConfig.gyroScale = hexToFloat(fieldValue);
        if (that.sysConfig.firmwareType == FIRMWARE_TYPE_INAV || that.sysConfig.firmwareType == FIRMWARE_TYPE_CLEANFLIGHT || that.sysConfig.firmwareType == FIRMWARE_TYPE_BETAFLIGHT) {
          that.sysConfig.gyroScale = that.sysConfig.gyroScale * (Math.PI / 180) * 1e-6;
        }
        break;
      case "Firmware revision":
        var matches = fieldValue.match(/(.*flight).* (\d+)\.(\d+)(\.(\d+))*/i);
        if (matches != null) {
          if (matches[1] === "Betaflight") {
            that.sysConfig.firmwareType = FIRMWARE_TYPE_BETAFLIGHT;
            $("html").removeClass("isBaseF");
            $("html").removeClass("isCF");
            $("html").addClass("isBF");
            $("html").removeClass("isINAV");
          }
          that.sysConfig.firmware = `${parseInt(matches[2])}.${parseInt(matches[3])}`;
          that.sysConfig.firmwarePatch = matches[5] != null ? parseInt(matches[5]) : "0";
          that.sysConfig.firmwareVersion = `${that.sysConfig.firmware}.${that.sysConfig.firmwarePatch}`;
        } else {
          var matches = fieldValue.match(/(INAV).* (\d+)\.(\d+).(\d+)*/i);
          if (matches != null) {
            that.sysConfig.firmwareType = FIRMWARE_TYPE_INAV;
            that.sysConfig.firmware = parseFloat(`${matches[2]}.${matches[3]}`);
            that.sysConfig.firmwarePatch = matches[5] != null ? parseInt(matches[5]) : "";
            $("html").removeClass("isBaseF");
            $("html").removeClass("isCF");
            $("html").removeClass("isBF");
            $("html").addClass("isINAV");
          } else {
            that.sysConfig.firmwareVersion = "0.0.0";
            that.sysConfig.firmware = 0;
            that.sysConfig.firmwarePatch = 0;
          }
        }
        that.sysConfig[fieldName] = fieldValue;
        break;
      case "Product":
      case "Blackbox version":
      case "Firmware date":
      case "Board information":
      case "Craft name":
      case "Log start datetime":
        that.sysConfig[fieldName] = fieldValue;
        break;
      case "DeviceUID":
        that.sysConfig.deviceUID = fieldValue;
        break;
      default:
        if (matches = fieldName.match(/^Field (.) (.+)$/)) {
          let frameName = matches[1], frameInfo = matches[2], frameDef;
          if (!that.frameDefs[frameName]) {
            that.frameDefs[frameName] = {
              name: [],
              nameToIndex: {},
              count: 0,
              signed: [],
              predictor: [],
              encoding: []
            };
          }
          frameDef = that.frameDefs[frameName];
          switch (frameInfo) {
            case "predictor":
              frameDef.predictor = parseCommaSeparatedString(fieldValue);
              break;
            case "encoding":
              frameDef.encoding = parseCommaSeparatedString(fieldValue);
              break;
            case "name":
              frameDef.name = translateLegacyFieldNames(fieldValue.split(","));
              frameDef.count = frameDef.name.length;
              frameDef.nameToIndex = mapFieldNamesToIndex(frameDef.name);
              frameDef.signed.length = frameDef.count;
              break;
            case "signed":
              frameDef.signed = parseCommaSeparatedString(fieldValue);
              break;
            default:
              console.log(`Saw unsupported field header "${fieldName}"`);
          }
        } else {
          console.log(`Ignoring unsupported header ${fieldName} ${fieldValue}`);
          if (that.sysConfig.unknownHeaders === null) {
            that.sysConfig.unknownHeaders = new Array();
          }
          that.sysConfig.unknownHeaders.push({
            name: fieldName,
            value: fieldValue
          });
        }
        break;
    }
  }
  function invalidateMainStream() {
    mainStreamIsValid = false;
    mainHistory[0] = mainHistoryRing ? mainHistoryRing[0] : null;
    mainHistory[1] = null;
    mainHistory[2] = null;
  }
  function updateFieldStatistics(frameType, frame) {
    let i, fieldStats;
    fieldStats = that.stats.frame[frameType].field;
    for (i = 0; i < frame.length; i++) {
      if (!fieldStats[i]) {
        fieldStats[i] = {
          max: frame[i],
          min: frame[i]
        };
      } else {
        fieldStats[i].max = Math.max(frame[i], fieldStats[i].max);
        fieldStats[i].min = Math.min(frame[i], fieldStats[i].min);
      }
    }
  }
  function completeIntraframe(frameType, frameStart, frameEnd, raw) {
    let acceptFrame = true;
    if (!raw && lastMainFrameIteration != -1) {
      acceptFrame = mainHistory[0][FlightLogParser.prototype.FLIGHT_LOG_FIELD_INDEX_ITERATION] >= lastMainFrameIteration && mainHistory[0][FlightLogParser.prototype.FLIGHT_LOG_FIELD_INDEX_ITERATION] < lastMainFrameIteration + MAXIMUM_ITERATION_JUMP_BETWEEN_FRAMES && mainHistory[0][FlightLogParser.prototype.FLIGHT_LOG_FIELD_INDEX_TIME] >= lastMainFrameTime && mainHistory[0][FlightLogParser.prototype.FLIGHT_LOG_FIELD_INDEX_TIME] < lastMainFrameTime + MAXIMUM_TIME_JUMP_BETWEEN_FRAMES;
    }
    if (acceptFrame) {
      that.stats.intentionallyAbsentIterations += countIntentionallySkippedFramesTo(
        mainHistory[0][FlightLogParser.prototype.FLIGHT_LOG_FIELD_INDEX_ITERATION]
      );
      lastMainFrameIteration = mainHistory[0][FlightLogParser.prototype.FLIGHT_LOG_FIELD_INDEX_ITERATION];
      lastMainFrameTime = mainHistory[0][FlightLogParser.prototype.FLIGHT_LOG_FIELD_INDEX_TIME];
      mainStreamIsValid = true;
      updateFieldStatistics(frameType, mainHistory[0]);
    } else {
      invalidateMainStream();
    }
    if (that.onFrameReady)
      that.onFrameReady(
        mainStreamIsValid,
        mainHistory[0],
        frameType,
        frameStart,
        frameEnd - frameStart
      );
    mainHistory[1] = mainHistory[0];
    mainHistory[2] = mainHistory[0];
    if (mainHistory[0] == mainHistoryRing[0])
      mainHistory[0] = mainHistoryRing[1];
    else if (mainHistory[0] == mainHistoryRing[1])
      mainHistory[0] = mainHistoryRing[2];
    else mainHistory[0] = mainHistoryRing[0];
    return mainStreamIsValid;
  }
  function shouldHaveFrame(frameIndex) {
    return (frameIndex % that.sysConfig.frameIntervalI + that.sysConfig.frameIntervalPNum - 1) % that.sysConfig.frameIntervalPDenom < that.sysConfig.frameIntervalPNum;
  }
  function parseFrame(frameDef, current, previous, previous2, skippedFrames, raw) {
    let predictor = frameDef.predictor, encoding = frameDef.encoding, values = new Array(8), i, j, groupCount;
    i = 0;
    while (i < frameDef.count) {
      var value;
      if (predictor[i] == FLIGHT_LOG_FIELD_PREDICTOR_INC) {
        current[i] = skippedFrames + 1;
        if (previous) current[i] += previous[i];
        i++;
      } else {
        switch (encoding[i]) {
          case FLIGHT_LOG_FIELD_ENCODING_SIGNED_VB:
            value = stream.readSignedVB();
            break;
          case FLIGHT_LOG_FIELD_ENCODING_UNSIGNED_VB:
            value = stream.readUnsignedVB();
            break;
          case FLIGHT_LOG_FIELD_ENCODING_NEG_14BIT:
            value = -signExtend14Bit(stream.readUnsignedVB());
            break;
          case FLIGHT_LOG_FIELD_ENCODING_TAG8_4S16:
            if (dataVersion < 2) stream.readTag8_4S16_v1(values);
            else stream.readTag8_4S16_v2(values);
            for (j = 0; j < 4; j++, i++)
              current[i] = applyPrediction(
                i,
                raw ? FLIGHT_LOG_FIELD_PREDICTOR_0 : predictor[i],
                values[j],
                current,
                previous,
                previous2
              );
            continue;
            break;
          case FLIGHT_LOG_FIELD_ENCODING_TAG2_3S32:
            stream.readTag2_3S32(values);
            for (j = 0; j < 3; j++, i++)
              current[i] = applyPrediction(
                i,
                raw ? FLIGHT_LOG_FIELD_PREDICTOR_0 : predictor[i],
                values[j],
                current,
                previous,
                previous2
              );
            continue;
            break;
          case FLIGHT_LOG_FIELD_ENCODING_TAG2_3SVARIABLE:
            stream.readTag2_3SVariable(values);
            for (j = 0; j < 3; j++, i++)
              current[i] = applyPrediction(
                i,
                raw ? FLIGHT_LOG_FIELD_PREDICTOR_0 : predictor[i],
                values[j],
                current,
                previous,
                previous2
              );
            continue;
            break;
          case FLIGHT_LOG_FIELD_ENCODING_TAG8_8SVB:
            for (j = i + 1; j < i + 8 && j < frameDef.count; j++)
              if (encoding[j] != FLIGHT_LOG_FIELD_ENCODING_TAG8_8SVB) break;
            groupCount = j - i;
            stream.readTag8_8SVB(values, groupCount);
            for (j = 0; j < groupCount; j++, i++)
              current[i] = applyPrediction(
                i,
                raw ? FLIGHT_LOG_FIELD_PREDICTOR_0 : predictor[i],
                values[j],
                current,
                previous,
                previous2
              );
            continue;
            break;
          case FLIGHT_LOG_FIELD_ENCODING_NULL:
            value = 0;
            break;
          default:
            if (encoding[i] === void 0)
              throw `Missing field encoding header for field #${i} '${frameDef.name[i]}'`;
            else throw `Unsupported field encoding ${encoding[i]}`;
        }
        current[i] = applyPrediction(
          i,
          raw ? FLIGHT_LOG_FIELD_PREDICTOR_0 : predictor[i],
          value,
          current,
          previous,
          previous2
        );
        i++;
      }
    }
  }
  function parseIntraframe(raw) {
    let current = mainHistory[0], previous = mainHistory[1];
    parseFrame(that.frameDefs.I, current, previous, null, 0, raw);
  }
  function completeGPSHomeFrame(frameType, frameStart, frameEnd, raw) {
    updateFieldStatistics(frameType, gpsHomeHistory[0]);
    that.setGPSHomeHistory(gpsHomeHistory[0]);
    if (that.onFrameReady) {
      that.onFrameReady(
        true,
        gpsHomeHistory[0],
        frameType,
        frameStart,
        frameEnd - frameStart
      );
    }
    return true;
  }
  function completeGPSFrame(frameType, frameStart, frameEnd, raw) {
    if (gpsHomeIsValid) {
      updateFieldStatistics(frameType, lastGPS);
    }
    if (that.onFrameReady) {
      that.onFrameReady(
        gpsHomeIsValid,
        lastGPS,
        frameType,
        frameStart,
        frameEnd - frameStart
      );
    }
    return gpsHomeIsValid;
  }
  function completeSlowFrame(frameType, frameStart, frameEnd, raw) {
    updateFieldStatistics(frameType, lastSlow);
    if (that.onFrameReady) {
      that.onFrameReady(
        true,
        lastSlow,
        frameType,
        frameStart,
        frameEnd - frameStart
      );
    }
    return true;
  }
  function completeInterframe(frameType, frameStart, frameEnd, raw) {
    if (mainStreamIsValid && !raw && (mainHistory[0][FlightLogParser.prototype.FLIGHT_LOG_FIELD_INDEX_TIME] > lastMainFrameTime + MAXIMUM_TIME_JUMP_BETWEEN_FRAMES || mainHistory[0][FlightLogParser.prototype.FLIGHT_LOG_FIELD_INDEX_ITERATION] > lastMainFrameIteration + MAXIMUM_ITERATION_JUMP_BETWEEN_FRAMES)) {
      mainStreamIsValid = false;
    }
    if (mainStreamIsValid) {
      lastMainFrameIteration = mainHistory[0][FlightLogParser.prototype.FLIGHT_LOG_FIELD_INDEX_ITERATION];
      lastMainFrameTime = mainHistory[0][FlightLogParser.prototype.FLIGHT_LOG_FIELD_INDEX_TIME];
      that.stats.intentionallyAbsentIterations += lastSkippedFrames;
      updateFieldStatistics(frameType, mainHistory[0]);
    }
    if (that.onFrameReady)
      that.onFrameReady(
        mainStreamIsValid,
        mainHistory[0],
        frameType,
        frameStart,
        frameEnd - frameStart
      );
    if (mainStreamIsValid) {
      mainHistory[2] = mainHistory[1];
      mainHistory[1] = mainHistory[0];
      if (mainHistory[0] == mainHistoryRing[0])
        mainHistory[0] = mainHistoryRing[1];
      else if (mainHistory[0] == mainHistoryRing[1])
        mainHistory[0] = mainHistoryRing[2];
      else mainHistory[0] = mainHistoryRing[0];
    }
    return mainStreamIsValid;
  }
  function applyPrediction(fieldIndex, predictor, value, current, previous, previous2) {
    switch (predictor) {
      case FLIGHT_LOG_FIELD_PREDICTOR_0:
        break;
      case FLIGHT_LOG_FIELD_PREDICTOR_MINTHROTTLE:
        value = Math.trunc(value) + that.sysConfig.minthrottle;
        break;
      case FLIGHT_LOG_FIELD_PREDICTOR_MINMOTOR:
        value = Math.trunc(value) + Math.trunc(that.sysConfig.motorOutput[0]);
        break;
      case FLIGHT_LOG_FIELD_PREDICTOR_1500:
        value += 1500;
        break;
      case FLIGHT_LOG_FIELD_PREDICTOR_MOTOR_0:
        if (that.frameDefs.I.nameToIndex["motor[0]"] < 0) {
          throw "Attempted to base I-field prediction on motor0 before it was read";
        }
        value += current[that.frameDefs.I.nameToIndex["motor[0]"]];
        break;
      case FLIGHT_LOG_FIELD_PREDICTOR_VBATREF:
        value += that.sysConfig.vbatref;
        break;
      case FLIGHT_LOG_FIELD_PREDICTOR_PREVIOUS:
        if (!previous) break;
        value += previous[fieldIndex];
        break;
      case FLIGHT_LOG_FIELD_PREDICTOR_STRAIGHT_LINE:
        if (!previous) break;
        value += 2 * previous[fieldIndex] - previous2[fieldIndex];
        break;
      case FLIGHT_LOG_FIELD_PREDICTOR_AVERAGE_2:
        if (!previous) break;
        value += ~~((previous[fieldIndex] + previous2[fieldIndex]) / 2);
        break;
      case FLIGHT_LOG_FIELD_PREDICTOR_HOME_COORD:
        if (!that.frameDefs.H || that.frameDefs.H.nameToIndex["GPS_home[0]"] === void 0) {
          throw "Attempted to base prediction on GPS home position without GPS home frame definition";
        }
        value += gpsHomeHistory[1][that.frameDefs.H.nameToIndex["GPS_home[0]"]];
        break;
      case FLIGHT_LOG_FIELD_PREDICTOR_HOME_COORD_1:
        if (!that.frameDefs.H || that.frameDefs.H.nameToIndex["GPS_home[1]"] === void 0) {
          throw "Attempted to base prediction on GPS home position without GPS home frame definition";
        }
        value += gpsHomeHistory[1][that.frameDefs.H.nameToIndex["GPS_home[1]"]];
        break;
      case FLIGHT_LOG_FIELD_PREDICTOR_LAST_MAIN_FRAME_TIME:
        if (mainHistory[1])
          value += mainHistory[1][FlightLogParser.prototype.FLIGHT_LOG_FIELD_INDEX_TIME];
        break;
      default:
        throw `Unsupported field predictor ${predictor}`;
    }
    return value;
  }
  function countIntentionallySkippedFrames() {
    let count = 0, frameIndex;
    if (lastMainFrameIteration == -1) {
      return 0;
    } else {
      for (frameIndex = lastMainFrameIteration + 1; !shouldHaveFrame(frameIndex); frameIndex++) {
        count++;
      }
    }
    return count;
  }
  function countIntentionallySkippedFramesTo(targetIteration) {
    let count = 0, frameIndex;
    if (lastMainFrameIteration == -1) {
      return 0;
    } else {
      for (frameIndex = lastMainFrameIteration + 1; frameIndex < targetIteration; frameIndex++) {
        if (!shouldHaveFrame(frameIndex)) {
          count++;
        }
      }
    }
    return count;
  }
  function parseInterframe(raw) {
    let current = mainHistory[0], previous = mainHistory[1], previous2 = mainHistory[2];
    lastSkippedFrames = countIntentionallySkippedFrames();
    parseFrame(
      that.frameDefs.P,
      current,
      previous,
      previous2,
      lastSkippedFrames,
      raw
    );
  }
  function parseGPSFrame(raw) {
    if (that.frameDefs.G) {
      parseFrame(that.frameDefs.G, lastGPS, null, null, 0, raw);
    }
  }
  function parseGPSHomeFrame(raw) {
    if (that.frameDefs.H) {
      parseFrame(that.frameDefs.H, gpsHomeHistory[0], null, null, 0, raw);
    }
  }
  function parseSlowFrame(raw) {
    if (that.frameDefs.S) {
      parseFrame(that.frameDefs.S, lastSlow, null, null, 0, raw);
    }
  }
  function completeEventFrame(frameType, frameStart, frameEnd, raw) {
    if (lastEvent) {
      switch (lastEvent.event) {
        case FlightLogEvent.LOGGING_RESUME:
          lastMainFrameIteration = lastEvent.data.logIteration;
          lastMainFrameTime = lastEvent.data.currentTime;
          break;
      }
      if (that.onFrameReady) {
        that.onFrameReady(
          true,
          lastEvent,
          frameType,
          frameStart,
          frameEnd - frameStart
        );
      }
      return true;
    }
    return false;
  }
  function parseEventFrame(raw) {
    let END_OF_LOG_MESSAGE = "End of log\0", eventType = stream.readByte();
    lastEvent = {
      event: eventType,
      data: {}
    };
    switch (eventType) {
      case FlightLogEvent.SYNC_BEEP:
        lastEvent.data.time = stream.readUnsignedVB();
        lastEvent.time = lastEvent.data.time;
        break;
      case FlightLogEvent.FLIGHT_MODE:
        lastEvent.data.newFlags = stream.readUnsignedVB();
        lastEvent.data.lastFlags = stream.readUnsignedVB();
        break;
      case FlightLogEvent.DISARM:
        lastEvent.data.reason = stream.readUnsignedVB();
        break;
      case FlightLogEvent.AUTOTUNE_CYCLE_START:
        lastEvent.data.phase = stream.readByte();
        var cycleAndRising = stream.readByte();
        lastEvent.data.cycle = cycleAndRising & 127;
        lastEvent.data.rising = cycleAndRising >> 7 & 1;
        lastEvent.data.p = stream.readByte();
        lastEvent.data.i = stream.readByte();
        lastEvent.data.d = stream.readByte();
        break;
      case FlightLogEvent.AUTOTUNE_CYCLE_RESULT:
        lastEvent.data.overshot = stream.readByte();
        lastEvent.data.p = stream.readByte();
        lastEvent.data.i = stream.readByte();
        lastEvent.data.d = stream.readByte();
        break;
      case FlightLogEvent.AUTOTUNE_TARGETS:
        lastEvent.data.currentAngle = stream.readS16() / 10;
        lastEvent.data.targetAngle = stream.readS8();
        lastEvent.data.targetAngleAtPeak = stream.readS8();
        lastEvent.data.firstPeakAngle = stream.readS16() / 10;
        lastEvent.data.secondPeakAngle = stream.readS16() / 10;
        break;
      case FlightLogEvent.GTUNE_CYCLE_RESULT:
        lastEvent.data.axis = stream.readU8();
        lastEvent.data.gyroAVG = stream.readSignedVB();
        lastEvent.data.newP = stream.readS16();
        break;
      case FlightLogEvent.INFLIGHT_ADJUSTMENT:
        var tmp = stream.readU8();
        lastEvent.data.name = "Unknown";
        lastEvent.data.func = tmp & 127;
        lastEvent.data.value = tmp < 128 ? stream.readSignedVB() : uint32ToFloat(stream.readU32());
        if (INFLIGHT_ADJUSTMENT_FUNCTIONS[lastEvent.data.func] !== void 0) {
          let descr = INFLIGHT_ADJUSTMENT_FUNCTIONS[lastEvent.data.func];
          lastEvent.data.name = descr.name;
          let scale = 1;
          if (descr.scale !== void 0) {
            scale = descr.scale;
          }
          if (tmp >= 128 && descr.scalef !== void 0) {
            scale = descr.scalef;
          }
          lastEvent.data.value = Math.round(lastEvent.data.value * scale * 1e4) / 1e4;
        }
        break;
      case FlightLogEvent.TWITCH_TEST:
        var tmp = stream.readU8();
        switch (tmp) {
          case 1:
            lastEvent.data.name = "Response Time->";
            break;
          case 2:
            lastEvent.data.name = "Half Setpoint Time->";
            break;
          case 3:
            lastEvent.data.name = "Setpoint Time->";
            break;
          case 4:
            lastEvent.data.name = "Negative Setpoint->";
            break;
          case 5:
            lastEvent.data.name = "Initial Setpoint->";
        }
        lastEvent.data.value = uint32ToFloat(stream.readU32());
        break;
      case FlightLogEvent.LOGGING_RESUME:
        lastEvent.data.logIteration = stream.readUnsignedVB();
        lastEvent.data.currentTime = stream.readUnsignedVB();
        break;
      case FlightLogEvent.LOG_END:
        var endMessage = stream.readString(END_OF_LOG_MESSAGE.length);
        if (endMessage == END_OF_LOG_MESSAGE) {
          stream.end = stream.pos;
        } else {
          lastEvent = null;
        }
        break;
      default:
        lastEvent = null;
    }
  }
  function getFrameType(command) {
    return frameTypes[command];
  }
  this.resetDataState = function() {
    lastSkippedFrames = 0;
    lastMainFrameIteration = -1;
    lastMainFrameTime = -1;
    invalidateMainStream();
    gpsHomeIsValid = false;
    lastEvent = null;
  };
  this.resetAllState = function() {
    this.resetStats();
    let completeSysConfig2 = $.extend(
      {},
      defaultSysConfig,
      defaultSysConfigExtension
    );
    this.sysConfig = Object.create(completeSysConfig2);
    this.frameDefs = {};
    this.resetDataState();
  };
  function isFrameDefComplete(frameDef) {
    return frameDef && frameDef.count > 0 && frameDef.encoding.length == frameDef.count && frameDef.predictor.length == frameDef.count;
  }
  this.parseHeader = function(startOffset, endOffset) {
    this.resetAllState();
    stream.start = startOffset === void 0 ? stream.pos : startOffset;
    stream.pos = stream.start;
    stream.end = endOffset === void 0 ? stream.end : endOffset;
    stream.eof = false;
    mainloop: while (true) {
      let command = stream.readChar();
      switch (command) {
        case "H":
          parseHeaderLine();
          break;
        case EOF2:
          break mainloop;
        default:
          if (getFrameType(command)) {
            stream.unreadChar(command);
            break mainloop;
          }
          break;
      }
    }
    adjustFieldDefsList(
      that.sysConfig.firmwareType,
      that.sysConfig.firmwareVersion
    );
    FlightLogFieldPresenter.adjustDebugDefsList(
      that.sysConfig.firmwareType,
      that.sysConfig.firmwareVersion
    );
    if (!isFrameDefComplete(this.frameDefs.I)) {
      throw "Log is missing required definitions for I frames, header may be corrupt";
    }
    if (!this.frameDefs.P) {
      throw "Log is missing required definitions for P frames, header may be corrupt";
    }
    this.frameDefs.P.count = this.frameDefs.I.count;
    this.frameDefs.P.name = this.frameDefs.I.name;
    this.frameDefs.P.nameToIndex = this.frameDefs.I.nameToIndex;
    this.frameDefs.P.signed = this.frameDefs.I.signed;
    if (!isFrameDefComplete(this.frameDefs.P)) {
      throw "Log is missing required definitions for P frames, header may be corrupt";
    }
    mainHistoryRing = [
      new Array(this.frameDefs.I.count),
      new Array(this.frameDefs.I.count),
      new Array(this.frameDefs.I.count)
    ];
    if (this.frameDefs.H && this.frameDefs.G) {
      gpsHomeHistory = [
        new Array(this.frameDefs.H.count),
        new Array(this.frameDefs.H.count)
      ];
      lastGPS = new Array(this.frameDefs.G.count);
      for (let i = 1; i < this.frameDefs.G.count; i++) {
        if (this.frameDefs.G.predictor[i - 1] == FLIGHT_LOG_FIELD_PREDICTOR_HOME_COORD && this.frameDefs.G.predictor[i] == FLIGHT_LOG_FIELD_PREDICTOR_HOME_COORD) {
          this.frameDefs.G.predictor[i] = FLIGHT_LOG_FIELD_PREDICTOR_HOME_COORD_1;
        }
      }
    } else {
      gpsHomeHistory = [];
      lastGPS = [];
    }
    if (this.frameDefs.S) {
      lastSlow = new Array(this.frameDefs.S.count);
    } else {
      lastSlow = [];
    }
  };
  this.setGPSHomeHistory = function(newGPSHome) {
    if (newGPSHome.length == that.frameDefs.H.count) {
      for (let i = 0; i < newGPSHome.length; i++) {
        gpsHomeHistory[1][i] = newGPSHome[i];
      }
      gpsHomeIsValid = true;
    } else {
      gpsHomeIsValid = false;
    }
  };
  this.parseLogData = function(raw, startOffset, endOffset) {
    let looksLikeFrameCompleted = false, prematureEof = false, frameStart = 0, frameType = null, lastFrameType = null;
    invalidateMainStream();
    stream.start = startOffset === void 0 ? stream.pos : startOffset;
    stream.pos = stream.start;
    stream.end = endOffset === void 0 ? stream.end : endOffset;
    stream.eof = false;
    while (true) {
      let command = stream.readChar();
      if (lastFrameType) {
        var lastFrameSize = stream.pos - frameStart, frameTypeStats;
        looksLikeFrameCompleted = getFrameType(command) || !prematureEof && command == EOF2;
        if (!this.stats.frame[lastFrameType.marker]) {
          this.stats.frame[lastFrameType.marker] = {
            bytes: 0,
            sizeCount: new Int32Array(
              256
            ),
            validCount: 0,
            corruptCount: 0,
            desyncCount: 0,
            field: []
          };
        }
        frameTypeStats = this.stats.frame[lastFrameType.marker];
        if (lastFrameSize <= FLIGHT_LOG_MAX_FRAME_LENGTH && looksLikeFrameCompleted) {
          let frameAccepted = true;
          if (lastFrameType.complete)
            frameAccepted = lastFrameType.complete(
              lastFrameType.marker,
              frameStart,
              stream.pos,
              raw
            );
          if (frameAccepted) {
            frameTypeStats.bytes += lastFrameSize;
            frameTypeStats.sizeCount[lastFrameSize]++;
            frameTypeStats.validCount++;
          } else {
            frameTypeStats.desyncCount++;
          }
        } else {
          mainStreamIsValid = false;
          frameTypeStats.corruptCount++;
          this.stats.totalCorruptFrames++;
          stream.pos = frameStart + 1;
          lastFrameType = null;
          prematureEof = false;
          stream.eof = false;
          continue;
        }
      }
      if (command == EOF2) break;
      frameStart = stream.pos - 1;
      frameType = getFrameType(command);
      if (frameType && (command == "E" || that.frameDefs[command])) {
        lastFrameType = frameType;
        frameType.parse(raw);
        if (stream.eof) {
          prematureEof = true;
        }
      } else {
        mainStreamIsValid = false;
        lastFrameType = null;
      }
    }
    this.stats.totalBytes += stream.end - stream.start;
    return true;
  };
  frameTypes = {
    I: { marker: "I", parse: parseIntraframe, complete: completeIntraframe },
    P: { marker: "P", parse: parseInterframe, complete: completeInterframe },
    G: { marker: "G", parse: parseGPSFrame, complete: completeGPSFrame },
    H: {
      marker: "H",
      parse: parseGPSHomeFrame,
      complete: completeGPSHomeFrame
    },
    S: { marker: "S", parse: parseSlowFrame, complete: completeSlowFrame },
    E: { marker: "E", parse: parseEventFrame, complete: completeEventFrame }
  };
  stream = new ArrayDataStream(logData);
}
var init_flightlog_parser = __esm({
  "src/flightlog_parser.js"() {
    init_flightlog_fields_presenter();
    init_flightlog_fielddefs();
    init_datastream();
    init_decoders();
    init_tools();
    globalThis.FIRMWARE_TYPE_UNKNOWN = 0;
    globalThis.FIRMWARE_TYPE_BASEFLIGHT = 1;
    globalThis.FIRMWARE_TYPE_CLEANFLIGHT = 2;
    globalThis.FIRMWARE_TYPE_BETAFLIGHT = 3;
    globalThis.FIRMWARE_TYPE_INAV = 4;
    FlightLogParser.prototype.resetStats = function() {
      this.stats = {
        totalBytes: 0,
        // Number of frames that failed to decode:
        totalCorruptFrames: 0,
        //If our sampling rate is less than 1, we won't log every loop iteration, and that is accounted for here:
        intentionallyAbsentIterations: 0,
        // Statistics for each frame type ("I", "P" etc)
        frame: {}
      };
    };
    FlightLogParser.prototype.FLIGHT_LOG_START_MARKER = asciiStringToByteArray(
      "H Product:Blackbox flight data recorder by Nicholas Sherlock\n"
    );
    FlightLogParser.prototype.FLIGHT_LOG_FIELD_UNSIGNED = 0;
    FlightLogParser.prototype.FLIGHT_LOG_FIELD_SIGNED = 1;
    FlightLogParser.prototype.FLIGHT_LOG_FIELD_INDEX_ITERATION = 0;
    FlightLogParser.prototype.FLIGHT_LOG_FIELD_INDEX_TIME = 1;
  }
});

// src/imu.js
function IMU(copyFrom) {
  let RAD = Math.PI / 180, ROLL = 0, PITCH = 1, YAW = 2, THROTTLE = 3, X = 0, Y = 1, Z = 2, gyro_cmpf_factor = 600, gyro_cmpfm_factor = 250, accz_lpf_cutoff = 5, magneticDeclination = 0, fc_acc = 0.5 / (Math.PI * accz_lpf_cutoff), INV_GYR_CMPF_FACTOR = 1 / (gyro_cmpf_factor + 1), INV_GYR_CMPFM_FACTOR = 1 / (gyro_cmpfm_factor + 1);
  function normalizeVector(src, dest) {
    let length = Math.sqrt(src.X * src.X + src.Y * src.Y + src.Z * src.Z);
    if (length !== 0) {
      dest.X = src.X / length;
      dest.Y = src.Y / length;
      dest.Z = src.Z / length;
    }
  }
  function rotateVector(v, delta) {
    let v_tmp = { X: v.X, Y: v.Y, Z: v.Z }, mat = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ], cosx, sinx, cosy, siny, cosz, sinz, coszcosx, sinzcosx, coszsinx, sinzsinx;
    cosx = Math.cos(delta[ROLL]);
    sinx = Math.sin(delta[ROLL]);
    cosy = Math.cos(delta[PITCH]);
    siny = Math.sin(delta[PITCH]);
    cosz = Math.cos(delta[YAW]);
    sinz = Math.sin(delta[YAW]);
    coszcosx = cosz * cosx;
    sinzcosx = sinz * cosx;
    coszsinx = sinx * cosz;
    sinzsinx = sinx * sinz;
    mat[0][0] = cosz * cosy;
    mat[0][1] = -cosy * sinz;
    mat[0][2] = siny;
    mat[1][0] = sinzcosx + coszsinx * siny;
    mat[1][1] = coszcosx - sinzsinx * siny;
    mat[1][2] = -sinx * cosy;
    mat[2][0] = sinzsinx - coszcosx * siny;
    mat[2][1] = coszsinx + sinzcosx * siny;
    mat[2][2] = cosy * cosx;
    v.X = v_tmp.X * mat[0][0] + v_tmp.Y * mat[1][0] + v_tmp.Z * mat[2][0];
    v.Y = v_tmp.X * mat[0][1] + v_tmp.Y * mat[1][1] + v_tmp.Z * mat[2][1];
    v.Z = v_tmp.X * mat[0][2] + v_tmp.Y * mat[1][2] + v_tmp.Z * mat[2][2];
  }
  function calculateAccelerationInEarthFrame(accSmooth, attitude, acc_1G) {
    let rpy = [-attitude.roll, -attitude.pitch, -attitude.heading], result = {
      X: accSmooth[0],
      Y: accSmooth[1],
      Z: accSmooth[2]
    };
    rotateVector(result, rpy);
    result.Z -= acc_1G;
    return result;
  }
  function calculateHeading(vec, roll, pitch) {
    let cosineRoll = Math.cos(roll), sineRoll = Math.sin(roll), cosinePitch = Math.cos(pitch), sinePitch = Math.sin(pitch), headingX = vec.X * cosinePitch + vec.Y * sineRoll * sinePitch + vec.Z * sinePitch * cosineRoll, headingY = vec.Y * cosineRoll - vec.Z * sineRoll, heading = Math.atan2(headingY, headingX) + magneticDeclination / 10 * RAD;
    heading += 2 * Math.PI;
    if (heading > 2 * Math.PI) {
      heading -= 2 * Math.PI;
    }
    return heading;
  }
  this.updateEstimatedAttitude = function(gyroADC, accSmooth, currentTime, acc_1G, gyroScale, magADC) {
    let accMag = 0, deltaTime, scale, deltaGyroAngle = [0, 0, 0];
    if (this.previousTime === false) {
      deltaTime = 1;
    } else {
      deltaTime = currentTime - this.previousTime;
    }
    scale = deltaTime * gyroScale;
    this.previousTime = currentTime;
    for (let axis = 0; axis < 3; axis++) {
      deltaGyroAngle[axis] = gyroADC[axis] * scale;
      accMag += accSmooth[axis] * accSmooth[axis];
    }
    accMag = accMag * 100 / (acc_1G * acc_1G);
    rotateVector(this.estimateGyro, deltaGyroAngle);
    if (72 < accMag && accMag < 133) {
      this.estimateGyro.X = (this.estimateGyro.X * gyro_cmpf_factor + accSmooth[0]) * INV_GYR_CMPF_FACTOR;
      this.estimateGyro.Y = (this.estimateGyro.Y * gyro_cmpf_factor + accSmooth[1]) * INV_GYR_CMPF_FACTOR;
      this.estimateGyro.Z = (this.estimateGyro.Z * gyro_cmpf_factor + accSmooth[2]) * INV_GYR_CMPF_FACTOR;
    }
    let attitude = {
      roll: Math.atan2(this.estimateGyro.Y, this.estimateGyro.Z),
      pitch: Math.atan2(
        -this.estimateGyro.X,
        Math.sqrt(
          this.estimateGyro.Y * this.estimateGyro.Y + this.estimateGyro.Z * this.estimateGyro.Z
        )
      )
    };
    if (false) {
      rotateVector(this.estimateMag, deltaGyroAngle);
      this.estimateMag.X = (this.estimateMag.X * gyro_cmpfm_factor + magADC[0]) * INV_GYR_CMPFM_FACTOR;
      this.estimateMag.Y = (this.estimateMag.Y * gyro_cmpfm_factor + magADC[1]) * INV_GYR_CMPFM_FACTOR;
      this.estimateMag.Z = (this.estimateMag.Z * gyro_cmpfm_factor + magADC[2]) * INV_GYR_CMPFM_FACTOR;
      attitude.heading = calculateHeading(
        this.estimateMag,
        attitude.roll,
        attitude.pitch
      );
    } else {
      rotateVector(this.EstN, deltaGyroAngle);
      normalizeVector(this.EstN, this.EstN);
      attitude.heading = calculateHeading(
        this.EstN,
        attitude.roll,
        attitude.pitch
      );
    }
    return attitude;
  };
  if (copyFrom) {
    this.copyStateFrom(copyFrom);
  } else {
    this.reset();
  }
}
var init_imu = __esm({
  "src/imu.js"() {
    IMU.prototype.reset = function() {
      this.estimateGyro = { X: 0, Y: 0, Z: 0 };
      this.EstN = { X: 1, Y: 0, Z: 0 };
      this.estimateMag = { X: 0, Y: 0, Z: 0 };
      this.previousTime = false;
    };
    IMU.prototype.copyStateFrom = function(that) {
      this.estimateGyro = {
        X: that.estimateGyro.X,
        Y: that.estimateGyro.Y,
        Z: that.estimateGyro.Z
      };
      this.estimateMag = {
        X: that.estimateMag.X,
        Y: that.estimateMag.Y,
        Z: that.estimateMag.Z
      };
      this.EstN = {
        X: that.EstN.X,
        Y: that.EstN.Y,
        Z: that.EstN.Z
      };
      this.previousTime = that.previousTime;
    };
  }
});

// src/flightlog_index.js
function FlightLogIndex(logData) {
  let that = this, logBeginOffsets = false, logCount = false, intraframeDirectories = false;
  function buildLogOffsetsIndex() {
    let stream = new ArrayDataStream(logData), i, logStart;
    logBeginOffsets = [];
    for (i = 0; ; i++) {
      logStart = stream.nextOffsetOf(
        FlightLogParser.prototype.FLIGHT_LOG_START_MARKER
      );
      if (logStart == -1) {
        logBeginOffsets.push(stream.end);
        break;
      }
      logBeginOffsets.push(logStart);
      stream.pos = logStart + FlightLogParser.prototype.FLIGHT_LOG_START_MARKER.length;
    }
  }
  function buildIntraframeDirectories() {
    let parser = new FlightLogParser(logData, that);
    intraframeDirectories = [];
    for (let i = 0; i < that.getLogCount(); i++) {
      var intraIndex = {
        times: [],
        offsets: [],
        avgThrottle: [],
        maxRC: [],
        maxMotorDiff: [],
        initialIMU: [],
        initialSlow: [],
        initialGPSHome: [],
        initialGPS: [],
        hasEvent: [],
        minTime: false,
        maxTime: false,
        unLoggedTime: 0
      }, imu = new IMU(), gyroADC, accSmooth, magADC, iframeCount = 0, motorFields = [], maxRCFields = [], matches, throttleTotal, rcTotal, maxMotor, minMotor, eventInThisChunk = null, parsedHeader, sawEndMarker = false;
      try {
        parser.parseHeader(logBeginOffsets[i], logBeginOffsets[i + 1]);
        parsedHeader = true;
      } catch (e) {
        console.log(`Error parsing header of log #${i + 1}: ${e}`);
        intraIndex.error = e;
        parsedHeader = false;
      }
      if (parsedHeader) {
        var sysConfig = parser.sysConfig, mainFrameDef = parser.frameDefs.I, gyroADC = [
          mainFrameDef.nameToIndex["gyroADC[0]"],
          mainFrameDef.nameToIndex["gyroADC[1]"],
          mainFrameDef.nameToIndex["gyroADC[2]"]
        ], accSmooth = [
          mainFrameDef.nameToIndex["accSmooth[0]"],
          mainFrameDef.nameToIndex["accSmooth[1]"],
          mainFrameDef.nameToIndex["accSmooth[2]"]
        ], magADC = [
          mainFrameDef.nameToIndex["magADC[0]"],
          mainFrameDef.nameToIndex["magADC[1]"],
          mainFrameDef.nameToIndex["magADC[2]"]
        ], lastSlow = [], lastGPSHome = [], lastGPS = [];
        for (let j = 0; j < 8; j++) {
          if (mainFrameDef.nameToIndex[`motor[${j}]`] !== void 0) {
            motorFields.push(mainFrameDef.nameToIndex[`motor[${j}]`]);
          }
        }
        for (let j = 0; j < 3; j++) {
          if (mainFrameDef.nameToIndex[`rcCommand[${j}]`] !== void 0) {
            maxRCFields.push(mainFrameDef.nameToIndex[`rcCommand[${j}]`]);
          } else {
            console.log("RCField not found");
          }
        }
        if (magADC[0] === void 0) {
          magADC = false;
        }
        let frameTime;
        parser.onFrameReady = function(frameValid, frame, frameType, frameOffset, frameSize) {
          if (!frameValid) {
            return;
          }
          switch (frameType) {
            case "P":
            case "I":
              frameTime = frame[FlightLogParser.prototype.FLIGHT_LOG_FIELD_INDEX_TIME];
              if (intraIndex.minTime === false) {
                intraIndex.minTime = frameTime;
              }
              if (intraIndex.maxTime === false || frameTime > intraIndex.maxTime) {
                intraIndex.maxTime = frameTime;
              }
              if (frameType == "I") {
                if (iframeCount % 4 === 0) {
                  intraIndex.times.push(frameTime);
                  intraIndex.offsets.push(frameOffset);
                  if (motorFields.length) {
                    throttleTotal = 0;
                    maxMotor = 0;
                    minMotor = 2e3;
                    for (let mofo of motorFields) {
                      maxMotor = Math.max(frame[mofo], maxMotor);
                      minMotor = Math.min(frame[mofo], minMotor);
                      throttleTotal += frame[mofo];
                    }
                    intraIndex.maxMotorDiff.push(maxMotor - minMotor);
                    intraIndex.avgThrottle.push(
                      Math.round(throttleTotal / motorFields.length)
                    );
                  }
                  if (maxRCFields.length) {
                    rcTotal = 0;
                    for (let rcfo of maxRCFields) {
                      rcTotal += Math.max(rcTotal, Math.abs(frame[rcfo]));
                    }
                    intraIndex.maxRC.push(rcTotal);
                  }
                  intraIndex.initialIMU.push(new IMU(imu));
                  intraIndex.initialSlow.push(lastSlow);
                  intraIndex.initialGPSHome.push(lastGPSHome);
                  intraIndex.initialGPS.push(lastGPS);
                }
                iframeCount++;
              }
              imu.updateEstimatedAttitude(
                [frame[gyroADC[0]], frame[gyroADC[1]], frame[gyroADC[2]]],
                [frame[accSmooth[0]], frame[accSmooth[1]], frame[accSmooth[2]]],
                frame[FlightLogParser.prototype.FLIGHT_LOG_FIELD_INDEX_TIME],
                sysConfig.acc_1G,
                sysConfig.gyroScale,
                magADC ? [frame[magADC[0]], frame[magADC[1]], frame[magADC[2]]] : false
              );
              break;
            case "G":
              lastGPS = frame.slice(0);
              lastGPS.shift();
              break;
            case "H":
              lastGPSHome = frame.slice(0);
              break;
            case "E":
              if (intraIndex.times.length > 0) {
                intraIndex.hasEvent[intraIndex.times.length - 1] = true;
              }
              if (frame.event == FlightLogEvent.LOG_END) {
                sawEndMarker = true;
              }
              if (frame.event == FlightLogEvent.LOGGING_RESUME) {
                if (frameTime) {
                  intraIndex.unLoggedTime += frame.data.currentTime - frameTime;
                }
              }
              break;
            case "S":
              lastSlow = frame.slice(0);
              break;
          }
        };
        try {
          parser.parseLogData(false);
        } catch (e) {
          intraIndex.error = e;
        }
        if (!parser.frameDefs.S) {
          delete intraIndex.initialSlow;
        }
        if (!parser.frameDefs.H) {
          delete intraIndex.initialGPSHome;
        }
        intraIndex.stats = parser.stats;
      }
      if (intraIndex.minTime === false) {
        if (sawEndMarker) {
          intraIndex.error = "Logging paused, no data";
        } else {
          intraIndex.error = "Log truncated, no data";
        }
      }
      intraframeDirectories.push(intraIndex);
    }
  }
  this.loadFromJSON = function(json) {
  };
  this.saveToJSON = function() {
    let intraframeDirectories2 = this.getIntraframeDirectories(), i, j, resultIndexes = new Array(intraframeDirectories2.length);
    for (i = 0; i < intraframeDirectories2.length; i++) {
      var lastTime, lastLastTime, lastOffset, lastLastOffset, lastThrottle, sourceIndex = intraframeDirectories2[i], resultIndex = {
        times: new Array(sourceIndex.times.length),
        offsets: new Array(sourceIndex.offsets.length),
        minTime: sourceIndex.minTime,
        maxTime: sourceIndex.maxTime,
        avgThrottle: new Array(sourceIndex.avgThrottle.length),
        maxRC: new Array(sourceIndex.maxRC.length),
        maxMotorDiff: new Array(sourceIndex.maxMotorDiff.length)
      };
      if (sourceIndex.times.length > 0) {
        resultIndex.times[0] = sourceIndex.times[0];
        resultIndex.offsets[0] = sourceIndex.offsets[0];
        lastLastTime = lastTime = sourceIndex.times[0];
        lastLastOffset = lastOffset = sourceIndex.offsets[0];
        for (j = 1; j < sourceIndex.times.length; j++) {
          resultIndex.times[j] = sourceIndex.times[j] - 2 * lastTime + lastLastTime;
          resultIndex.offsets[j] = sourceIndex.offsets[j] - 2 * lastOffset + lastLastOffset;
          lastLastTime = lastTime;
          lastTime = sourceIndex.times[j];
          lastLastOffset = lastOffset;
          lastOffset = sourceIndex.offsets[j];
        }
      }
      if (sourceIndex.avgThrottle.length > 0) {
        for (let j2 = 0; j2 < sourceIndex.avgThrottle.length; j2++) {
          resultIndex.avgThrottle[j2] = sourceIndex.avgThrottle[j2] - 1e3;
          resultIndex.maxRC[j2] = sourceIndex.maxRC[j2] * 20 - 1e3;
          resultIndex.maxMotorDiff[j2] = sourceIndex.maxMotorDiff[j2] * 20 - 1e3;
        }
      }
      resultIndexes[i] = resultIndex;
    }
    return JSON.stringify(resultIndexes);
  };
  this.getLogBeginOffset = function(index) {
    if (!logBeginOffsets) buildLogOffsetsIndex();
    return logBeginOffsets[index];
  };
  this.getLogCount = function() {
    if (!logBeginOffsets) buildLogOffsetsIndex();
    return logBeginOffsets.length - 1;
  };
  this.getIntraframeDirectories = function() {
    if (!intraframeDirectories) buildIntraframeDirectories();
    return intraframeDirectories;
  };
  this.getIntraframeDirectory = function(logIndex) {
    return this.getIntraframeDirectories()[logIndex];
  };
}
var init_flightlog_index = __esm({
  "src/flightlog_index.js"() {
    init_flightlog_parser();
    init_flightlog_fielddefs();
    init_imu();
    init_datastream();
    init_decoders();
  }
});

// src/gps_transform.js
function GPS_transform(Lat0, Lon0, H0, Heading) {
  function deg2rad(deg) {
    return deg * Math.PI / 180;
  }
  Lat0 = deg2rad(Lat0);
  Lon0 = deg2rad(Lon0);
  const Semimajor = 6378137, Flat = 1 / 298.257223563, Ecc_2 = Flat * (2 - Flat), SinB = Math.sin(Lat0), CosB = Math.cos(Lat0), SinL = Math.sin(Lon0), CosL = Math.cos(Lon0), N = Semimajor / Math.sqrt(1 - Ecc_2 * SinB * SinB), a11 = -SinB * CosL, a12 = -SinB * SinL, a13 = CosB, a21 = -SinL, a22 = CosL, a23 = 0, a31 = CosL * CosB, a32 = CosB * SinL, a33 = SinB, X0 = (N + H0) * CosB * CosL, Y0 = (N + H0) * CosB * SinL, Z0 = (N + H0 - Ecc_2 * N) * SinB, c11 = Math.cos(deg2rad(Heading)), c12 = Math.sin(deg2rad(Heading)), c21 = -c12, c22 = c11;
  this.WGS_ECEF = function(Lat, Lon, H) {
    Lat = deg2rad(Lat);
    Lon = deg2rad(Lon);
    const SinB2 = Math.sin(Lat), CosB2 = Math.cos(Lat), SinL2 = Math.sin(Lon), CosL2 = Math.cos(Lon), N2 = Semimajor / Math.sqrt(1 - Ecc_2 * SinB2 * SinB2);
    return {
      x: (N2 + H) * CosB2 * CosL2,
      y: (N2 + H) * CosB2 * SinL2,
      z: (N2 + H - Ecc_2 * N2) * SinB2
    };
  };
  this.ECEF_BS = function(pos) {
    const PosX1 = a11 * (pos.x - X0) + a12 * (pos.y - Y0) + a13 * (pos.z - Z0);
    const PosZ1 = a21 * (pos.x - X0) + a22 * (pos.y - Y0) + a23 * (pos.z - Z0);
    return {
      x: c11 * PosX1 + c12 * PosZ1,
      y: a31 * (pos.x - X0) + a32 * (pos.y - Y0) + a33 * (pos.z - Z0),
      z: c21 * PosX1 + c22 * PosZ1
    };
  };
  this.WGS_BS = function(Lat, Lon, H) {
    return this.ECEF_BS(this.WGS_ECEF(Lat, Lon, H));
  };
}
var init_gps_transform = __esm({
  "src/gps_transform.js"() {
  }
});

// src/cache.js
function FIFOCache(initialCapacity) {
  let queue = [], items = {};
  function removeFromQueue(key) {
    for (let i = 0; i < queue.length; i++) {
      if (queue[i] == key) {
        for (let j = i; j < queue.length - 1; j++) {
          queue[j] = queue[j + 1];
        }
        queue.length--;
        break;
      }
    }
  }
  this.capacity = initialCapacity;
  this.recycle = function() {
    if (queue.length > this.capacity) {
      let key = queue.shift(), result = items[key];
      delete items[key];
      return result;
    }
    return null;
  };
  this.add = function(key, value) {
    if (items[key] !== void 0) removeFromQueue(key);
    queue.push(key);
    items[key] = value;
    while (queue.length > this.capacity + 1) {
      delete items[queue.shift()];
    }
  };
  this.get = function(key) {
    let item = items[key];
    if (item) {
      removeFromQueue(key);
      queue.push(key);
    }
    return item;
  };
  this.clear = function() {
    queue = [];
    items = {};
  };
}
var init_cache = __esm({
  "src/cache.js"() {
  }
});

// src/flightlog.js
var flightlog_exports = {};
__export(flightlog_exports, {
  FlightLog: () => FlightLog
});
function FlightLog(logData) {
  let ADDITIONAL_COMPUTED_FIELD_COUNT = 20, that = this, logIndex = 0, logIndexes = new FlightLogIndex(logData), parser = new FlightLogParser(logData), iframeDirectory, numCells = false, numMotors = false, fieldNames = [], fieldNameToIndex = {}, chunkCache = new FIFOCache(2), fieldSmoothing = {}, maxSmoothing = 0, smoothedCache = new FIFOCache(2), gpsTransform = null;
  this.parser = parser;
  this.getMainFieldCount = function() {
    return fieldNames.length;
  };
  this.getMainFieldNames = function() {
    return fieldNames;
  };
  this.getLogError = function(logIndex2) {
    let error = logIndexes.getIntraframeDirectory(logIndex2).error;
    if (error) return error;
    return false;
  };
  function getRawStats(logIndex2) {
    if (logIndex2 === void 0) {
      return iframeDirectory.stats;
    } else {
      return logIndexes.getIntraframeDirectory(logIndex2).stats;
    }
  }
  this.getStats = function(logIndex2) {
    let rawStats = getRawStats(logIndex2);
    if (rawStats.field === void 0) {
      rawStats.field = [];
      for (let i = 0; i < rawStats.frame.I.field.length; ++i) {
        rawStats.field[i] = {
          min: Math.min(
            rawStats.frame.I.field[i].min,
            rawStats.frame.P.field[i].min
          ),
          max: Math.max(
            rawStats.frame.I.field[i].max,
            rawStats.frame.P.field[i].max
          )
        };
      }
      if (rawStats.frame.S) {
        rawStats.field = rawStats.field.concat(rawStats.frame.S.field);
      }
    }
    return rawStats;
  };
  this.getMinTime = function(index) {
    index = index ?? logIndex;
    return logIndexes.getIntraframeDirectory(index).minTime;
  };
  this.getMaxTime = function(index) {
    index = index ?? logIndex;
    return logIndexes.getIntraframeDirectory(index).maxTime;
  };
  this.getActualLoggedTime = function(index) {
    index = index ?? logIndex;
    const directory = logIndexes.getIntraframeDirectory(index);
    return directory.maxTime - directory.minTime - directory.unLoggedTime;
  };
  this.getSysConfig = function() {
    return parser.sysConfig;
  };
  this.setSysConfig = function(newSysConfig) {
    $.extend(true, parser.sysConfig, newSysConfig);
  };
  this.getLogIndex = function() {
    return logIndex;
  };
  this.getLogCount = function() {
    return logIndexes.getLogCount();
  };
  this.getActivitySummary = function() {
    let directory = logIndexes.getIntraframeDirectory(logIndex);
    return {
      times: directory.times,
      avgThrottle: directory.avgThrottle,
      maxMotorDiff: directory.maxMotorDiff,
      maxRC: directory.maxRC,
      hasEvent: directory.hasEvent
    };
  };
  this.getMainFieldIndexByName = function(name) {
    return fieldNameToIndex[name];
  };
  this.getMainFieldIndexes = function(name) {
    return fieldNameToIndex;
  };
  this.getFrameAtTime = function(startTime) {
    let chunks = this.getChunksInTimeRange(startTime, startTime), chunk = chunks[0];
    if (chunk) {
      for (var i = 0; i < chunk.frames.length; i++) {
        if (chunk.frames[i][FlightLogParser.prototype.FLIGHT_LOG_FIELD_INDEX_TIME] > startTime)
          break;
      }
      return chunk.frames[i - 1];
    } else return false;
  };
  this.getSmoothedFrameAtTime = function(startTime) {
    let chunks = this.getSmoothedChunksInTimeRange(startTime, startTime), chunk = chunks[0];
    if (chunk) {
      for (var i = 0; i < chunk.frames.length; i++) {
        if (chunk.frames[i][FlightLogParser.prototype.FLIGHT_LOG_FIELD_INDEX_TIME] > startTime)
          break;
      }
      return chunk.frames[i - 1];
    } else return false;
  };
  this.getCurrentFrameAtTime = function(startTime) {
    let chunks = this.getSmoothedChunksInTimeRange(startTime, startTime), chunk = chunks[0];
    if (chunk) {
      for (var i = 0; i < chunk.frames.length; i++) {
        if (chunk.frames[i][FlightLogParser.prototype.FLIGHT_LOG_FIELD_INDEX_TIME] > startTime)
          break;
      }
      return {
        previous: i >= 2 ? chunk.frames[i - 2] : null,
        current: i >= 1 ? chunk.frames[i - 1] : null,
        next: i >= 0 ? chunk.frames[i] : null
      };
    } else return false;
  };
  function buildFieldNames() {
    fieldNames = parser.frameDefs.I.name.slice(0);
    if (parser.frameDefs.S) {
      for (const name of parser.frameDefs.S.name) {
        fieldNames.push(name);
      }
    }
    if (parser.frameDefs.G) {
      for (const name of parser.frameDefs.G.name) {
        if (name !== "time") {
          fieldNames.push(name);
        }
      }
    }
    if (!that.isFieldDisabled().GYRO) {
      fieldNames.push("heading[0]", "heading[1]", "heading[2]");
    }
    if (!that.isFieldDisabled().PID) {
      fieldNames.push("axisSum[0]", "axisSum[1]", "axisSum[2]");
    }
    if (!that.isFieldDisabled().SETPOINT) {
      fieldNames.push(
        "rcCommands[0]",
        "rcCommands[1]",
        "rcCommands[2]",
        "rcCommands[3]"
      );
    }
    if (!that.isFieldDisabled().GYRO && !that.isFieldDisabled().SETPOINT) {
      fieldNames.push("axisError[0]", "axisError[1]", "axisError[2]");
    }
    if (!that.isFieldDisabled().GPS) {
      fieldNames.push("gpsCartesianCoords[0]", "gpsCartesianCoords[1]", "gpsCartesianCoords[2]", "gpsDistance", "gpsHomeAzimuth");
    }
    fieldNameToIndex = {};
    for (let i = 0; i < fieldNames.length; i++) {
      fieldNameToIndex[fieldNames[i]] = i;
    }
  }
  function estimateNumMotors() {
    let count = 0;
    for (let j = 0; j < MAX_MOTOR_NUMBER; j++) {
      if (that.getMainFieldIndexByName(`motor[${j}]`) !== void 0) {
        count++;
      }
    }
    numMotors = count;
  }
  function estimateNumCells() {
    let i, fieldNames2 = that.getMainFieldNames(), sysConfig = that.getSysConfig(), found = false;
    let refVoltage;
    if (firmwareGreaterOrEqual(sysConfig, "3.1.0", "2.0.0")) {
      refVoltage = sysConfig.vbatref;
    } else {
      refVoltage = that.vbatADCToMillivolts(sysConfig.vbatref) / 100;
    }
    if (!fieldNameToIndex.vbatLatest) {
      numCells = false;
    } else {
      for (i = 1; i < 8; i++) {
        if (refVoltage < i * sysConfig.vbatmaxcellvoltage) break;
      }
      numCells = i;
    }
  }
  this.getNumCellsEstimate = function() {
    return numCells;
  };
  this.getNumMotors = function() {
    return numMotors;
  };
  function getChunksInIndexRange(startIndex, endIndex) {
    let resultChunks = [], eventNeedsTimestamp = [];
    if (startIndex < 0) startIndex = 0;
    if (endIndex > iframeDirectory.offsets.length - 1)
      endIndex = iframeDirectory.offsets.length - 1;
    if (endIndex < startIndex) return [];
    if (chunkCache.capacity < (endIndex - startIndex + 1) * 3 + 1) {
      chunkCache.capacity = (endIndex - startIndex + 1) * 3 + 1;
      smoothedCache.capacity = chunkCache.capacity;
    }
    for (let chunkIndex = startIndex; chunkIndex <= endIndex; chunkIndex++) {
      var chunkStartOffset, chunkEndOffset, chunk = chunkCache.get(chunkIndex);
      if (chunk) {
        let frame = chunk.frames[0];
        for (let i = 0; i < eventNeedsTimestamp.length; i++) {
          eventNeedsTimestamp[i].time = frame[FlightLogParser.prototype.FLIGHT_LOG_FIELD_INDEX_TIME];
        }
        eventNeedsTimestamp.length = 0;
      } else {
        chunkStartOffset = iframeDirectory.offsets[chunkIndex];
        if (chunkIndex + 1 < iframeDirectory.offsets.length)
          chunkEndOffset = iframeDirectory.offsets[chunkIndex + 1];
        else chunkEndOffset = logIndexes.getLogBeginOffset(logIndex + 1);
        chunk = chunkCache.recycle();
        if (chunk) {
          chunk.index = chunkIndex;
          chunk.gapStartsHere = {};
          chunk.events = [];
          delete chunk.hasAdditionalFields;
          delete chunk.needsEventTimes;
        } else {
          chunk = {
            index: chunkIndex,
            frames: [],
            gapStartsHere: {},
            events: []
          };
        }
        chunk.initialIMU = iframeDirectory.initialIMU[chunkIndex];
        var mainFrameIndex = 0, slowFrameLength = parser.frameDefs.S ? parser.frameDefs.S.count : 0, lastSlow = parser.frameDefs.S ? iframeDirectory.initialSlow[chunkIndex].slice(0) : [], lastGPSLength = parser.frameDefs.G ? parser.frameDefs.G.count - 1 : 0, lastGPS = parser.frameDefs.G ? iframeDirectory.initialGPS[chunkIndex].slice(0) : [];
        parser.onFrameReady = function(frameValid, frame, frameType, frameOffset, frameSize) {
          let destFrame, destFrame_currentIndex;
          if (frameValid || frameType == "G" && frame) {
            switch (frameType) {
              case "P":
              case "I":
                var numOutputFields = frame.length + slowFrameLength + lastGPSLength + ADDITIONAL_COMPUTED_FIELD_COUNT;
                if (chunk.frames[mainFrameIndex]) {
                  destFrame = chunk.frames[mainFrameIndex];
                  destFrame.length = numOutputFields;
                } else {
                  destFrame = new Array(numOutputFields);
                  chunk.frames.push(destFrame);
                }
                for (var i = 0; i < frame.length; i++) {
                  destFrame[i] = frame[i];
                }
                destFrame_currentIndex = frame.length;
                for (let slowFrameIndex = 0; slowFrameIndex < slowFrameLength; slowFrameIndex++) {
                  destFrame[slowFrameIndex + destFrame_currentIndex] = lastSlow[slowFrameIndex] === void 0 ? null : lastSlow[slowFrameIndex];
                }
                destFrame_currentIndex += slowFrameLength;
                for (let gpsFrameIndex = 0; gpsFrameIndex < lastGPSLength; gpsFrameIndex++) {
                  destFrame[gpsFrameIndex + destFrame_currentIndex] = lastGPS[gpsFrameIndex] === void 0 ? null : lastGPS[gpsFrameIndex];
                }
                for (var i = 0; i < eventNeedsTimestamp.length; i++) {
                  eventNeedsTimestamp[i].time = frame[FlightLogParser.prototype.FLIGHT_LOG_FIELD_INDEX_TIME];
                }
                eventNeedsTimestamp.length = 0;
                mainFrameIndex++;
                break;
              case "E":
                if (frame.event == FlightLogEvent.LOGGING_RESUME) {
                  chunk.gapStartsHere[mainFrameIndex - 1] = true;
                }
                if (!frame.time) {
                  eventNeedsTimestamp.push(frame);
                }
                chunk.events.push(frame);
                break;
              case "S":
                for (var i = 0; i < frame.length; i++) {
                  lastSlow[i] = frame[i];
                }
                break;
              case "H": {
                const homeAltitude = frame.length > 2 ? frame[2] / 10 : 0;
                gpsTransform = new GPS_transform(frame[0] / 1e7, frame[1] / 1e7, homeAltitude, 0);
                break;
              }
              case "G":
                frame.shift();
                for (let i2 = 0; i2 < frame.length; i2++) {
                  lastGPS[i2] = frame[i2];
                }
                break;
            }
          } else {
            chunk.gapStartsHere[mainFrameIndex - 1] = true;
          }
        };
        parser.resetDataState();
        if (iframeDirectory.initialGPSHome) {
          parser.setGPSHomeHistory(iframeDirectory.initialGPSHome[chunkIndex]);
        }
        parser.parseLogData(false, chunkStartOffset, chunkEndOffset);
        chunk.frames.length = mainFrameIndex;
        chunkCache.add(chunkIndex, chunk);
      }
      resultChunks.push(chunk);
    }
    if (eventNeedsTimestamp.length > 0) {
      resultChunks[resultChunks.length - 1].needsEventTimes = true;
    }
    injectComputedFields(resultChunks, resultChunks);
    return resultChunks;
  }
  this.getChunksInTimeRange = function(startTime, endTime) {
    let startIndex = binarySearchOrPrevious(iframeDirectory.times, startTime), endIndex = binarySearchOrPrevious(iframeDirectory.times, endTime);
    return getChunksInIndexRange(startIndex, endIndex);
  };
  this.setFieldSmoothing = function(newSmoothing) {
    smoothedCache.clear();
    fieldSmoothing = newSmoothing;
    maxSmoothing = 0;
    for (let fieldIndex in newSmoothing) {
      if (newSmoothing[fieldIndex] > maxSmoothing) {
        maxSmoothing = newSmoothing[fieldIndex];
      }
    }
  };
  function injectComputedFields(sourceChunks, destChunks) {
    let gyroADC = [fieldNameToIndex["gyroADC[0]"], fieldNameToIndex["gyroADC[1]"], fieldNameToIndex["gyroADC[2]"]];
    let accSmooth = [fieldNameToIndex["accSmooth[0]"], fieldNameToIndex["accSmooth[1]"], fieldNameToIndex["accSmooth[2]"]];
    let magADC = [fieldNameToIndex["magADC[0]"], fieldNameToIndex["magADC[1]"], fieldNameToIndex["magADC[2]"]];
    let imuQuaternion = [
      fieldNameToIndex["imuQuaternion[0]"],
      fieldNameToIndex["imuQuaternion[1]"],
      fieldNameToIndex["imuQuaternion[2]"]
    ];
    let rcCommand = [
      fieldNameToIndex["rcCommand[0]"],
      fieldNameToIndex["rcCommand[1]"],
      fieldNameToIndex["rcCommand[2]"],
      fieldNameToIndex["rcCommand[3]"]
    ];
    let setpoint = [
      fieldNameToIndex["setpoint[0]"],
      fieldNameToIndex["setpoint[1]"],
      fieldNameToIndex["setpoint[2]"],
      fieldNameToIndex["setpoint[3]"]
    ];
    let gpsCoord = [
      fieldNameToIndex["GPS_coord[0]"],
      fieldNameToIndex["GPS_coord[1]"],
      fieldNameToIndex["GPS_altitude"]
    ];
    const flightModeFlagsIndex = fieldNameToIndex["flightModeFlags"];
    let axisPID = [
      [
        fieldNameToIndex["axisP[0]"],
        fieldNameToIndex["axisI[0]"],
        fieldNameToIndex["axisD[0]"],
        fieldNameToIndex["axisF[0]"],
        fieldNameToIndex["axisS[0]"]
      ],
      [
        fieldNameToIndex["axisP[1]"],
        fieldNameToIndex["axisI[1]"],
        fieldNameToIndex["axisD[1]"],
        fieldNameToIndex["axisF[1]"],
        fieldNameToIndex["axisS[1]"]
      ],
      [
        fieldNameToIndex["axisP[2]"],
        fieldNameToIndex["axisI[2]"],
        fieldNameToIndex["axisD[2]"],
        fieldNameToIndex["axisF[2]"],
        fieldNameToIndex["axisS[2]"]
      ]
    ];
    let sourceChunkIndex;
    let destChunkIndex;
    const sysConfig = that.getSysConfig();
    if (destChunks.length === 0) {
      return;
    }
    if (!magADC[0]) {
      magADC = false;
    }
    if (!gyroADC[0]) {
      gyroADC = false;
    }
    if (!accSmooth[0]) {
      accSmooth = false;
    }
    if (!imuQuaternion[0]) {
      imuQuaternion = false;
    }
    if (!rcCommand[0]) {
      rcCommand = false;
    }
    if (!setpoint[0]) {
      setpoint = false;
    }
    if (!axisPID[0]) {
      axisPID = false;
    }
    if (!gpsCoord[0]) {
      gpsCoord = false;
    }
    sourceChunkIndex = 0;
    destChunkIndex = 0;
    while (sourceChunks[sourceChunkIndex].index < destChunks[destChunkIndex].index) {
      sourceChunkIndex++;
    }
    for (; destChunkIndex < destChunks.length; sourceChunkIndex++, destChunkIndex++) {
      let destChunk = destChunks[destChunkIndex], sourceChunk = sourceChunks[sourceChunkIndex];
      if (!destChunk.hasAdditionalFields) {
        destChunk.hasAdditionalFields = true;
        const chunkIMU = new IMU(sourceChunk.initialIMU);
        for (let i = 0; i < sourceChunk.frames.length; i++) {
          let srcFrame = sourceChunk.frames[i], destFrame = destChunk.frames[i], fieldIndex = destFrame.length - ADDITIONAL_COMPUTED_FIELD_COUNT;
          if (imuQuaternion) {
            const scaleFromFixedInt16 = 32767;
            const q = {
              x: srcFrame[imuQuaternion[0]] / scaleFromFixedInt16,
              y: srcFrame[imuQuaternion[1]] / scaleFromFixedInt16,
              z: srcFrame[imuQuaternion[2]] / scaleFromFixedInt16,
              w: 1
            };
            let m = q.x ** 2 + q.y ** 2 + q.z ** 2;
            if (m < 1) {
              q.w = Math.sqrt(1 - m);
            } else {
              m = Math.sqrt(m);
              q.x /= m;
              q.y /= m;
              q.z /= m;
              q.w = 0;
            }
            const xx = q.x ** 2, xy = q.x * q.y, xz = q.x * q.z, wx = q.w * q.x, yy = q.y ** 2, yz = q.y * q.z, wy = q.w * q.y, zz = q.z ** 2, wz = q.w * q.z;
            let roll = Math.atan2(2 * (wx + yz), 1 - 2 * (xx + yy));
            let pitch = 0.5 * Math.PI - Math.acos(2 * (wy - xz));
            let heading = -Math.atan2(2 * (wz + xy), 1 - 2 * (yy + zz));
            if (heading < 0) {
              heading += 2 * Math.PI;
            }
            destFrame[fieldIndex++] = roll;
            destFrame[fieldIndex++] = pitch;
            destFrame[fieldIndex++] = heading;
          } else {
            const attitude = chunkIMU.updateEstimatedAttitude(
              [srcFrame[gyroADC[0]], srcFrame[gyroADC[1]], srcFrame[gyroADC[2]]],
              [srcFrame[accSmooth[0]], srcFrame[accSmooth[1]], srcFrame[accSmooth[2]]],
              srcFrame[FlightLogParser.prototype.FLIGHT_LOG_FIELD_INDEX_TIME],
              sysConfig.acc_1G,
              sysConfig.gyroScale,
              magADC
            );
            destFrame[fieldIndex++] = attitude.roll;
            destFrame[fieldIndex++] = attitude.pitch;
            destFrame[fieldIndex++] = attitude.heading;
          }
          if (!that.isFieldDisabled().PID) {
            for (var axis = 0; axis < 3; axis++) {
              let pidSum = (axisPID[axis][0] !== void 0 ? srcFrame[axisPID[axis][0]] : 0) + (axisPID[axis][1] !== void 0 ? srcFrame[axisPID[axis][1]] : 0) + (axisPID[axis][2] !== void 0 ? srcFrame[axisPID[axis][2]] : 0) + (axisPID[axis][3] !== void 0 ? srcFrame[axisPID[axis][3]] : 0) + (axisPID[axis][4] !== void 0 ? srcFrame[axisPID[axis][4]] : 0);
              let pidLimit = axis < AXIS.YAW ? sysConfig.pidSumLimit : sysConfig.pidSumLimitYaw;
              if (pidLimit != null && pidLimit > 0) {
                pidSum = constrain(pidSum, -pidLimit, pidLimit);
              }
              destFrame[fieldIndex++] = pidSum;
            }
          }
          let currentFlightMode = srcFrame[flightModeFlagsIndex];
          let fieldIndexRcCommands = fieldIndex;
          if (!that.isFieldDisabled().SETPOINT) {
            if (sysConfig.firmwareType == FIRMWARE_TYPE_BETAFLIGHT && semver.gte(sysConfig.firmwareVersion, "4.0.0")) {
              for (let axis2 = 0; axis2 <= AXIS.YAW; axis2++) {
                destFrame[fieldIndex++] = srcFrame[setpoint[axis2]];
              }
              destFrame[fieldIndex++] = srcFrame[setpoint[AXIS.YAW + 1]] / 10;
            } else {
              for (let axis2 = 0; axis2 <= AXIS.YAW; axis2++) {
                destFrame[fieldIndex++] = rcCommand[axis2] !== void 0 ? that.rcCommandRawToDegreesPerSecond(
                  srcFrame[rcCommand[axis2]],
                  axis2,
                  currentFlightMode
                ) : 0;
              }
              destFrame[fieldIndex++] = rcCommand[AXIS.YAW + 1] !== void 0 ? that.rcCommandRawToThrottle(
                srcFrame[rcCommand[AXIS.YAW + 1]]
              ) : 0;
            }
          }
          if (!that.isFieldDisabled().GYRO && !that.isFieldDisabled().SETPOINT) {
            for (var axis = 0; axis < 3; axis++) {
              let gyroADCdegrees = gyroADC[axis] !== void 0 ? that.gyroRawToDegreesPerSecond(srcFrame[gyroADC[axis]]) : 0;
              destFrame[fieldIndex++] = destFrame[fieldIndexRcCommands + axis] - gyroADCdegrees;
            }
          }
          if (!that.isFieldDisabled().GPS) {
            if (gpsTransform && gpsCoord && srcFrame[gpsCoord[0]]) {
              const gpsCartesianCoords = gpsTransform.WGS_BS(srcFrame[gpsCoord[0]] / 1e7, srcFrame[gpsCoord[1]] / 1e7, srcFrame[gpsCoord[2]] / 10);
              destFrame[fieldIndex++] = gpsCartesianCoords.x;
              destFrame[fieldIndex++] = gpsCartesianCoords.y;
              destFrame[fieldIndex++] = gpsCartesianCoords.z;
              destFrame[fieldIndex++] = Math.sqrt(gpsCartesianCoords.x * gpsCartesianCoords.x + gpsCartesianCoords.z * gpsCartesianCoords.z);
              let homeAzimuth = Math.atan2(-gpsCartesianCoords.z, -gpsCartesianCoords.x) * 180 / Math.PI;
              if (homeAzimuth < 0) {
                homeAzimuth += 360;
              }
              destFrame[fieldIndex++] = homeAzimuth;
            } else {
              destFrame[fieldIndex++] = 0;
              destFrame[fieldIndex++] = 0;
              destFrame[fieldIndex++] = 0;
              destFrame[fieldIndex++] = 0;
              destFrame[fieldIndex++] = 0;
            }
          }
          destFrame.splice(fieldIndex);
        }
      }
    }
  }
  function addMissingEventTimes(chunks, processLastChunk) {
    let endChunk = processLastChunk ? chunks.length : chunks.length - 1;
    for (let i = 0; i < endChunk; i++) {
      let chunk = chunks[i];
      if (chunk.needsEventTimes) {
        var nextTime;
        if (i + 1 < chunks.length) {
          let nextChunk = chunks[i + 1];
          nextTime = nextChunk.frames[0][FlightLogParser.prototype.FLIGHT_LOG_FIELD_INDEX_TIME];
        } else {
          nextTime = chunk.frames[chunk.frames.length - 1][FlightLogParser.prototype.FLIGHT_LOG_FIELD_INDEX_TIME];
        }
        for (let j = chunk.events.length - 1; j >= 0; j--) {
          if (chunk.events[j].time === void 0) {
            chunk.events[j].time = nextTime;
          } else {
            break;
          }
        }
        delete chunk.needsEventTimes;
      }
    }
  }
  function verifyChunkIndexes(chunks) {
  }
  this.getSmoothedChunksInTimeRange = function(startTime, endTime) {
    let sourceChunks, resultChunks, chunkAlreadyDone, allDone, timeFieldIndex = FlightLogParser.prototype.FLIGHT_LOG_FIELD_INDEX_TIME;
    let leadingROChunks = 1, trailingROChunks = 1, startIndex = binarySearchOrPrevious(
      iframeDirectory.times,
      startTime - maxSmoothing
    ) - leadingROChunks, endIndex = binarySearchOrNext(iframeDirectory.times, endTime + maxSmoothing) + trailingROChunks;
    if (startIndex < 0) {
      leadingROChunks += startIndex;
      startIndex = 0;
    }
    if (endIndex > iframeDirectory.offsets.length - 1) {
      trailingROChunks -= endIndex - (iframeDirectory.offsets.length - 1);
      endIndex = iframeDirectory.offsets.length - 1;
    }
    sourceChunks = getChunksInIndexRange(startIndex, endIndex);
    verifyChunkIndexes(sourceChunks);
    resultChunks = new Array(
      sourceChunks.length - leadingROChunks - trailingROChunks
    );
    chunkAlreadyDone = new Array(sourceChunks.length);
    allDone = true;
    for (let i = leadingROChunks; i < sourceChunks.length - trailingROChunks; i++) {
      let sourceChunk = sourceChunks[i], resultChunk = smoothedCache.get(sourceChunk.index);
      chunkAlreadyDone[i] = resultChunk ? true : false;
      if (!chunkAlreadyDone[i]) {
        allDone = false;
        resultChunk = smoothedCache.recycle();
        if (resultChunk) {
          resultChunk.index = sourceChunk.index;
          resultChunk.frames.length = sourceChunk.frames.length;
          resultChunk.gapStartsHere = sourceChunk.gapStartsHere;
          resultChunk.events = sourceChunk.events;
          for (var j = 0; j < resultChunk.frames.length; j++) {
            if (resultChunk.frames[j]) {
              resultChunk.frames[j].length = sourceChunk.frames[j].length;
              for (let k = 0; k < sourceChunk.frames[j].length; k++) {
                resultChunk.frames[j][k] = sourceChunk.frames[j][k];
              }
            } else {
              resultChunk.frames[j] = sourceChunk.frames[j].slice(0);
            }
          }
        } else {
          resultChunk = {
            index: sourceChunk.index,
            frames: new Array(sourceChunk.frames.length),
            gapStartsHere: sourceChunk.gapStartsHere,
            events: sourceChunk.events
          };
          for (var j = 0; j < resultChunk.frames.length; j++) {
            resultChunk.frames[j] = sourceChunk.frames[j].slice(0);
          }
        }
        smoothedCache.add(resultChunk.index, resultChunk);
      }
      resultChunks[i - leadingROChunks] = resultChunk;
    }
    if (!allDone) {
      for (let fieldIndex in fieldSmoothing) {
        var radius = fieldSmoothing[fieldIndex], centerChunkIndex, centerFrameIndex;
        mainLoop: for (centerChunkIndex = leadingROChunks; centerChunkIndex < sourceChunks.length - trailingROChunks; centerChunkIndex++) {
          if (chunkAlreadyDone[centerChunkIndex]) continue;
          for (centerFrameIndex = 0; centerFrameIndex < sourceChunks[centerChunkIndex].frames.length; ) {
            var leftChunkIndex = centerChunkIndex, leftFrameIndex = centerFrameIndex, rightChunkIndex, rightFrameIndex, endChunkIndex = sourceChunks.length - 1 - trailingROChunks, endFrameIndex = sourceChunks[endChunkIndex].frames.length, partitionEnded = false, accumulator = 0, valuesInHistory = 0, centerTime = sourceChunks[centerChunkIndex].frames[centerFrameIndex][timeFieldIndex];
            while (leftFrameIndex > 0 || leftFrameIndex === 0 && leftChunkIndex > 0) {
              let oldleftChunkIndex = leftChunkIndex, oldleftFrameIndex = leftFrameIndex;
              if (leftFrameIndex === 0) {
                leftChunkIndex--;
                leftFrameIndex = sourceChunks[leftChunkIndex].frames.length - 1;
              } else {
                leftFrameIndex--;
              }
              if (sourceChunks[leftChunkIndex].gapStartsHere[leftFrameIndex] || sourceChunks[leftChunkIndex].frames[leftFrameIndex][timeFieldIndex] < centerTime - radius) {
                leftChunkIndex = oldleftChunkIndex;
                leftFrameIndex = oldleftFrameIndex;
                break;
              }
            }
            rightChunkIndex = leftChunkIndex;
            rightFrameIndex = leftFrameIndex;
            while (centerChunkIndex < endChunkIndex || centerChunkIndex == endChunkIndex && centerFrameIndex < endFrameIndex) {
              while (sourceChunks[leftChunkIndex].frames[leftFrameIndex][timeFieldIndex] < centerTime - radius) {
                accumulator -= sourceChunks[leftChunkIndex].frames[leftFrameIndex][fieldIndex];
                valuesInHistory--;
                leftFrameIndex++;
                if (leftFrameIndex == sourceChunks[leftChunkIndex].frames.length) {
                  leftFrameIndex = 0;
                  leftChunkIndex++;
                }
              }
              while (!partitionEnded && sourceChunks[rightChunkIndex].frames[rightFrameIndex][timeFieldIndex] <= centerTime + radius) {
                accumulator += sourceChunks[rightChunkIndex].frames[rightFrameIndex][fieldIndex];
                valuesInHistory++;
                if (sourceChunks[rightChunkIndex].gapStartsHere[rightFrameIndex]) {
                  partitionEnded = true;
                }
                rightFrameIndex++;
                if (rightFrameIndex == sourceChunks[rightChunkIndex].frames.length) {
                  rightFrameIndex = 0;
                  rightChunkIndex++;
                  if (rightChunkIndex == sourceChunks.length) {
                    partitionEnded = true;
                  }
                }
                if (partitionEnded) {
                  endChunkIndex = rightChunkIndex;
                  endFrameIndex = rightFrameIndex;
                }
              }
              resultChunks[centerChunkIndex - leadingROChunks].frames[centerFrameIndex][fieldIndex] = Math.round(accumulator / valuesInHistory);
              centerFrameIndex++;
              if (centerFrameIndex == sourceChunks[centerChunkIndex].frames.length) {
                centerFrameIndex = 0;
                centerChunkIndex++;
                if (chunkAlreadyDone[centerChunkIndex]) continue mainLoop;
                if (centerChunkIndex == sourceChunks.length - trailingROChunks)
                  break mainLoop;
              }
              centerTime = sourceChunks[centerChunkIndex].frames[centerFrameIndex][timeFieldIndex];
            }
          }
        }
      }
    }
    addMissingEventTimes(sourceChunks, trailingROChunks === 0);
    verifyChunkIndexes(sourceChunks);
    verifyChunkIndexes(resultChunks);
    return resultChunks;
  };
  this.openLog = function(index) {
    if (this.getLogError(index)) {
      return false;
    }
    logIndex = index;
    chunkCache.clear();
    smoothedCache.clear();
    iframeDirectory = logIndexes.getIntraframeDirectory(index);
    parser.parseHeader(
      logIndexes.getLogBeginOffset(index),
      logIndexes.getLogBeginOffset(index + 1)
    );
    switch (this.getSysConfig().firmwareType) {
      case FIRMWARE_TYPE_BETAFLIGHT:
      case FIRMWARE_TYPE_INAV:
        $(".open-header-dialog").show();
        break;
      default:
        $(".open-header-dialog").hide();
        break;
    }
    buildFieldNames();
    estimateNumMotors();
    estimateNumCells();
    return true;
  };
  this.hasGpsData = function() {
    return this.getStats()?.frame?.G ? true : false;
  };
  this.getMinMaxForFieldDuringAllTime = function(field_name) {
    let stats = this.getStats(), min = Number.MAX_VALUE, max = -Number.MAX_VALUE;
    let fieldIndex = this.getMainFieldIndexByName(field_name), fieldStat = fieldIndex !== void 0 ? stats.field[fieldIndex] : false;
    if (fieldStat) {
      min = Math.min(min, fieldStat.min);
      max = Math.max(max, fieldStat.max);
    } else {
      const mm = this.getMinMaxForFieldDuringTimeInterval(
        field_name,
        this.getMinTime(),
        this.getMaxTime()
      );
      if (mm !== void 0) {
        min = Math.min(mm.min, min);
        max = Math.max(mm.max, max);
      }
    }
    return { min, max };
  };
  this.getMinMaxForFieldDuringTimeInterval = function(field_name, start_time, end_time) {
    let chunks = this.getSmoothedChunksInTimeRange(start_time, end_time);
    let startFrameIndex;
    let minValue = Number.MAX_VALUE, maxValue = -Number.MAX_VALUE;
    const fieldIndex = this.getMainFieldIndexByName(field_name);
    if (chunks.length == 0 || fieldIndex == void 0) return void 0;
    for (startFrameIndex = 0; startFrameIndex < chunks[0].frames.length; startFrameIndex++) {
      if (chunks[0].frames[startFrameIndex][FlightLogParser.prototype.FLIGHT_LOG_FIELD_INDEX_TIME] >= start_time) {
        break;
      }
    }
    if (startFrameIndex > 0) startFrameIndex--;
    let frameIndex = startFrameIndex;
    findingLoop: for (let chunkIndex = 0; chunkIndex < chunks.length; chunkIndex++) {
      const chunk = chunks[chunkIndex];
      for (; frameIndex < chunk.frames.length; frameIndex++) {
        const fieldValue = chunk.frames[frameIndex][fieldIndex];
        const frameTime = chunk.frames[frameIndex][FlightLogParser.prototype.FLIGHT_LOG_FIELD_INDEX_TIME];
        minValue = Math.min(minValue, fieldValue);
        maxValue = Math.max(maxValue, fieldValue);
        if (frameTime > end_time) break findingLoop;
      }
      frameIndex = 0;
    }
    return {
      min: minValue,
      max: maxValue
    };
  };
  this.getCurrentLogRowsCount = function() {
    const stats = this.getStats(this.getLogIndex());
    return stats.frame["I"].validCount + stats.frame["P"].validCount;
  };
}
var init_flightlog = __esm({
  "src/flightlog.js"() {
    init_flightlog_index();
    init_flightlog_parser();
    init_gps_transform();
    init_flightlog_fielddefs();
    init_imu();
    init_cache();
    init_tools();
    FlightLog.prototype.accRawToGs = function(value) {
      return value / this.getSysConfig().acc_1G;
    };
    FlightLog.prototype.gyroRawToDegreesPerSecond = function(value) {
      return this.getSysConfig().gyroScale * 1e6 / (Math.PI / 180) * value;
    };
    FlightLog.prototype.rcCommandRawToDegreesPerSecond = function(value, axis, currentFlightMode) {
      let sysConfig = this.getSysConfig();
      if (firmwareGreaterOrEqual(sysConfig, "3.0.0", "2.0.0")) {
        const RC_RATE_INCREMENTAL = 14.54;
        const RC_EXPO_POWER = 3;
        let rcInput;
        var that = this;
        let calculateSetpointRate = function(axis2, rc) {
          let rcCommandf = rc / 500;
          let rcCommandfAbs = Math.abs(rcCommandf);
          if (sysConfig["rc_expo"][axis2]) {
            let expof = sysConfig["rc_expo"][axis2] / 100;
            rcCommandf = rcCommandf * Math.pow(rcCommandfAbs, RC_EXPO_POWER) * expof + rcCommandf * (1 - expof);
          }
          let rcRate = sysConfig["rc_rates"][axis2] / 100;
          if (rcRate > 2) {
            rcRate += RC_RATE_INCREMENTAL * (rcRate - 2);
          }
          let angleRate = 200 * rcRate * rcCommandf;
          if (sysConfig.rates[axis2]) {
            let rcSuperfactor = 1 / constrain(
              1 - rcCommandfAbs * (sysConfig.rates[axis2] / 100),
              0.01,
              1
            );
            angleRate *= rcSuperfactor;
          }
          let limit = sysConfig["rate_limits"][axis2];
          if (sysConfig.pidController == 0 || limit == null) {
            return constrain(angleRate * 4.1, -8190, 8190) >> 2;
          } else {
            return constrain(angleRate, -1 * limit, limit);
          }
        };
        return calculateSetpointRate(axis, value);
      } else if (firmwareGreaterOrEqual(sysConfig, "2.8.0")) {
        var that = this;
        let isSuperExpoActive = function() {
          let FEATURE_SUPEREXPO_RATES = 1 << 23;
          return sysConfig.features & FEATURE_SUPEREXPO_RATES;
        };
        let calculateRate = function(value2, axis2) {
          let angleRate;
          if (isSuperExpoActive()) {
            let rcFactor = axis2 === AXIS.YAW ? Math.abs(value2) / (500 * (validate(sysConfig.rc_rates[2], 100) / 100)) : Math.abs(value2) / (500 * (validate(sysConfig.rc_rates[0], 100) / 100));
            rcFactor = 1 / constrain(
              1 - rcFactor * (validate(sysConfig.rates[axis2], 100) / 100),
              0.01,
              1
            );
            angleRate = rcFactor * (27 * value2 / 16);
          } else {
            angleRate = (validate(sysConfig.rates[axis2], 100) + 27) * value2 / 16;
          }
          return constrain(angleRate, -8190, 8190);
        };
        return calculateRate(value, axis) >> 2;
      } else {
        var that = this;
        let calculateExpoPlus = function(value2, axis2) {
          let propFactor;
          let superExpoFactor2;
          if (axis2 == AXIS.YAW && !that.getSysConfig().superExpoYawMode) {
            propFactor = 1;
          } else {
            superExpoFactor2 = axis2 == AXIS.YAW ? that.getSysConfig().superExpoFactorYaw : that.getSysConfig().superExpoFactor;
            propFactor = 1 - superExpoFactor2 / 100 * (Math.abs(value2) / 500);
          }
          return propFactor;
        };
        let superExpoFactor = 1 / calculateExpoPlus(value, axis);
        if (axis === AXIS.YAW) {
          if (sysConfig.superExpoYawMode == SUPER_EXPO_YAW.ON && currentFlightMode == null)
            superExpoFactor = 1;
          if (sysConfig.superExpoYawMode == SUPER_EXPO_YAW.ALWAYS || sysConfig.superExpoYawMode == SUPER_EXPO_YAW.ON && this.getFlightMode(currentFlightMode).SuperExpo) {
            return superExpoFactor * ((sysConfig.rates[AXIS.YAW] + 47) * value) >> 7;
          } else {
            return (sysConfig.rates[AXIS.YAW] + 47) * value >> 7;
          }
        } else {
          if (currentFlightMode == null) superExpoFactor = 1;
          return superExpoFactor * (((axis === AXIS.ROLL ? sysConfig.rates[AXIS.ROLL] : sysConfig.rates[AXIS.PITCH]) + 27) * value) >> 6;
        }
      }
    };
    FlightLog.prototype.rcCommandRawToThrottle = function(value) {
      return Math.min(
        Math.max(
          (value - this.getSysConfig().minthrottle) / (this.getSysConfig().maxthrottle - this.getSysConfig().minthrottle) * 100,
          0
        ),
        100
      );
    };
    FlightLog.prototype.ThrottleTorcCommandRaw = function(value) {
      return value / 100 * (this.getSysConfig().maxthrottle - this.getSysConfig().minthrottle) + this.getSysConfig().minthrottle;
    };
    FlightLog.prototype.rcMotorRawToPctPhysical = function(value) {
      let motorPct;
      if (this.isDigitalProtocol()) {
        motorPct = (value - DSHOT_MIN_VALUE) / DSHOT_RANGE * 100;
      } else {
        const MAX_ANALOG_VALUE = this.getSysConfig().maxthrottle;
        const MIN_ANALOG_VALUE = this.getSysConfig().minthrottle;
        const ANALOG_RANGE = MAX_ANALOG_VALUE - MIN_ANALOG_VALUE;
        motorPct = (value - MIN_ANALOG_VALUE) / ANALOG_RANGE * 100;
      }
      return Math.min(Math.max(motorPct, 0), 100);
    };
    FlightLog.prototype.PctPhysicalTorcMotorRaw = function(value) {
      let motorRaw;
      if (this.isDigitalProtocol()) {
        motorRaw = value / 100 * DSHOT_RANGE + DSHOT_MIN_VALUE;
      } else {
        const MAX_ANALOG_VALUE = this.getSysConfig().maxthrottle;
        const MIN_ANALOG_VALUE = this.getSysConfig().minthrottle;
        const ANALOG_RANGE = MAX_ANALOG_VALUE - MIN_ANALOG_VALUE;
        motorRaw = value / 100 * ANALOG_RANGE + MIN_ANALOG_VALUE;
      }
      return motorRaw;
    };
    FlightLog.prototype.isDigitalProtocol = function() {
      let digitalProtocol;
      switch (FAST_PROTOCOL[this.getSysConfig().fast_pwm_protocol]) {
        case "PWM":
        case "ONESHOT125":
        case "ONESHOT42":
        case "MULTISHOT":
        case "BRUSHED":
          digitalProtocol = false;
          break;
        case "DSHOT150":
        case "DSHOT300":
        case "DSHOT600":
        case "DSHOT1200":
        case "PROSHOT1000":
        default:
          digitalProtocol = true;
          break;
      }
      return digitalProtocol;
    };
    FlightLog.prototype.getPIDPercentage = function(value) {
      return value / 10;
    };
    FlightLog.prototype.getReferenceVoltageMillivolts = function() {
      if (this.getSysConfig().firmwareType == FIRMWARE_TYPE_BETAFLIGHT && semver.gte(this.getSysConfig().firmwareVersion, "4.0.0")) {
        return this.getSysConfig().vbatref * 10;
      } else if (this.getSysConfig().firmwareType == FIRMWARE_TYPE_BETAFLIGHT && semver.gte(this.getSysConfig().firmwareVersion, "3.1.0") || this.getSysConfig().firmwareType == FIRMWARE_TYPE_CLEANFLIGHT && semver.gte(this.getSysConfig().firmwareVersion, "2.0.0")) {
        return this.getSysConfig().vbatref * 100;
      } else {
        return this.vbatADCToMillivolts(this.getSysConfig().vbatref);
      }
    };
    FlightLog.prototype.vbatADCToMillivolts = function(vbatADC) {
      let ADCVREF = 33;
      return vbatADC * ADCVREF * 10 * this.getSysConfig().vbatscale / 4095;
    };
    FlightLog.prototype.amperageADCToMillivolts = function(amperageADC) {
      let ADCVREF = 33, millivolts = amperageADC * ADCVREF * 100 / 4095;
      millivolts -= this.getSysConfig().currentMeterOffset;
      return millivolts * 1e4 / this.getSysConfig().currentMeterScale;
    };
    FlightLog.prototype.getFlightMode = function(currentFlightMode) {
      return {
        Arm: (currentFlightMode & 1 << 0) != 0,
        Angle: (currentFlightMode & 1 << 1) != 0,
        Horizon: (currentFlightMode & 1 << 2) != 0,
        Baro: (currentFlightMode & 1 << 3) != 0,
        AntiGravity: (currentFlightMode & 1 << 4) != 0,
        Headfree: (currentFlightMode & 1 << 5) != 0,
        HeadAdj: (currentFlightMode & 1 << 6) != 0,
        CamStab: (currentFlightMode & 1 << 7) != 0,
        CamTrig: (currentFlightMode & 1 << 8) != 0,
        GPSHome: (currentFlightMode & 1 << 9) != 0,
        GPSHold: (currentFlightMode & 1 << 10) != 0,
        Passthrough: (currentFlightMode & 1 << 11) != 0,
        Beeper: (currentFlightMode & 1 << 12) != 0,
        LEDMax: (currentFlightMode & 1 << 13) != 0,
        LEDLow: (currentFlightMode & 1 << 14) != 0,
        LLights: (currentFlightMode & 1 << 15) != 0,
        Calib: (currentFlightMode & 1 << 16) != 0,
        GOV: (currentFlightMode & 1 << 17) != 0,
        OSD: (currentFlightMode & 1 << 18) != 0,
        Telemetry: (currentFlightMode & 1 << 19) != 0,
        GTune: (currentFlightMode & 1 << 20) != 0,
        Sonar: (currentFlightMode & 1 << 21) != 0,
        Servo1: (currentFlightMode & 1 << 22) != 0,
        Servo2: (currentFlightMode & 1 << 23) != 0,
        Servo3: (currentFlightMode & 1 << 24) != 0,
        Blackbox: (currentFlightMode & 1 << 25) != 0,
        Failsafe: (currentFlightMode & 1 << 26) != 0,
        Airmode: (currentFlightMode & 1 << 27) != 0,
        SuperExpo: (currentFlightMode & 1 << 28) != 0,
        _3DDisableSwitch: (currentFlightMode & 1 << 29) != 0,
        CheckboxItemCount: (currentFlightMode & 1 << 30) != 0
      };
    };
    FlightLog.prototype.getFeatures = function(enabledFeatures) {
      return {
        RX_PPM: (enabledFeatures & 1 << 0) != 0,
        VBAT: (enabledFeatures & 1 << 1) != 0,
        INFLIGHT_ACC_CAL: (enabledFeatures & 1 << 2) != 0,
        RX_SERIAL: (enabledFeatures & 1 << 3) != 0,
        MOTOR_STOP: (enabledFeatures & 1 << 4) != 0,
        SERVO_TILT: (enabledFeatures & 1 << 5) != 0,
        SOFTSERIAL: (enabledFeatures & 1 << 6) != 0,
        GPS: (enabledFeatures & 1 << 7) != 0,
        FAILSAFE: (enabledFeatures & 1 << 8) != 0,
        SONAR: (enabledFeatures & 1 << 9) != 0,
        TELEMETRY: (enabledFeatures & 1 << 10) != 0,
        CURRENT_METER: (enabledFeatures & 1 << 11) != 0,
        _3D: (enabledFeatures & 1 << 12) != 0,
        RX_PARALLEL_PWM: (enabledFeatures & 1 << 13) != 0,
        RX_MSP: (enabledFeatures & 1 << 14) != 0,
        RSSI_ADC: (enabledFeatures & 1 << 15) != 0,
        LED_STRIP: (enabledFeatures & 1 << 16) != 0,
        DISPLAY: (enabledFeatures & 1 << 17) != 0,
        ONESHOT125: (enabledFeatures & 1 << 18) != 0,
        BLACKBOX: (enabledFeatures & 1 << 19) != 0,
        CHANNEL_FORWARDING: (enabledFeatures & 1 << 20) != 0,
        TRANSPONDER: (enabledFeatures & 1 << 21) != 0,
        AIRMODE: (enabledFeatures & 1 << 22) != 0,
        SUPEREXPO_RATES: (enabledFeatures & 1 << 23) != 0,
        ANTI_GRAVITY: (enabledFeatures & 1 << 24) != 0
      };
    };
    FlightLog.prototype.isFieldDisabled = function() {
      const disabledFields = this.getSysConfig().fields_disabled_mask;
      const disabledFieldsFlags = {
        PID: (disabledFields & 1 << 0) !== 0,
        RC_COMMANDS: (disabledFields & 1 << 1) !== 0,
        SETPOINT: (disabledFields & 1 << 2) !== 0,
        BATTERY: (disabledFields & 1 << 3) !== 0,
        MAGNETOMETER: (disabledFields & 1 << 4) !== 0,
        ALTITUDE: (disabledFields & 1 << 5) !== 0,
        RSSI: (disabledFields & 1 << 6) !== 0,
        GYRO: (disabledFields & 1 << 7) !== 0,
        ACC: (disabledFields & 1 << 8) !== 0,
        DEBUG: (disabledFields & 1 << 9) !== 0,
        MOTORS: (disabledFields & 1 << 10) !== 0,
        GPS: (disabledFields & 1 << 11) !== 0,
        RPM: (disabledFields & 1 << 12) !== 0,
        GYROUNFILT: (disabledFields & 1 << 13) !== 0
      };
      if (this.getSysConfig().firmwareType == FIRMWARE_TYPE_BETAFLIGHT && semver.gte(this.getSysConfig().firmwareVersion, "2025.12.0")) {
        disabledFieldsFlags.ATTITUDE = (disabledFields & 1 << 8) !== 0;
        disabledFieldsFlags.ACC = (disabledFields & 1 << 9) !== 0;
        disabledFieldsFlags.DEBUG = (disabledFields & 1 << 10) !== 0;
        disabledFieldsFlags.MOTORS = (disabledFields & 1 << 11) !== 0;
        disabledFieldsFlags.GPS = (disabledFields & 1 << 12) !== 0;
        disabledFieldsFlags.RPM = (disabledFields & 1 << 13) !== 0;
        disabledFieldsFlags.GYROUNFILT = (disabledFields & 1 << 14) !== 0;
        disabledFieldsFlags.SERVO = (disabledFields & 1 << 15) !== 0;
      }
      return disabledFieldsFlags;
    };
  }
});

// cli-convert-cjs-entry.js
var fs = require("fs");
var path = require("path");
global.window = { requestAnimationFrame: (cb) => setTimeout(cb, 16) };
global.document = { createElement: () => ({ getContext: () => null }) };
global.$ = function() {
  return { length: 0, addClass() {
    return this;
  }, removeClass() {
    return this;
  }, toggleClass() {
    return this;
  }, css() {
    return this;
  }, html() {
    return this;
  }, text() {
    return this;
  }, show() {
    return this;
  }, hide() {
    return this;
  }, on() {
    return this;
  }, off() {
    return this;
  } };
};
global.$.extend = Object.assign;
global.semver = {
  gte: (v1, v2) => {
    const p = (v) => v.split(".").map((x) => parseInt(x) || 0);
    const a = p(v1), b = p(v2);
    for (let i = 0; i < 3; i++) {
      if (a[i] > b[i]) return true;
      if (a[i] < b[i]) return false;
    }
    return true;
  },
  lte: (v1, v2) => !global.semver.gt(v1, v2),
  gt: (v1, v2) => {
    const p = (v) => v.split(".").map((x) => parseInt(x) || 0);
    const a = p(v1), b = p(v2);
    for (let i = 0; i < 3; i++) {
      if (a[i] > b[i]) return true;
      if (a[i] < b[i]) return false;
    }
    return false;
  },
  lt: (v1, v2) => !global.semver.gte(v1, v2)
};
var { FlightLog: FlightLog2 } = (init_flightlog(), __toCommonJS(flightlog_exports));
var args = process.argv.slice(2);
if (args.length === 0 || args.includes("--help")) {
  console.log(`
Betaflight Blackbox BBL Converter

Usage: bbl-decode <input.bbl> [output] [--format csv|json] [--split] [--log N]
`);
  process.exit(0);
}
var takeFlag = (name) => {
  const i = args.indexOf(name);
  if (i !== -1) {
    const val = args[i + 1];
    args.splice(i, val ? 2 : 1);
    return val || true;
  }
  return null;
};
var format = (takeFlag("--format") || "csv").toLowerCase();
var splitFlights = Boolean(takeFlag("--split"));
var specificLogRaw = takeFlag("--log");
var specificLog = specificLogRaw != null ? parseInt(specificLogRaw, 10) : null;
if (!["csv", "json"].includes(format)) {
  console.error(`Invalid format '${format}'`);
  process.exit(1);
}
var inputFile = args[0];
if (!inputFile) {
  console.error("Input .bbl file required");
  process.exit(1);
}
if (!fs.existsSync(inputFile)) {
  console.error("Input file not found: " + inputFile);
  process.exit(1);
}
var defaultExt = format === "json" ? ".json" : ".csv";
var outputFile = args[1] || inputFile.replace(/\.bbl$/i, defaultExt);
try {
  const fileData = fs.readFileSync(inputFile);
  const flightLog = new FlightLog2(fileData);
  const logCount = flightLog.getLogCount();
  if (logCount === 0) {
    console.error("No valid logs found");
    process.exit(1);
  }
  let logsToProcess = [];
  if (specificLog != null) {
    if (specificLog < 0 || specificLog >= logCount) {
      console.error("Log index out of range");
      process.exit(1);
    }
    logsToProcess = [specificLog];
  } else if (splitFlights) {
    logsToProcess = Array.from({ length: logCount }, (_, i) => i);
  } else {
    logsToProcess = [0];
  }
  for (const idx of logsToProcess) {
    if (!flightLog.openLog(idx)) {
      console.warn("Failed to open log", idx, flightLog.getLogError(idx));
      continue;
    }
    const fieldNames = flightLog.getMainFieldNames();
    const stats = flightLog.getStats();
    const minTime = flightLog.getMinTime();
    const maxTime = flightLog.getMaxTime();
    let outName = outputFile;
    if (splitFlights && logCount > 1) {
      const base = outputFile.replace(/\.(csv|json)$/i, "");
      const ext = format === "json" ? ".json" : ".csv";
      outName = `${base}-flight${idx + 1}${ext}`;
    }
    if (format === "json") {
      const jsonOut = buildJSON(flightLog, fieldNames, minTime, maxTime, idx, logCount);
      fs.writeFileSync(outName, JSON.stringify(jsonOut, null, 2));
    } else {
      const csvOut = buildCSV(flightLog, fieldNames, minTime, maxTime);
      fs.writeFileSync(outName, csvOut);
    }
    console.log("\u2713 Output", outName);
  }
  console.log("\u2713 Success");
} catch (err) {
  console.error("Conversion failed:", err.message);
  process.exit(1);
}
function buildCSV(flightLog, fieldNames, minTime, maxTime) {
  let csv = fieldNames.map((n) => `"${n}"`).join(",") + "\n";
  const chunks = flightLog.getChunksInTimeRange(minTime, maxTime);
  for (const chunk of chunks) {
    for (const frame of chunk.frames) {
      const cleaned = frame.map((v) => v == null ? "NaN" : v);
      csv += cleaned.join(",") + "\n";
    }
  }
  return csv.trimEnd();
}
function buildJSON(flightLog, fieldNames, minTime, maxTime, logIdx, totalLogs) {
  const out = { fields: fieldNames.map((n, i) => ({ name: n, index: i })), frames: [], meta: { logIndex: logIdx, totalLogs, logNumber: logIdx + 1 } };
  const chunks = flightLog.getChunksInTimeRange(minTime, maxTime);
  for (const chunk of chunks) {
    for (const frame of chunk.frames) {
      out.frames.push(frame.map((v) => v == null ? null : v));
    }
  }
  return out;
}
