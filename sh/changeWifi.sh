#!/bin/sh
dir="/dev/rfcomm0"

while inotifywait -e modify $dir; do
# while true; do
  sleep 2;
  echo 
  if tail -n1 $dir | grep wifi; then
    # echo "Hey!! wifi found"
    touch founded.txt
  fi
done