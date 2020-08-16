#!/bin/sh
# This sh file analyces the content recieved from bluetooth

f="hola"
# f="btData.txt"

# echo "$(date)  - Bt Interpreter: start" >> /home/ubuntu/bluetooth/log.txt

if ! test -e $f; then # If no file
    touch $f; # Create file
fi


while true; do
    if [ $(wc -w < $f) -gt 0 ]; then
        file=$(cat $f)
        for c in $file; do
            echo $c
            y2=$(echo $c | cut -d ':' -f 1)
        done
        # rm $f; touch $f # Clear the file
    else
        break
    fi
    break
done
# echo "$(date)  - Bt Interpreter: end" >> /home/ubuntu/bluetooth/log.txt