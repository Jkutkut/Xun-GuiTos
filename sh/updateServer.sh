#!/bin/sh
# Shell to update the server from this repository to another directory
exit 0;

#colors:
  NC='\033[0m' # No Color
  RED='\033[0;31m'
  GREEN='\033[0;32m'
  LRED='\033[1;31m'
  LGREEN='\033[1;32m'
  YELLOW='\033[1;33m'
  LBLUE='\033[1;34m'
  TITLE='\033[38;5;33m'


askResponse=""; #When executing the function ask(), the response will be stored here
ask(){ # to do the read in terminal, save the response in askResponse
  text=$1;
  textEnd=$2;
  read -p "$(echo ${LBLUE}"$text"${NC} $textEnd)->" askResponse;
}
error(){ # function to generate the error messages. If executed, ends the script.
  err=$1;
  echo "${RED}~~~~~~~~  ERROR ~~~~~~~~
    $1${NC}";
  exit 1
}
echo "${TITLE}
                 _       _       __                          
 _   _ _ __   __| | __ _| |_ ___/ _\ ___ _ ____   _____ _ __ 
| | | | '_ \ / _\` |/ _\` | __/ _ \ \ / _ \ '__\ \ / / _ \ '__|
| |_| | |_) | (_| | (_| | ||  __/\ \  __/ |   \ V /  __/ |   
 \__,_| .__/ \__,_|\__,_|\__\___\__/\___|_|    \_/ \___|_|   
      |_|${NC}"

htmlDestination="/var/www/html/"
resDestination="/var/www/Res/"

# Remove old version
echo "
${YELLOW}Removing deprecated version${NC}"
(sudo rm /var/www/html/* &&
echo "Removing deprecated files 50%" &&
sudo rm -rf /var/www/Res/* &&
echo "Removing deprecated files 100%" ||
error "Error removing old version") &&
echo "${GREEN}Deprecated files removed${NC}
"

# Save new version
echo "${YELLOW}Installing new version${NC}"

# html
(sudo cp ../Client/createPlayer/* $htmlDestination -rf && # createPlayer
echo "CreatePlayer html/js code moved" &&
sudo cp ../Client/mainMenu/* $htmlDestination -rf && # mainMenu
echo "MainMenu html/js code moved" &&
sudo cp ../Client/waitingRoom/* $htmlDestination -rf && # waitingRoom
echo "WaitingRoom html/js/json code moved" &&
sudo cp ../Client/rootMenu/* $htmlDestination -rf && # rootMenu
echo "RootMenu html/js code moved" &&
sudo cp ../DB-Server/php/*.php $htmlDestination -rf && # PHP
echo "Php code moved to html folder" &&

# Res
sudo cp ../Res/img $resDestination -rf && # Imgs
echo "img moved to Res folder" &&
sudo cp ../Res/CSS $resDestination -rf && # CSS
echo "CSS moved to Res folder" &&
sudo cp ../Res/JS $resDestination -rf && # JS
echo "CSS moved to Res folder" ||

error "Error moving files") &&
echo "${GREEN}done${NC}
"