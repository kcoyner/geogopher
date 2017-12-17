#!/bin/bash

service nginx start

cd /home/ubuntu/geogopher
npm install
npm run build

# These scripts are run by root, so the build process
# creates a bundle owned by root. Change the owner back to ubuntu.
chown ubuntu:ubuntu /home/ubuntu/geogopher/dist/bundle.*

npm start > /dev/null 2> /dev/null < /dev/null &

