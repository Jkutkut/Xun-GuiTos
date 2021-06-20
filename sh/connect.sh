i=2;
# ip = 192.168.43.107

user="";
baseIP="192.168.68.";
extra="";
while true; do
    echo "Atempting $baseIP$i$extra";
    ssh $user@$baseIP$i ||
    # curl $baseIP$i$extra &&
    echo "found!" && break ||
    i=$(($i+1));
done;