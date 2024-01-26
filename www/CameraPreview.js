var argscheck = require('cordova/argscheck'),
    utils = require('cordova/utils'),
    exec = require('cordova/exec');

var PLUGIN_NAME = "CameraPreview";

var CameraPreview = function() {};

function isFunction(obj) {
  return !!(obj && obj.constructor && obj.call && obj.apply);
};

CameraPreview.startCamera = function(options, onSuccess, onError) {
  if (!options) {
    options = {};
  } else if (isFunction(options)) {
    onSuccess = options;
    options = {};
  }

  options.x = options.x || 0;
  options.y = options.y || 0;

  options.width = options.width || window.screen.width;
  options.height = options.height || window.screen.height;

  options.camera = options.camera || CameraPreview.CAMERA_DIRECTION.FRONT;

  if (typeof(options.tapPhoto) === 'undefined') {
    options.tapPhoto = true;
  }

  if (typeof (options.tapFocus) == 'undefined') {
    options.tapFocus = false;
  }

  options.previewDrag = options.previewDrag || false;

  options.toBack = options.toBack || false;

  if (typeof(options.alpha) === 'undefined') {
    options.alpha = 1;
  }

  options.disableExifHeaderStripping = options.disableExifHeaderStripping || false;

  options.storeToFile = options.storeToFile || false;

  exec(onSuccess, onError, PLUGIN_NAME, "startCamera", [
    options.x, 
    options.y, 
    options.width, 
    options.height, 
    options.camera, 
    options.tapPhoto, 
    options.previewDrag, 
    options.toBack, 
    options.alpha, 
    options.tapFocus, 
    options.disableExifHeaderStripping, 
    options.storeToFile
  ]);
};

CameraPreview.stopCamera = function(opts, onSuccess, onError) {
  if (!opts) {
    opts = {};
  } else if (isFunction(opts)) {
    onSuccess = opts;
    opts = {};
  }

  if (!isFunction(onSuccess)) {
    return false;
  }

  exec(onSuccess, onError, PLUGIN_NAME, "stopCamera", [opts.cameraDirection]);
};

CameraPreview.switchCamera = function(opts, onSuccess, onError) {
  if (!opts) {
    opts = {};
  } else if (isFunction(opts)) {
    onSuccess = opts;
    opts = {};
  }

  if (!isFunction(onSuccess)) {
    return false;
  }

  exec(onSuccess, onError, PLUGIN_NAME, "switchCamera", [opts.cameraDirection]);
};

CameraPreview.hide = function(opts, onSuccess, onError) {
  if (!opts) {
    opts = {};
  } else if (isFunction(opts)) {
    onSuccess = opts;
    opts = {};
  }

  if (!isFunction(onSuccess)) {
    return false;
  }

  exec(onSuccess, onError, PLUGIN_NAME, "hideCamera", [opts.cameraDirection]);
};

CameraPreview.show = function(opts, onSuccess, onError) {
  if (!opts) {
    opts = {};
  } else if (isFunction(opts)) {
    onSuccess = opts;
    opts = {};
  }

  if (!isFunction(onSuccess)) {
    return false;
  }

  exec(onSuccess, onError, PLUGIN_NAME, "showCamera", [opts.cameraDirection]);
};

CameraPreview.takeSnapshot = function(opts, onSuccess, onError) {
  if (!opts) {
    opts = {};
  } else if (isFunction(opts)) {
    onSuccess = opts;
    opts = {};
  }

  if (!isFunction(onSuccess)) {
    return false;
  }

  if (!opts.quality || opts.quality > 100 || opts.quality < 0) {
    opts.quality = 85;
  }

  exec(onSuccess, onError, PLUGIN_NAME, "takeSnapshot", [opts.cameraDirection, opts.quality]);
};

CameraPreview.takePicture = function(opts, onSuccess, onError) {
  if (!opts) {
    opts = {};
  } else if (isFunction(opts)) {
    onSuccess = opts;
    opts = {};
  }

  if (!isFunction(onSuccess)) {
    return false;
  }

  opts.width = opts.width || 0;
  opts.height = opts.height || 0;

  if (!opts.quality || opts.quality > 100 || opts.quality < 0) {
    opts.quality = 85;
  }

  exec(onSuccess, onError, PLUGIN_NAME, "takePicture", [opts.cameraDirection, opts.opts.width, opts.height, opts.quality]);
};

CameraPreview.setColorEffect = function(cameraDirection, effect, onSuccess, onError) {
  exec(onSuccess, onError, PLUGIN_NAME, "setColorEffect", [cameraDirection, effect]);
};

