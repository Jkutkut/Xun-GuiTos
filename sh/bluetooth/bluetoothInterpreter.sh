#!/bin/sh
# This sh file analyces the content recieved from bluetooth
# sleep 5
dir="/home/ubuntu/bluetooth/"
# dir="./"
f="btData.txt"
# f="hola"

cd $dir # go to the desired directory
echo "$(date)  - Bt Interpreter: start" >> log.txt
# echo "$(date)  - Bt Interpreter: start"

while true; do
    if [ $(wc -w < $f) -gt 0 ]; then # if more than one msg on btData file 
        cp $f ."$f".tmp
        echo "" > $f
        for c in $(cat ."$f".tmp); do
            echo "$(date)  - Bt Interpreter: command detected: $c" >> log.txt
            # echo "$(date)  - Bt Interpreter: command detected: $c"
            type=$(echo $c | cut -d ':' -f 1)
            case "$type" in
                "wifi")
                    ssid=$(echo $c | cut -d ':' -f 2)
                    pass=$(echo $c | cut -d ':' -f 3)
                    echo "ssid = $ssid; passw = $pass" > wifidata.txt
                    # echo "***   ssid = $ssid; passw = $pass    ***"
                    echo "WIFI changed :D" > /dev/rfcomm0
                ;;
            esac
        done
        rm ."$f".tmp
    else
        sleep 1
    fi
done
echo "$(date)  - Bt Interpreter: end" >> log.txt