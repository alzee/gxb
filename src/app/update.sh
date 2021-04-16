#!/bin/bash
#
# vim:ft=sh

############### Variables ###############

############### Functions ###############

############### Main Part ###############

eval $(grep com.drgxb.app ../../config.xml | cut -d' ' -f3)
[ "$version" ] && return

# scp ../../platforms/android/app/build/outputs/apk/debug/app-debug.apk $ali:w/b.gxb/public/download
node ../../node_modules/cordova-plugin-apkupdater/src/nodejs/create-manifest.js $version 100k ../../platforms/android/app/build/outputs/apk/debug/app-debug.apk update
rsync -avP update/ $ali:w/b.gxb/public/update/
