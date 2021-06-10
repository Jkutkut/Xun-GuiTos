i=2;
i=104;
# ip = 192.168.43.107

baseIP="192.168.68.";
while true; do
    echo "Atempting $baseIP$i";
    # ssh pi@192.168.43.$i ||
    curl $baseIP$i"/L%20Set%20ON"  &&
    echo "found!" && break ||
    i=$(($i+1));
done;