CameraPreview.setZoom = function(cameraDirection, zoom, onSuccess, onError) {
  exec(onSuccess, onError, PLUGIN_NAME, "setZoom", [cameraDirection, zoom]);
};

CameraPreview.getMaxZoom = function(opts, onSuccess, onError) {
  exec(onSuccess, onError, PLUGIN_NAME, "getMaxZoom", [opts.cameraDirection]);
};

CameraPreview.getZoom = function(opts, onSuccess, onError) {
  exec(onSuccess, onError, PLUGIN_NAME, "getZoom", [opts.cameraDirection]);
};

CameraPreview.getHorizontalFOV = function(opts, onSuccess, onError) {
  exec(onSuccess, onError, PLUGIN_NAME, "getHorizontalFOV", [opts.cameraDirection]);
};

CameraPreview.setPreviewSize = function(cameraDirection, dimensions, onSuccess, onError) {
  dimensions = dimensions || {};
  dimensions.width = dimensions.width || window.screen.width;
  dimensions.height = dimensions.height || window.screen.height;

  exec(onSuccess, onError, PLUGIN_NAME, "setPreviewSize", [cameraDirection, dimensions.width, dimensions.height]);
};

CameraPreview.getSupportedPictureSizes = function(opts, onSuccess, onError) {
  exec(onSuccess, onError, PLUGIN_NAME, "getSupportedPictureSizes", [opts.cameraDirection]);
};

CameraPreview.getSupportedFlashModes = function(opts, onSuccess, onError) {
  exec(onSuccess, onError, PLUGIN_NAME, "getSupportedFlashModes", [opts.cameraDirection]);
};

CameraPreview.getSupportedColorEffects = function(opts, onSuccess, onError) {
  exec(onSuccess, onError, PLUGIN_NAME, "getSupportedColorEffects", [opts.cameraDirection]);
};

CameraPreview.setFlashMode = function(cameraDirection, flashMode, onSuccess, onError) {
  exec(onSuccess, onError, PLUGIN_NAME, "setFlashMode", [cameraDirection, flashMode]);
};

CameraPreview.getFlashMode = function(opts, onSuccess, onError) {
  exec(onSuccess, onError, PLUGIN_NAME, "getFlashMode", [opts.cameraDirection]);
};

CameraPreview.getSupportedFocusModes = function(opts, onSuccess, onError) {
  exec(onSuccess, onError, PLUGIN_NAME, "getSupportedFocusModes", [opts.cameraDirection]);
};

CameraPreview.getFocusMode = function(opts, onSuccess, onError) {
  exec(onSuccess, onError, PLUGIN_NAME, "getFocusMode", [opts.cameraDirection]);
};

CameraPreview.setFocusMode = function(cameraDirection, focusMode, onSuccess, onError) {
  exec(onSuccess, onError, PLUGIN_NAME, "setFocusMode", [cameraDirection, focusMode]);
};

CameraPreview.tapToFocus = function(cameraDirection, xPoint, yPoint, onSuccess, onError) {
  exec(onSuccess, onError, PLUGIN_NAME, "tapToFocus", [cameraDirection, xPoint, yPoint]);
};

CameraPreview.getExposureModes = function(opts, onSuccess, onError) {
  exec(onSuccess, onError, PLUGIN_NAME, "getExposureModes", [opts.cameraDirection]);
};

CameraPreview.getExposureMode = function(opts, onSuccess, onError) {
  exec(onSuccess, onError, PLUGIN_NAME, "getExposureMode", [opts.cameraDirection]);
};

CameraPreview.setExposureMode = function(cameraDirection, exposureMode, onSuccess, onError) {
  exec(onSuccess, onError, PLUGIN_NAME, "setExposureMode", [cameraDirection, exposureMode]);
};

CameraPreview.getExposureCompensation = function(opts, onSuccess, onError) {
  exec(onSuccess, onError, PLUGIN_NAME, "getExposureCompensation", [opts.cameraDirection]);
};

CameraPreview.setExposureCompensation = function(cameraDirection, exposureCompensation, onSuccess, onError) {
  exec(onSuccess, onError, PLUGIN_NAME, "setExposureCompensation", [cameraDirection, exposureCompensation]);
};

CameraPreview.getExposureCompensationRange = function(opts, onSuccess, onError) {
  exec(onSuccess, onError, PLUGIN_NAME, "getExposureCompensationRange", [opts.cameraDirection]);
};

CameraPreview.getSupportedWhiteBalanceModes = function(opts, onSuccess, onError) {
  exec(onSuccess, onError, PLUGIN_NAME, "getSupportedWhiteBalanceModes", [opts.cameraDirection]);
};

