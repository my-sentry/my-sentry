# My Sentry

There are many moments in our life where we find ourselves in uncomfortable or isolated situations. Such as showing an apartment, going on or even walking home at night. In these moments we are not always able to alert people of our safety. My Sentry allows you to create a safety event that alerts a group of your family, friends or coworkers if you are ever in danger.

## Table Of Contents
1. [Usage](#usage)
1. [Requirements](#requirements)
1. [Setup](#setup)
    1. [Android Studio Setup](#android-studio-setup)
    1. [Installing Android 6.0 Marshmallow](#install-android-marshmallow)
    1. [Environment Setup](#environment-setup)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

To keep your group protected, install the My Sentry app on each member's Android device. Each user should then create an individual user account from the landing page. Once logged in, any user can then create a group and invite all of the other members to join. When a user is associated with at least one group, they are then able to create an event in which they will be in a potentially insecure situation. In the event creation view the user is prompted to supply the event begin and end time, information about the location, and any other details that would be useful in an emergency situation. If the user does not mark themselves safe by the event end time, the users in their group will be alerted to take the appropriate action.

## Requirements

  - Android device for each group member
  - UNIX device for development and server hosting
  - [Google Firebase](http://firebase.google.com) account for push notifications
  - [Android Studio](https://developer.android.com/studio/index.html) for Android emulation
  - [Node.js](http://nodejs.org) v7.9.0 or higher
  - [Watchman](https://facebook.github.io/watchman/) v4.7.0 or higher
  - [Java Runtime Environment](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) v8 or higher
  - [MySQL Server](http://mysql.com) v5.0.0 or higher

## Setup

#### 1. Install Requirements
Install all of the requirements above using the links for installation instructions for your specific device.

Go ahead and fork a copy of this repository and clone it down to a convenient place for you. The command should look something like:
```bash
git clone https://github.com/${your-github-profile}/my-sentry.git
```

Go ahead and install all dependencies for the project using npm. You will also eventually need to have `react-native-cli` installed globally, so go ahead and do that at this point:
```bash
cd my-sentry
npm install -g react-native-cli
npm install
```

#### 2. Database Setup
Once you have installed MySQL, use the [MySQL Command-Line Tool](https://dev.mysql.com/doc/refman/5.5/en/mysql.html) or a graphical tool like [Sequel Pro](http://www.sequelpro.com) to create a database named `mysentry`. If you are using the command line, your SQL command will look like this:
```SQL
CREATE DATABASE mysentry;
```
Install [knex](http://knexjs.org) globally on your machine and use it to populate your database with the schema, and if you wish, seed data:
```bash
npm install -g knex
knex migrate:latest
knex seed:run # optional
```

#### 3. Emulator Set Up
Since My Sentry is built to work on Android devices, you will need to set up an Android Emulator for development. This step is __optional__ if you decide to debug directly on an Android device over USB. If you decide to forgo an emulator, make sure to configure your Android device to [allow USB debugging](https://www.howtogeek.com/129728/how-to-access-the-developer-options-menu-and-enable-usb-debugging-on-android-4.2/) and make sure it is plugged in and unlocked whenever you see a reference to starting the emulator. It is also useful to configure your device to stay awake when in debugging mode to avoid constantly having to unlock.

###### Android Studio Setup
To set up your emulator, open up Android Studio. If this is your first time opening Android Studio, make sure you choose `custom installation` before proceeding through the installer. Use all of the default options as well as making sure all these boxes are checked when they appear on the screen:
  - `Android SDK`
  - `Android SDK Platform`
  - `Performance (Intel ® HAXM)`
  - `Android Virtual Device`

If this is not your first time running Android Studio, make sure HAXM is installed by following [these](https://software.intel.com/en-us/android/articles/installation-instructions-for-intel-hardware-accelerated-execution-manager-windows) instructions.

###### Install Android Marshmallow
React native requires Android 6.0 (Marshmallow) for development, but Android Studio installs 7.0 by default. To make sure you have the correct version, launch the SDK manager by going to `Preferences > Appearance && Behavior > System Settings > Android SDK`. Select `SDK Platforms` from within the manager and check the box next to `Show Package Details` in the bottom right corner. Make sure all of the following items are checked:
  - `Google APIs`
  - `Android SDK Platform 23`
  - `Intel x86 Atom_64 System Image`
  - `Google APIs Intel x86 Atom_64 System Image`

Next, select the `SDK Tools` and check the box next to `Show Package Details`. Look for and expand the `Android SDK Build Tools` and make sure `Android SDK Build-Tools 23.0.1` is selected.

Click `Apply` to install all of the new packages.

Once all packages are installed, open the `AVD Manager` in Android Studio by clicking the button shown below.

![AVD Manager Button](https://facebook.github.io/react-native/img/react-native-tools-avd.png)

Once in the AVD Manager, select your AVD and click `Edit`. Make sure `Android 6.0 - API Level 23` is selected under `Device` and `Intel Atom (x86_64)` under `CPU/ABI`. Make sure to note of the exact name of your AVD. It should be something like `Nexus_5X_API_25_x86`. Click `Okay` and exit the AVD Manager.

###### Environment Setup
To set up your environment, find your shell's environment profile. If you are using a bash shell, this is probably either `~/.profile` or `./bash_profile` depending on if you have a Linux machine or a Mac. After you have found the appropriate file, append the following lines in your text editor of choice:
```bash
export ANDROID_HOME=${HOME}/Library/Android/sdk
export PATH=${PATH}:${ANDROID_HOME}/tools
export PATH=${PATH}:${ANDROID_HOME}/platform-tools
export PATH=${PATH}:${ANDROID_HOME}/tools/bin
alias start-android="cd ${ANDROID_HOME}/tools; ./emulator -avd Nexus_5X_API_25_x86"
```

Make sure that the string following `-avd` on the last line matches exactly the AVD name you noted on the last step.

###### Troubleshooting
For more in depth infromation about how your emulator environment should be set up, go directly to the [React Native Starting Guide](https://facebook.github.io/react-native/docs/getting-started.html)

## Configuration
My Sentry relies on push notifications to effectively alert group members of potentially dangerous situations. For a functional app, you must sign up for the [Google Firebase Service](https://firebase.google.com). Proceed through Google's signup process filling in any relevant information. Don't enter any credit card information or mind anything it says about pricing. The push notification portion of Firebase is 100% free. Once you've created an account, go to your Firebase Console and create a new project. Follow the prompts and fill out all fields as necessary.

Once your project is created, navigate to the `Notifications` tab on the left hand side. Then select the `Android` icon to set up notifications for you android device. You will need to enter the package name for the app, which is `com.mysentry`. On the next step, download the `google-service.json` file and add it to the `android/app/` directory in your project. This file is git ignored and should not be included in any commits. Finally, the third step in setting up your firebase notifications should already be completed for you. Double check this code exists and hit `Continue` to complete the setup.

You will also need to register for a `Google Places API Key` with [Google Places](https://developers.google.com/places/web-service/). Register for a key and keep it in a place where you can come back to it.

For the final configuration, create a file `config/config.js` in your project and fill out all of the configuration variables. A template for this config file exists at `config/config.example.js`. `URL_CONFIG` should contain the address where the My Sentry server will be hosted. The `FCM_CLIENT_KEY` can be found in your Firebase console under `Project Settings > Cloud Messaging > Server Key`. Finally, your `PLACES_API_KEY` is the key that you saved from your Google Places API Key registration. Your config file should look like this at the end:
```javascript
exports.URL_CONFIG = 'http://YOUR_URL_HOST.DOMAIN:PORT';
exports.PLACES_API_KEY = 'YOUR_PLACES_API_KEY';
exports.FCM_CLIENT_KEY = 'YOUR_FCM_SERVER_KEY';
```

## Development And Deployment
The timer service that manages push notifications must be started before your server is started. This process should be started and left open in a terminal window for as long as you want the app to remain online. The service command is run from the root directory as:
```bash
npm run service
```

Once the service is running, you may start the server. In a separate terminal window, run the command:
```bash
npm run server
```

Alternatively, you may want to run these processes with a deployment tool such as [Forever](https://github.com/foreverjs/forever).

Once you have both the service and server running, you may build the client application. First make sure your emulator is running by issuing the command `start-android` in your terminal. Now you can start developing by running `react-native run-android` in the root of your project folder. This will start up a debugger window along with the javascript server and open your development build in your debugging environment.

To make an `APK Build` for production, run the following command from your root project folder:
```bash
cd android/ && ./gradlew assembleRelease
```

The production build will be available at `android/app/build/outputs/apk/app-release.apk`. Distribute this file to each appropriate Android Device for emulation.

## Team
  - __Product Owner:__ Jerry Krusinski - @jkrusinski
  - __Scrum Master:__ Jonathan Granstaff - @jgranny
  - __Development Team Member:__ Cory Grinstead - @universalmind303
  - __Development Team Member:__ Christian Arredondo - @dondo09
