#!/bin/bash

sleep 1

if [[ -f "/home/ubuntu/.env" ]]; then
   ln -s /home/ubuntu/.env /home/ubuntu/geogopher/.env
fi

exit 0
