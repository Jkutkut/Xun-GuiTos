#!/bin/sh
dir="/dev/rfcomm0"
echo "executing"
while inotifywait -e modify $dir; do
  if tail -n1 $dir; then
#   if tail -n1 $dir | grep wifi; then
    # echo "Hey!! wifi found"
    echo "hi"
  fi
done
echo "done"