#!/bin/bash
#
# vim:ft=sh

############### Variables ###############

############### Functions ###############

############### Main Part ###############
node ../../node_modules/cordova-plugin-apkupdater/src/nodejs/create-manifest.js 1.0.0 100k ../../platforms/android/app/build/outputs/apk/debug/app-debug.apk update
