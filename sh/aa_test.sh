read res
t=$(echo $res | cut -d ':' -f 2)
# touch result
# echo $t
t2=$(echo $t | sed 's/~/ /g')
echo $t2

$t2 > result 2>&1 &

echo "Result"
cat result
rm result
echo ""
# $res > result