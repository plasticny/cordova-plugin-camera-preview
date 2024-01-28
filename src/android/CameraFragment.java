package com.cordovaplugincamerapreview;

import android.app.FragmentManager;
import android.app.FragmentTransaction;
import android.util.Log;
import android.util.DisplayMetrics;
import android.util.TypedValue;
import android.hardware.Camera;
import android.view.View;
import android.view.ViewGroup;
import android.view.ViewParent;
import android.widget.FrameLayout;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;

import java.io.File;
import java.util.concurrent.ThreadLocalRandom;

public class CameraFragment implements CameraActivity.CameraPreviewListener {
  protected static int nextContainerViewId = ThreadLocalRandom.current().nextInt(20, 100 + 1);
  private static final String TAG = "Camera";

  private CordovaInterface cordova;
  private CordovaWebView webView;
  private ViewParent webViewParent;

  private CameraActivity fragment;
  private CallbackContext takePictureCallbackContext;
  private CallbackContext takeSnapshotCallbackContext;
  private CallbackContext startRecordVideoCallbackContext;
  private CallbackContext stopRecordVideoCallbackContext;
  private CallbackContext setFocusCallbackContext;
  private CallbackContext startCameraCallbackContext;
  private CallbackContext tapBackButtonContext;

  private int containerViewId;

  public CameraFragment(CordovaInterface ci, CordovaWebView cwv) {
    cordova = ci;
    webView = cwv;
    containerViewId = nextContainerViewId++;
  }

  public boolean hasView () {
    return fragment != null;
  }

  public Camera getCamera () {
    return fragment.getCamera();
  }

  public boolean startCamera (
    int x, int y, int width, int height,
    String defaultCamera,
    Boolean tapToTakePicture, Boolean dragEnabled, final Boolean toBack,
    String alpha,
    boolean tapFocus, boolean disableExifHeaderStripping, boolean storeToFile,
    CallbackContext callbackContext
  ) {
    fragment = new CameraActivity();
    fragment.setEventListener(this);
    fragment.defaultCamera = defaultCamera;
    fragment.tapToTakePicture = tapToTakePicture;
    fragment.dragEnabled = dragEnabled;
    fragment.tapToFocus = tapFocus;
    fragment.disableExifHeaderStripping = disableExifHeaderStripping;
    fragment.storeToFile = storeToFile;
    fragment.toBack = toBack;

    DisplayMetrics metrics = cordova.getActivity().getResources().getDisplayMetrics();

    // offset
    int computedX = (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, x, metrics);
    int computedY = (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, y, metrics);

    // size
    int computedWidth = (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, width, metrics);
    int computedHeight = (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, height, metrics);

    fragment.setRect(computedX, computedY, computedWidth, computedHeight);

    startCameraCallbackContext = callbackContext;

    cordova.getActivity().runOnUiThread(new Runnable() {
      @Override
      public void run() {

        //create or update the layout params for the container view
        FrameLayout containerView = (FrameLayout)cordova.getActivity().findViewById(containerViewId);
        if(containerView == null){
          containerView = new FrameLayout(cordova.getActivity().getApplicationContext());
          containerView.setId(containerViewId);

          FrameLayout.LayoutParams containerLayoutParams = new FrameLayout.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT, FrameLayout.LayoutParams.MATCH_PARENT);
          cordova.getActivity().addContentView(containerView, containerLayoutParams);
        }

        //display camera below the webview
        if(toBack){
          View view = webView.getView();
          ViewParent rootParent = containerView.getParent();
          ViewParent curParent = view.getParent();

          view.setBackgroundColor(0x00000000);

          // If parents do not match look for.
          if(curParent.getParent() != rootParent) {
            while(curParent != null && curParent.getParent() != rootParent) {
              curParent = curParent.getParent();
            }

            if(curParent != null) {
              ((ViewGroup)curParent).setBackgroundColor(0x00000000);
              ((ViewGroup)curParent).bringToFront();
            } else {
              // Do default...
              curParent = view.getParent();
              webViewParent = curParent;
              ((ViewGroup)view).bringToFront();
            }
          }else{
            // Default
            webViewParent = curParent;
            rootParent.bringChildToFront(((View) webViewParent));
          }

        }else{
          //set camera back to front
          final float opacity = Float.parseFloat(alpha);
          containerView.setAlpha(opacity);
          containerView.bringToFront();
        }

        //add the fragment to the container
        FragmentManager fragmentManager = cordova.getActivity().getFragmentManager();
        FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
        fragmentTransaction.add(containerView.getId(), fragment);
        fragmentTransaction.commit();
      }
    });

    return true;
  }

  public boolean startRecordVideo(final int width, final int height, final int quality, final boolean withFlash, CallbackContext callbackContext) {
    final String filename = String.format("$s_videoTmp", fragment.defaultCamera);
    startRecordVideoCallbackContext = callbackContext;
     cordova.getThreadPool().execute(new Runnable() {
      @Override
      public void run() {
        fragment.startRecord(getFilePath(filename), fragment.defaultCamera, width, height, quality, withFlash);
      }
    });
    return true;
  }

  public boolean stopRecordVideo(CallbackContext callbackContext) {
    stopRecordVideoCallbackContext = callbackContext;

    cordova.getThreadPool().execute(new Runnable() {
      @Override
      public void run() {
        fragment.stopRecord();
      }
    });

    return true;
  }

  private String getFilePath(String filename) {
    String videoFilePath = cordova.getActivity().getCacheDir().toString() + "/";
    String fileName = filename;
    String videoFileExtension = ".mp4";

    int i = 1;

    while (new File(videoFilePath + fileName + videoFileExtension).exists()) {
      // Add number suffix if file exists
      fileName = filename + '_' + i;
      i++;
    }

    return videoFilePath + fileName + videoFileExtension;
  }

  /* ======== Camera activity listeners ======== */
  public void onPictureTaken(String originalPicture) {};
  public void onPictureTakenError(String message) {};
  public void onSnapshotTaken(String originalPicture) {};
  public void onSnapshotTakenError(String message) {};
  public void onFocusSet(int pointX, int pointY) {};
  public void onFocusSetError(String message) {};
  public void onBackButton() {};

  public void onCameraStarted() {
    Log.d(TAG, "Camera started");

    PluginResult pluginResult = new PluginResult(PluginResult.Status.OK, "Camera started");
    pluginResult.setKeepCallback(false);
    startCameraCallbackContext.sendPluginResult(pluginResult);

  }

  public void onStartRecordVideo() {
    Log.d(TAG, "onStartRecordVideo started");

    PluginResult pluginResult = new PluginResult(PluginResult.Status.OK);
    pluginResult.setKeepCallback(true);

    startRecordVideoCallbackContext.sendPluginResult(pluginResult);
  }

  public void onStartRecordVideoError(String message) {
    Log.d(TAG, "CameraPreview onStartRecordVideo");

    startRecordVideoCallbackContext.error(message);
  }

  public void onStopRecordVideo(String file) {
    Log.d(TAG, "onStopRecordVideo success");

    PluginResult result = new PluginResult(PluginResult.Status.OK, file);
    result.setKeepCallback(true);

    stopRecordVideoCallbackContext.sendPluginResult(result);
  };

  public void onStopRecordVideoError(String error) {
    Log.d(TAG, "onStopRecordVideo error");

    stopRecordVideoCallbackContext.error(error);
  };
  /* ======== Camera activity listeners ======== */
}