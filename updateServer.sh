# Shell to update the server from this repository
echo "
                 _       _       _____                          
                | |     | |     /  ___|                         
 _   _ _ __   __| | __ _| |_ ___\ `--.  ___ _ ____   _____ _ __ 
| | | | '_ \ / _` |/ _` | __/ _ \`--. \/ _ \ '__\ \ / / _ \ '__|
| |_| | |_) | (_| | (_| | ||  __/\__/ /  __/ |   \ V /  __/ |   
 \__,_| .__/ \__,_|\__,_|\__\___\____/ \___|_|    \_/ \___|_|   
      | |                                                       
      |_|                                                       
"
(sudo mv Client/* /var/www/jkutkut/ ||
echo "Error moving files") &&
echo "done."
