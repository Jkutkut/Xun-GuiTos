#!/bin/sh
# This sh file analyces the content recieved from bluetooth

dir="/home/ubuntu/bluetooth/"
f="btData.txt"

echo "$(date)  - Bt Interpreter: start" >> /home/ubuntu/bluetooth/log.txt
cd $dir # go to the desired directory
if ! test -e btData.txt; then # If no file
    touch $f; # Create file
fi
while true; do
    if [ $(wc -w < $f) -gt 0 ]; then
        file=$(sed -n '1,100p' $f)
        for c in $file; do
            # echo $c
            type=$(echo $c | cut -d ':' -f 1)
            case "$type" in
                "wifi")
                    ssid=$(echo $c | cut -d ':' -f 2)
                    pass=$(echo $c | cut -d ':' -f 3)
                    echo "ssid = $ssid; passw = $pass" > wifidata.txt
                    echo "wifi changed :D" > /dev/rfcomm0
                ;;
            esac
        done
        rm $f 
        touch $f # Clear the file
        cat $f
    else
        break
    fi
done
echo "$(date)  - Bt Interpreter: end" >> /home/ubuntu/bluetooth/log.txt