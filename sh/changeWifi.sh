#!/bin/sh
dir="/dev/rfcomm0"

echo "executing"
# while ! test -f $dir; do
#     echo "Bluetooth device not connected"
#     sleep 2
# done

# echo "Bluetooth connected"
# while inotifywait -e modify $dir; do
#     if tail -n1 $dir; then
#     #   if tail -n1 $dir | grep wifi; then
#         # echo "Hey!! wifi found"
#         echo "hi"
#     fi
# done

mkfifo fifootje
cat fifootje  | other_program &
while read input ; do
    echo "$input" >>fifootje
done <&3

echo "done"