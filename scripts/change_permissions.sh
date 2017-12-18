#!/bin/bash

# Ensure all files are owned by ubuntu
cd /home/ubuntu
chown -R ubuntu:ubuntu ./geogopher

if [[ -d /home/ubuntu/geogopher/credentials ]]; then
   rm -rf /home/ubuntu/geogopher/credentials
fi

exit 0
