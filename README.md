# Four Days

Code for the Four Days application

## Building the project

1. First run `yarn install`
   1. If you find any error applying patches, just apply them manually

## Building for Android

## Building for iOS

1. Install [Cocoapods](https://cocoapods.org/).
2. Run `pod install` from the `./ios` directory.

React Native and iOS don't play well together.

Problems I found multiple times and their potential solutions:

### glog/logging not found

This is probably because glog, a third party library used by react native, hasn't been compiled correctly.

Go to `node_modules/react-native`
Try running `scripts/ios-install-third-party.sh` to download the four or so libs react native uses.
Go to `third-party/glog-0.3.5`
Run `./configure && make && make install`

References:

- https://github.com/facebook/react-native/issues/22703
- https://github.com/facebook/react-native/issues/23944
