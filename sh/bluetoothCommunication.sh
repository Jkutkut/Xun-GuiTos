#/bin/sh
# This sh file stores on a file the msgs recived from any bluetooth device
while ; do
    if test -e /dev/rfcomm0; then # If connected by bluetooth
        # while test -e /dev/rfcomm0; do # While connected by bluetooth
        #     sleep 1
        # done
        cat /dev/rfcomm0 >> /home/ubuntu/bluetooth/btData.txt
    else
        sleep 5 # If device not connected, wait a bit
    fi
done