# Traverse Native App


## What is it?

The app is built on top of [nativescript](https://www.nativescript.org/). A framework that can compile javascript down to native application bundles.

Currently it supports building android and IOs.

## Nativescript sidekick

You don't need the nativescript side kick to accomplish these tasks but it makes it easier.

https://www.nativescript.org/nativescript-sidekick

This read me assumes you have this. You can also use the nativescript CLI.

# Testing Locally

Not everyone has a mac, but you can test android on any machine.
Ensure the android SDK is installed.

Also ensure you have at least 1 android virtual device. To create one, navigate to the SDK installation inside the avd manager folder and execute the something simliar to this command just changing the target version if necessary:

```
./avdmanager create avd -n nexus6p -k "system-images;android-25;google_apis_playstore;x86" -b x86 -c 2048M -f
```

Start up nativescript side kick and start up your virtual device.

Make sure local and debug are set. Hot module replacement will allow your code changes to be reflected as you develop.

![alt text](https://i.imgur.com/Divxdyr.png "Running on virtual android device")


# How to build

Follow the process to install nativescript via npm

[See the getting started guide](https://www.nativescript.org/getting-started-with-nativescript?utm_medium=website&utm_campaign=useownrealestate&utm_source=nativescriptdotcom&utm_content=homepageherolayergreenbutton)

Once you get that setup and are ready to test out any changes you made the following will show you how to build on each respective devices.

Once you have your changes ready you can build the app for testing on devices.

## Building Android

Open the build tab in nativescript sidekick.

You need the distribution keystore if you want to be able to deploy to the play store. You can create your own, but the play store validates the signature of the app generated using this keystore. Ask a lead developer for this if you need it.

Configure the android certificate to use that keystore.

Set *Build Type* to cloud
Set *configuration* to release.

Click 'Build' and wait for it to finish building. 

This creates an .apk file in the **{repo}/cloud/android/traversemobileapp.apk**

## Publishing to Play Store

Visit: https://play.google.com/apps/publish/?account=7739683345924024659#AppListPlace and click on the Traverse Mobile App

Navigate to 'Release Management' -> 'App Releases'. When you are testing deploy to beta environment in the 'Open Track' section. Traverse allows users to join the Open Beta. It uses the traverse beta environment, which is used for testing purposes.

Upload the APK file from the previous step and submit. Once succesfully uploaded this takes a little to get uploaded. You will not see this immediately, but anyone participating in the open beta should see the release notes when ready. We've seen this take around 30 mins to 1 hour.


## Building iOS

Open the build tab in nativescript sidekick.

developer.apple.com/account/resources/certificates/download/TWZGGX6X67

You need an iOS Distribution certificate. Create a new one.

You also need to create an App Store provisioning profile. Ensure you add the certificate you created above to the profile.

Download both of these and configure them in the iOS builds.

Set *Build Type* to cloud
Set *configuration* to release.

Click 'Build' and wait for it to finish building. 

This creates an .ipa file in the **{repo}/cloud/ios/device/traversemobileapp.ipa**

## Publishing to iOS

Visit the App Store connect at apple developer: https://appstoreconnect.apple.com/WebObjects/iTunesConnect.woa/ra/ng/app

Click the plus button on the left '+ Versions and Platforms' and select iOS. Follow the prompts to get it uploaded. The app goes through a review process by apple before you can get i published to the appstore or testflight.