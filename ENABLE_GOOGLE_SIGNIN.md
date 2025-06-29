# Quick Guide: Enable Google Sign-In

## Current Status

✅ Google Sign-In code is implemented and ready
❌ Google Sign-In is temporarily disabled (to allow app to build)

## To Enable Google Sign-In:

### 1. Uncomment the Google Services Plugin

In `android/app/build.gradle`, uncomment this line:

```gradle
apply plugin: 'com.google.gms.google-services'
```

In `android/build.gradle`, uncomment this line:

```gradle
classpath 'com.google.gms:google-services:4.3.15'
```

### 2. Follow the Setup Guide

Complete the setup in `GOOGLE_SIGNIN_SETUP.md`:

- Create Google Cloud project
- Configure OAuth credentials
- Add `google-services.json` to Android
- Add `GoogleService-Info.plist` to iOS

### 3. Update the Web Client ID

In `src/services/GoogleSignInService.js`, replace:

```javascript
const webClientId = 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com';
```

with your actual web client ID from Google Cloud Console.

### 4. Build and Test

```bash
# For Android
npx react-native run-android

# For iOS
npx react-native run-ios
```

## Current Behavior

- App builds and runs successfully
- Google Sign-In button is visible but disabled
- Shows "Google Sign-In not configured yet" message
- Traditional email/password login works
- Skip functionality works

## Benefits of This Approach

- ✅ App can be built and tested immediately
- ✅ Google Sign-In can be enabled later
- ✅ No build errors during development
- ✅ Clear user feedback about configuration status
- ✅ Graceful fallback to traditional login

## When Ready to Enable

1. Follow the setup guide
2. Uncomment the build.gradle lines
3. Add configuration files
4. Update the web client ID
5. Test the Google Sign-In functionality
