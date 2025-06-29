# Google Sign-In Setup Guide for Nirva App

This guide will help you configure Google Sign-In for both Android and iOS platforms.

## Prerequisites

1. Google Cloud Console account
2. Firebase project (recommended)
3. React Native development environment

## Step 1: Google Cloud Console Setup

### 1.1 Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Sign-In API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sign-In API"
   - Click "Enable"

### 1.2 Configure OAuth Consent Screen

1. Go to "APIs & Services" > "OAuth consent screen"
2. Choose "External" user type
3. Fill in the required information:
   - App name: "Nirva"
   - User support email: Your email
   - Developer contact information: Your email
4. Add scopes:
   - `email`
   - `profile`
   - `openid`
5. Add test users (your email addresses)

### 1.3 Create OAuth 2.0 Credentials

#### For Android:

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Choose "Android" as application type
4. Fill in the details:
   - Package name: `com.nirva` (from your app's package.json)
   - SHA-1 certificate fingerprint: Get this from your keystore
5. Download the `google-services.json` file

#### For iOS:

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Choose "iOS" as application type
4. Fill in the details:
   - Bundle ID: `com.nirva` (from your app's bundle identifier)
5. Download the `GoogleService-Info.plist` file

#### For Web (Required for React Native):

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Choose "Web application" as application type
4. Add authorized JavaScript origins:
   - `http://localhost:8081` (for development)
   - `http://localhost:3000` (if using Expo)
5. Add authorized redirect URIs:
   - `http://localhost:8081` (for development)
   - `http://localhost:3000` (if using Expo)
6. Copy the **Client ID** - you'll need this for the webClientId

## Step 2: Android Configuration

### 2.1 Add google-services.json

1. Place the downloaded `google-services.json` file in:
   ```
   android/app/google-services.json
   ```

### 2.2 Update build.gradle

1. Open `android/build.gradle` and add to the dependencies:

   ```gradle
   classpath 'com.google.gms:google-services:4.3.15'
   ```

2. Open `android/app/build.gradle` and add at the bottom:
   ```gradle
   apply plugin: 'com.google.gms.google-services'
   ```

### 2.3 Get SHA-1 Certificate Fingerprint

Run this command in your project root:

```bash
cd android && ./gradlew signingReport
```

Copy the SHA-1 from the debug variant and add it to your Google Cloud Console OAuth credentials.

## Step 3: iOS Configuration

### 3.1 Add GoogleService-Info.plist

1. Place the downloaded `GoogleService-Info.plist` file in:

   ```
   ios/GoogleService-Info.plist
   ```

2. Add it to your Xcode project:
   - Open `ios/Nirva.xcworkspace` in Xcode
   - Right-click on your project in the navigator
   - Select "Add Files to Nirva"
   - Choose the `GoogleService-Info.plist` file
   - Make sure "Add to target" is checked for your app target

### 3.2 Update Info.plist

Add the following to `ios/Nirva/Info.plist`:

```xml
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLName</key>
    <string>REVERSED_CLIENT_ID</string>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>YOUR_REVERSED_CLIENT_ID</string>
    </array>
  </dict>
</array>
```

Replace `YOUR_REVERSED_CLIENT_ID` with the value from your `GoogleService-Info.plist` file.

## Step 4: Update App Configuration

### 4.1 Update GoogleSignInService.js

1. Open `src/services/GoogleSignInService.js`
2. Replace `YOUR_WEB_CLIENT_ID.apps.googleusercontent.com` with your actual web client ID from Google Cloud Console

### 4.2 Example Configuration:

```javascript
GoogleSignin.configure({
  webClientId: '123456789-abcdefghijklmnop.apps.googleusercontent.com', // Your web client ID
  offlineAccess: true,
  hostedDomain: '',
  forceCodeForRefreshToken: true,
});
```

## Step 5: Testing

### 5.1 Build and Run

1. For Android:

   ```bash
   npx react-native run-android
   ```

2. For iOS:
   ```bash
   npx react-native run-ios
   ```

### 5.2 Test Google Sign-In

1. Open the app
2. Go to the Welcome or Login screen
3. Tap "Continue with Google"
4. Select your Google account
5. Grant permissions

## Troubleshooting

### Common Issues:

1. **"DEVELOPER_ERROR" on Android**

   - Check that your SHA-1 fingerprint is correct
   - Verify the package name matches your app
   - Ensure google-services.json is in the correct location

2. **"Sign-in failed" on iOS**

   - Verify GoogleService-Info.plist is added to your Xcode project
   - Check that the bundle ID matches your app
   - Ensure the REVERSED_CLIENT_ID is correctly added to Info.plist

3. **"Network error"**

   - Check your internet connection
   - Verify the Google Sign-In API is enabled in Google Cloud Console

4. **"Invalid client" error**
   - Double-check your webClientId in GoogleSignInService.js
   - Ensure you're using the web client ID, not the Android/iOS client ID

### Debug Commands:

```bash
# Check Android signing report
cd android && ./gradlew signingReport

# Clean and rebuild
cd android && ./gradlew clean
npx react-native run-android

# For iOS
cd ios && pod install
npx react-native run-ios
```

## Security Notes

1. Never commit your `google-services.json` or `GoogleService-Info.plist` files to public repositories
2. Add them to your `.gitignore` file
3. Use different OAuth client IDs for development and production
4. Regularly rotate your OAuth credentials

## Additional Resources

- [React Native Google Sign-In Documentation](https://github.com/react-native-google-signin/google-signin)
- [Google Sign-In for Android](https://developers.google.com/identity/sign-in/android)
- [Google Sign-In for iOS](https://developers.google.com/identity/sign-in/ios)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
