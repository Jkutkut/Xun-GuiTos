#!/bin/sh

i=2;
# ip = 192.168.43.107
# ip = 192.168.68.140

user="";
baseIP="192.168.68.";
extra="";
while true; do
    echo "Atempting $user@$baseIP$i$extra";
    ssh -o ConnectTimeout=10 $user@$baseIP$i &&
    # curl $baseIP$i$extra &&
    echo "found!" && break ||
    i=$(($i+1));
done;