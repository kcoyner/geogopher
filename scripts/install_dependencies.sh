#!/bin/bash

# Install node, nvm and nginx
apt install nodejs
apt install npm
update-alternatives --install /usr/bin/node node /usr/bin/nodejs 1
apt install nginx

# Install node modules and build project files
cd /home/ubuntu/geogopher
npm install
npm run build
npm start
