declare module 'cordova-plugin-camera-preview' {
  type CameraPreviewErrorHandler = (err: any) => any;
  type CameraPreviewSuccessHandler = (data: any) => any;

  type CameraPreviewCameraDirection = 'back'|'front';
  type CameraPreviewColorEffect = 'aqua'|'blackboard'|'mono'|'negative'|'none'|'posterize'|'sepia'|'solarize'|'whiteboard';
  type CameraPreviewExposureMode = 'lock'|'auto'|'continuous'|'custom';
  type CameraPreviewFlashMode = 'off'|'on'|'auto'|'red-eye'|'torch';
  type CameraPreviewFocusMode = 'fixed'|'auto'|'continuous'|'continuous-picture'|'continuous-video'|'edof'|'infinity'|'macro';
  type CameraPreviewWhiteBalanceMode = 'lock'|'auto'|'continuous'|'incandescent'|'cloudy-daylight'|'daylight'|'fluorescent'|'shade'|'twilight'|'warm-fluorescent';

  interface CameraPreviewCameraDirectionOption {
    cameraDirection?: CameraPreviewCameraDirection|string;
  }

  interface CameraPreviewStartCameraOptions {
    alpha?: number;
    camera?: CameraPreviewCameraDirection|string;
    height?: number;
    previewDrag?: boolean;
    tapFocus?: boolean;
    tapPhoto?: boolean;
    toBack?: boolean;
    width?: number;
    x?: number;
    y?: number;
    disableExifHeaderStripping?: boolean;
    storeToFile?: boolean;
  }

  interface CameraPreviewTakePictureOptions {
    cameraDirection?: CameraPreviewCameraDirection|string;
    height?: number;
    quality?: number;
    width?: number;
  }

  interface CameraPreviewTakeSnapshotOptions {
    cameraDirection?: CameraPreviewCameraDirection|string;
    quality?: number;
  }

  interface CameraPreviewStartRecordVideoOptions {
    cameraDirection?: CameraPreviewCameraDirection|string;
    width?: number;
    height?: number;
    quality?: number;
    withFlash?: boolean;
  }

  interface CameraPreviewPreviewSizeDimension {
    height?: number;
    width?: number;
  }

