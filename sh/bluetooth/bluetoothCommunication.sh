#!/bin/sh
# This sh file stores on a file the msgs recived from bluetooth communication
dir="/home/ubuntu/bluetooth/"
# Clear the previous files
rm -f "$dir"log.txt
rm -f "$dir"btData.txt
touch "$dir"log.txt
touch "$dir"btData.txt


echo "$(date) - Bt Comunication: start" >> "$dir"log.txt
while true; do
  if test -e /dev/rfcomm0; then # If connected by bluetooth
    cat /dev/rfcomm0 >> /home/ubuntu/bluetooth/btData.txt
  else
    sleep 5 # If device not connected, wait a bit
  fi
done
echo "$(date) - Bt Comunication: end" >> /home/ubuntu/bluetooth/log.txt