CameraPreview.getWhiteBalanceMode = function(opts, onSuccess, onError) {
  exec(onSuccess, onError, PLUGIN_NAME, "getWhiteBalanceMode", [opts.cameraDirection]);
};

CameraPreview.setWhiteBalanceMode = function(cameraDirection, whiteBalanceMode, onSuccess, onError) {
  exec(onSuccess, onError, PLUGIN_NAME, "setWhiteBalanceMode", [cameraDirection, whiteBalanceMode]);
};

CameraPreview.getCameraCharacteristics = function(opts, onSuccess, onError) {
  exec(onSuccess, onError, PLUGIN_NAME, "getCameraCharacteristics", [opts.cameraDirection]);
};

CameraPreview.onBackButton = function(onSuccess, onError) {
  exec(onSuccess, onError, PLUGIN_NAME, "onBackButton");
};

CameraPreview.getBlob = function (url, onSuccess, onError) {
  var xhr = new XMLHttpRequest
  xhr.onload = function() {
    if (xhr.status != 0 && (xhr.status < 200 || xhr.status >= 300)) {
      if (isFunction(onError)) {
        onError('Local request failed');
      }
      return;
    }
    var blob = new Blob([xhr.response], {type: "image/jpeg"});
    if (isFunction(onSuccess)) {
      onSuccess(blob);
    }
  };
  xhr.onerror = function() {
    if (isFunction(onError)) {
      onError('Local request failed');
    }
  };
  xhr.open('GET', url);
  xhr.responseType = 'arraybuffer';
  xhr.send(null);
};

CameraPreview.startRecordVideo = function (opts, onSuccess, onError) {
  if (!opts) {
    opts = {};
  } else if (isFunction(opts)) {
    onSuccess = opts;
    opts = {};
  }

  if (!isFunction(onSuccess)) {
    return false;
  }

  opts.width = opts.width || 0;
  opts.height = opts.height || 0;

  if (!opts.quality || opts.quality > 100 || opts.quality < 0) {
    opts.quality = 85;
  }

  exec(onSuccess, onError, PLUGIN_NAME, "startRecordVideo", [opts.cameraDirection, opts.width, opts.height, opts.quality, opts.withFlash]);
};

CameraPreview.stopRecordVideo = function (opts, onSuccess, onError) {
  if (!opts) {
    opts = {};
  } else if (isFunction(opts)) {
    onSuccess = opts;
    opts = {};
  }

  if (!isFunction(onSuccess)) {
    return false;
  }

  exec(onSuccess, onError, PLUGIN_NAME, "stopRecordVideo", [opts.cameraDirection]);
};

CameraPreview.FOCUS_MODE = {
  FIXED: 'fixed',
  AUTO: 'auto',
  CONTINUOUS: 'continuous', // IOS Only
  CONTINUOUS_PICTURE: 'continuous-picture', // Android Only
  CONTINUOUS_VIDEO: 'continuous-video', // Android Only
  EDOF: 'edof', // Android Only
  INFINITY: 'infinity', // Android Only
  MACRO: 'macro' // Android Only
};

CameraPreview.EXPOSURE_MODE = {
  LOCK: 'lock',
  AUTO: 'auto', // IOS Only
  CONTINUOUS: 'continuous', // IOS Only
  CUSTOM: 'custom' // IOS Only
};

CameraPreview.WHITE_BALANCE_MODE = {
  LOCK: 'lock',
  AUTO: 'auto',
  CONTINUOUS: 'continuous',
  INCANDESCENT: 'incandescent',
  CLOUDY_DAYLIGHT: 'cloudy-daylight',
  DAYLIGHT: 'daylight',
  FLUORESCENT: 'fluorescent',
  SHADE: 'shade',
  TWILIGHT: 'twilight',
  WARM_FLUORESCENT: 'warm-fluorescent'
};

CameraPreview.FLASH_MODE = {
  OFF: 'off',
  ON: 'on',
  AUTO: 'auto',
  RED_EYE: 'red-eye', // Android Only
  TORCH: 'torch'
};

CameraPreview.COLOR_EFFECT = {
  AQUA: 'aqua', // Android Only
  BLACKBOARD: 'blackboard', // Android Only
  MONO: 'mono',
  NEGATIVE: 'negative',
  NONE: 'none',
  POSTERIZE: 'posterize',
  SEPIA: 'sepia',
  SOLARIZE: 'solarize', // Android Only
  WHITEBOARD: 'whiteboard' // Android Only
};

CameraPreview.CAMERA_DIRECTION = {
  BACK: 'back',
  FRONT: 'front'
};

module.exports = CameraPreview;
