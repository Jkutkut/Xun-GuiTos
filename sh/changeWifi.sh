#!/bin/sh
dir="/dev/rfcomm0"

while inotifywait -e modify $dir; do
# while true; do
  sleep 2;
  tail -n1 $dir >> hola.txt
  if tail -n1 $dir | grep wifi; then
    # echo "Hey!! wifi found"
    touch founded.txt
  fi
done