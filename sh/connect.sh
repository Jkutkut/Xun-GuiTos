i=2;
# ip = 192.168.43.107

while true; do
    echo "Atempting 192.168.43.$i";
    ssh pi@192.168.43.$i ||
    i=$(($i+1));
done;