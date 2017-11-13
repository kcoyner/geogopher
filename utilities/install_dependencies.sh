#!/bin/bash

# Install node, nvm and nginx
apt install nodejs
apt install npm
update-alternatives --install /usr/bin/node node /usr/bin/nodejs 1
apt install nginx


# Configure nginx as a reverse proxy in front of node
service nginx stop
sudo cp -ai home/ubuntu/geogopher/scripts/nginx-server.conf  /etc/nginx/sites-available/default
sudo service nginx start


# Install node modules and build project files
cd /home/ubuntu/geogopher
npm install
npm run build
npm start
