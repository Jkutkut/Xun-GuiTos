#!/bin/sh
# This sh file stores on a file the msgs recived from bluetooth communication
echo "$(date) - Bt Comunication: start" >> /home/ubuntu/bluetooth/log.txt
while true; do
  if test -e /dev/rfcomm0; then # If connected by bluetooth
    cat /dev/rfcomm0 >> /home/ubuntu/bluetooth/btData.txt
  else
    sleep 5 # If device not connected, wait a bit
  fi
done