read res
t=$(echo $res | cut -d ':' -f 2)
# touch result
echo $t
$t > result 2>&1 &
# $res > result