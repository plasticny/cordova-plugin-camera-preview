package com.cordovaplugincamerapreview;

import android.app.FragmentManager;
import android.app.FragmentTransaction;
import android.util.DisplayMetrics;
import android.util.TypedValue;
import android.view.View;
import android.view.ViewGroup;
import android.view.ViewParent;
import android.widget.FrameLayout;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.PluginResult;

import java.util.concurrent.ThreadLocalRandom;

public class Camera {
  protected static int nextContainerViewId = ThreadLocalRandom.current().nextInt(20, 100 + 1);

  private CameraActivity fragment;
  private CallbackContext takePictureCallbackContext;
  private CallbackContext takeSnapshotCallbackContext;
  private CallbackContext startRecordVideoCallbackContext;
  private CallbackContext stopRecordVideoCallbackContext;
  private CallbackContext setFocusCallbackContext;
  private CallbackContext startCameraCallbackContext;
  private CallbackContext tapBackButtonContext;

  private ViewParent webViewParent;

  private int containerViewId;

  public Camera(){
    containerViewId = nextContainerViewId++;
  }

  public boolean start (
    int x, int y, int width, int height,
    String defaultCamera,
    Boolean tapToTakePicture, Boolean dragEnabled, Boolean toBack,
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

  public void onCameraStarted() {
    Log.d(TAG, "Camera started");

    PluginResult pluginResult = new PluginResult(PluginResult.Status.OK, "Camera started");
    pluginResult.setKeepCallback(false);
    startCameraCallbackContext.sendPluginResult(pluginResult);
  }
}