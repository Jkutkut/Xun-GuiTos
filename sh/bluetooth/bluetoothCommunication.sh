#!/bin/sh
# This sh file stores on a file the msgs recived from bluetooth communication
dir="/home/ubuntu/bluetooth/"
# Clear the previous files
rm -f "$dir"log.txt
rm -f "$dir"btData.txt

welcomed=false # If the wellcome msg has been sent

touch "$dir"btData.txt

echo "$(date) - Bt Comunication: start" >> "$dir"log.txt
while true; do
  if test -e /dev/rfcomm0; then # If connected by bluetooth
    if ! $welcomed; then
      echo "Connected to rasp4 :D" >> /dev/rfcomm0
      welcomed=true # No more greetings
    fi
    cat /dev/rfcomm0 >> "$dir"btData.txt
  else
    welcomed=false # Reset greeting
    sleep 5 # If device not connected, wait a bit
  fi
done
echo "$(date) - Bt Comunication: end" >> "$dir"log.txt