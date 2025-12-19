# Xyra Termux WebView App

A professional Android WebView app that loads your Xyra Termux web application from Vercel.

## Quick Start in AIDE
1. Open `AIDE/XyraTermux` folder in AIDE
2. Sync project and wait for dependencies
3. Build → Build APK
4. Install on your Android device (API 21+)

## Features
- ✅ WebView displays remote web content from Vercel
- ✅ JavaScript enabled for full functionality
- ✅ DOM Storage & Database enabled (for Firebase persistence)
- ✅ Back button navigation support
- ✅ Loading screen with animations
- ✅ Responsive design (zoom controls disabled)
- ✅ Camera & Microphone permissions (optional)
- ✅ Dark theme optimized

## Architecture
- **MainActivity.java** - Main WebView activity with proper configuration
- **AndroidManifest.xml** - App permissions and manifest configuration
- **build.gradle** - Gradle build configuration
- **res/layout/loading_screen.xml** - Loading UI
- **res/drawable/** - App icons

## Required Permissions
- `INTERNET` - Access web content
- `ACCESS_NETWORK_STATE` - Check network connectivity

## Optional Permissions
- `CAMERA` - For video features
- `RECORD_AUDIO` - For voice features

## Supported Devices
- Minimum SDK: Android 5.0 (API 21)
- Target SDK: Android 14 (API 34)
- Best experience on Android 7.0+

## Build Instructions
1. Install AIDE on your Android device
2. Import the `Android/AIDE/XyraTermux` folder
3. Wait for Gradle sync
4. Select Build → Build APK
5. Install the generated APK on your device

## Troubleshooting
- **WebView not loading**: Check internet connection and verify Vercel URL is correct
- **Firebase not working**: Ensure authorized domains include Android app
- **Slow performance**: Clear app cache or rebuild APK
- **Back button issues**: Already handled - press back to navigate history or exit app

## Version Info
- App Version: 1.0
- Build Version: 1
- Target API: 34
