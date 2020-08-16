#!/bin/sh

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

(sudo systemctl disable bluetoothInterpreter ||
echo "Not able to disable bluetoothInterpreter.service") &&
(sudo cp -f bluetoothInterpreter.service /etc/systemd/system/bluetoothInterpreter.service ||
error "Not able to update the file bluetoothInterpreter.service") &&
(sudo systemctl enable bluetoothInterpreter ||
error "Not able to enable bluetoothInterpreter.service")