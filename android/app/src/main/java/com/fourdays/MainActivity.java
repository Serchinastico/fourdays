package com.fourdays;

import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript.
   * This is used to schedule rendering of the component.
   */
  @Override protected String getMainComponentName() {
    return "fourdays";
  }

  public void sendEvent() {
    WritableMap params = Arguments.createMap();
    params.putString("key", "value");

    getReactNativeHost().getReactInstanceManager()
        .getCurrentReactContext()
        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
        .emit("Hola", params);
  }
}
