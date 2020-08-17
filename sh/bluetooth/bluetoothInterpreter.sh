#!/bin/sh
# This sh file analyces the content recieved from bluetooth
# sleep 5
dir="/home/ubuntu/bluetooth/"
f="btData.txt"

cd $dir # go to the desired directory
echo "$(date)  - Bt Interpreter: start" >> log.txt
# echo "$(date)  - Bt Interpreter: start"

while true; do
    if [ $(wc -w < $f) -gt 0 ]; then # if more than one msg on btData file 
        e="1,"$(wc -l < $f)"d" # Sed expression: del lines from first to last. If more lines added from this point on, they will not be lost.
        cp $f ."$f".tmp # Temp file with the new msgs
        sed -i $e $f # Remove the lines on the temp file. if more are added in the procces, they will be used on next iteration
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
                    
                    wifiConf='network:
    ethernets:
        eth0:
            dhcp4: true
            optional:true
    version: 2
    wifis:
        wlan0:
            optional:true
            access-points:
                "'$ssid'":
                    password: "'$pass'"
            dhcp4: true'
                    sudo sh -c 'echo $wifiConf > /etc/50-cloud-init.yaml'

                    echo "WIFI changed: SSID: $ssid  PASSW: $pass --> Rebooting" > /dev/rfcomm0
                    # reboot
                ;;
                "status")
                    
                ;;
                *)
                    echo "Command not found: $c" > /dev/rfcomm0
                ;;
            esac
        done
        rm ."$f".tmp
    else
        sleep 1
    fi
done
echo "$(date)  - Bt Interpreter: end" >> log.txt # If all correct, this should be never triggered