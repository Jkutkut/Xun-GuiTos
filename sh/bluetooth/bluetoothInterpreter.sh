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
            echo $c
        done
        rm $f 
        touch $f # Clear the file
        cat $f
    else
        break
    fi
done
echo "$(date)  - Bt Interpreter: end" >> /home/ubuntu/bluetooth/log.txt