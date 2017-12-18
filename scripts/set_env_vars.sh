#!/bin/bash

apt-get -y install python3-pip
pip3 install --upgrade pip
pip3 install awscli

sleep 1

# Replace the default nginx website config with a proxy to our node app
# Get this file from S3
rm -f /etc/nginx/sites-available/default
aws s3 cp s3://gopher-codedeploy/scripts/nginx-server.conf /etc/nginx/sites-available/default

# Get environment variables and inject into .env
aws s3 cp s3://gopher-codedeploy/scripts/environment-variables.txt /home/ubuntu/geogopher/.env

