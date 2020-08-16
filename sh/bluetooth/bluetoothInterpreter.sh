#!/bin/sh
# This sh file analyces the content recieved from bluetooth

dir="/home/ubuntu/bluetooth/"
f="btData.txt"

cd $dir # go to the desired directory
echo "$(date)  - Bt Interpreter: start" >> log.txt
if ! test -e $f; then # If no file
    touch $f; # Create file
fi
while true; do
    if [ $(wc -w < $f) -gt 0 ]; then # if more than one msg on btData file 
        for c in $(cat $f); do
            echo "$(date)  - Bt Interpreter: command detected: $c" >> log.txt
            type=$(echo $c | cut -d ':' -f 1)
            case "$type" in
                "wifi")
                    ssid=$(echo $c | cut -d ':' -f 2)
                    pass=$(echo $c | cut -d ':' -f 3)
                    echo "ssid = $ssid; passw = $pass" > wifidata.txt
                    echo "WIFI changed :D" > /dev/rfcomm0
                ;;
            esac
        done
        rm $f
        touch $f # Clear the file
        cat $f
    else
        sleep 1
    fi
done
echo "$(date)  - Bt Interpreter: end" >> log.txt