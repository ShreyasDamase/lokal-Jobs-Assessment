# Expo App (Prebuild Setup)

This project was bootstrapped using [`create-expo-app@latest`](https://www.npmjs.com/package/create-expo-app) and transitioned into a **prebuild workflow** using [`npx expo prebuild`](https://docs.expo.dev/workflow/prebuild/).

The `expo prebuild` command generates the native `android/` and `ios/` directories, enabling full access to native code while still using the Expo SDK.  
Learn more about it here: [Prebuild Documentation](https://docs.expo.dev/workflow/prebuild/)

---

## Getting Started

### 1. Install Dependencies

```bash
npm install

2. Run the App

Run on Android:

npm run android

Run on iOS (macOS only):

npm run ios

Run on Web:

npm run web

Start Metro bundler:

npm start


> expo start is useful for launching the Metro bundler, especially for debugging or web preview.




---

Project Structure

This project uses file-based routing via expo-router.

Start development inside the app directory.


---

Reset Project

To reset and start with a clean app/ directory:

npm run reset-project

This moves the current starter code to app-example/ and creates a fresh app/ folder.


---

Resources

Expo Documentation

Prebuild Workflow Guide

Expo Router Docs



---

Community

Expo GitHub

Expo Discord