  interface CameraPreview {
    startCamera(options?: CameraPreviewStartCameraOptions, onSuccess?: CameraPreviewSuccessHandler, onError?: CameraPreviewErrorHandler): void;
    stopCamera(options?: CameraPreviewCameraDirectionOption, onSuccess?: CameraPreviewSuccessHandler, onError?: CameraPreviewErrorHandler): void;
    switchCamera(options?: CameraPreviewCameraDirectionOption, onSuccess?: CameraPreviewSuccessHandler, onError?: CameraPreviewErrorHandler): void;
    hide(options?: CameraPreviewCameraDirectionOption, onSuccess?: CameraPreviewSuccessHandler, onError?: CameraPreviewErrorHandler): void;
    show(options?: CameraPreviewCameraDirectionOption, onSuccess?: CameraPreviewSuccessHandler, onError?: CameraPreviewErrorHandler): void;
    takePicture(options?: CameraPreviewTakePictureOptions|CameraPreviewSuccessHandler, onSuccess?: CameraPreviewSuccessHandler|CameraPreviewErrorHandler, onError?: CameraPreviewErrorHandler): void;
    takeSnapshot(options?: CameraPreviewTakeSnapshotOptions|CameraPreviewSuccessHandler, onSuccess?: CameraPreviewSuccessHandler|CameraPreviewErrorHandler, onError?: CameraPreviewErrorHandler): void;
    setColorEffect(cameraDirection?:CameraPreviewCameraDirection|string, effect: CameraPreviewColorEffect|string, onSuccess?: CameraPreviewSuccessHandler, onError?: CameraPreviewErrorHandler): void;
    setZoom(cameraDirection?:CameraPreviewCameraDirection|string, zoom?: number, onSuccess?: CameraPreviewSuccessHandler, onError?: CameraPreviewErrorHandler): void;
    startRecordVideo(options?:CameraPreviewStartRecordVideoOptions|CameraPreviewSuccessHandler, onSuccess?:CameraPreviewSuccessHandler|CameraPreviewErrorHandler, onError?:CameraPreviewErrorHandler):void;
    stopRecordVideo(options?: CameraPreviewCameraDirectionOption|CameraPreviewSuccessHandler, onSuccess?:CameraPreviewSuccessHandler|CameraPreviewErrorHandler, onError?:CameraPreviewErrorHandler):void;
    getMaxZoom(options?: CameraPreviewCameraDirectionOption, onSuccess?: CameraPreviewSuccessHandler, onError?: CameraPreviewErrorHandler): void;
    getSupportedFocusMode(onSuccess?: CameraPreviewSuccessHandler, onError?: CameraPreviewErrorHandler): void;
    getZoom(options?: CameraPreviewCameraDirectionOption, onSuccess?: CameraPreviewSuccessHandler, onError?: CameraPreviewErrorHandler): void;
    getHorizontalFOV(options?: CameraPreviewCameraDirectionOption, onSuccess?: CameraPreviewSuccessHandler, onError?: CameraPreviewErrorHandler): void;
    setPreviewSize(cameraDirection?: CameraPreviewCameraDirection|string, dimensions?: CameraPreviewPreviewSizeDimension|string, onSuccess?: CameraPreviewSuccessHandler, onError?: CameraPreviewErrorHandler): void;
    getSupportedPictureSizes(options?: CameraPreviewCameraDirectionOption, onSuccess?: CameraPreviewSuccessHandler, onError?: CameraPreviewErrorHandler): void;
    getSupportedFlashModes(options?: CameraPreviewCameraDirectionOption, onSuccess?: CameraPreviewSuccessHandler, onError?: CameraPreviewErrorHandler): void;
    getSupportedColorEffects(options?: CameraPreviewCameraDirectionOption, onSuccess?: CameraPreviewSuccessHandler, onError?: CameraPreviewErrorHandler): void;
    setFlashMode(cameraDirection?: CameraPreviewCameraDirection|string, flashMode: CameraPreviewFlashMode|string, onSuccess?: CameraPreviewSuccessHandler, onError?: CameraPreviewErrorHandler): void;
    getSupportedFocusModes(options?: CameraPreviewCameraDirectionOption, onSuccess?: CameraPreviewSuccessHandler, onError?: CameraPreviewErrorHandler): void;
    getFocusMode(options?: CameraPreviewCameraDirectionOption, onSuccess?: CameraPreviewSuccessHandler, onError?: CameraPreviewErrorHandler): void;
    setFocusMode(cameraDirection?: CameraPreviewCameraDirection|string, focusMode?: CameraPreviewFocusMode|string, onSuccess?: CameraPreviewSuccessHandler, onError?: CameraPreviewErrorHandler): void;
    tapToFocus(cameraDirection?:CameraPreviewCameraDirection|string, xPoint?: number, yPoint?: number, onSuccess?: CameraPreviewSuccessHandler, onError?: CameraPreviewErrorHandler): void;
    getExposureModes(options?: CameraPreviewCameraDirectionOption, onSuccess?: CameraPreviewSuccessHandler, onError?: CameraPreviewErrorHandler): void;
    getExposureMode(options?: CameraPreviewCameraDirectionOption, onSuccess?: CameraPreviewSuccessHandler, onError?: CameraPreviewErrorHandler): void;
    setExposureMode(cameraDirection?: CameraPreviewCameraDirection|string, exposureMode?: CameraPreviewExposureMode, onSuccess?: CameraPreviewSuccessHandler, onError?: CameraPreviewErrorHandler): void;
    getExposureCompensation(options?: CameraPreviewCameraDirectionOption, onSuccess?: CameraPreviewSuccessHandler, onError?: CameraPreviewErrorHandler): void;
    setExposureCompensation(cameraDirection?: CameraPreviewCameraDirection|string, exposureCompensation?: number, onSuccess?: CameraPreviewSuccessHandler, onError?: CameraPreviewErrorHandler): void;
    getExposureCompensationRange(options?: CameraPreviewCameraDirectionOption, onSuccess?: CameraPreviewSuccessHandler, onError?: CameraPreviewErrorHandler): void;
    getSupportedWhiteBalanceModes(options?: CameraPreviewCameraDirectionOption, onSuccess?: CameraPreviewSuccessHandler, onError?: CameraPreviewErrorHandler): void;
    getSupportedWhiteBalanceMode(onSuccess?: CameraPreviewSuccessHandler, onError?: CameraPreviewErrorHandler): void;
    setWhiteBalanceMode(cameraDirection?: CameraPreviewCameraDirection|string, whiteBalanceMode?: CameraPreviewWhiteBalanceMode|string, onSuccess?: CameraPreviewSuccessHandler, onError?: CameraPreviewErrorHandler): void;
    onBackButton(onSuccess?: CameraPreviewSuccessHandler, onError?: CameraPreviewErrorHandler): void;
    getBlob(path: string, onSuccess?: CameraPreviewSuccessHandler, onError?: CameraPreviewErrorHandler): void;
    getCameraCharacteristics(options?: CameraPreviewCameraDirectionOption, onSuccess?: CameraPreviewSuccessHandler, onError?: CameraPreviewErrorHandler): void;
  }

  interface CameraPreviewManager {
    createCameraPreview(): CameraPreview;
  }
}
