#!/bin/sh
dir="/dev/rfcomm0"
echo "executing"

while ! test -f "README.md"; do
    echo "Bluetooth device not connected"
    sleep 2
done

echo "Bluetooth connected"
while inotifywait -e modify $dir; do
    if tail -n1 $dir; then
    #   if tail -n1 $dir | grep wifi; then
        # echo "Hey!! wifi found"
        echo "hi"
    fi
done

echo "done"