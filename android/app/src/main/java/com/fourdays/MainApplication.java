package com.fourdays;

import android.support.multidex.MultiDexApplication;
import cl.json.ShareApplication;
import com.facebook.react.ReactApplication;
import cl.json.RNSharePackage;
import com.reactcommunity.rnlocalize.RNLocalizePackage;
import com.christopherdro.htmltopdf.RNHTMLtoPDFPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends MultiDexApplication implements ReactApplication,
    ShareApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.asList(
          new MainReactPackage(),
            new RNSharePackage(),
            new RNLocalizePackage(),
            new RNHTMLtoPDFPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }

  @Override public String getFileProviderAuthority() {
    return BuildConfig.APPLICATION_ID + ".provider";
  }
}
