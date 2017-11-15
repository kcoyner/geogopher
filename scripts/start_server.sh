#!/bin/bash

service nginx start

cd /home/ubuntu/geogopher
npm install
npm run build
npm start

