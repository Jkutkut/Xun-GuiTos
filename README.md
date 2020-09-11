# Resistencia:

## Version history:
### v2:
- v2.0: The start of HTML
    - Work focused on the form to create a new player menu.
- v2.1: Main menu
    - Work on the main menu.
        - Basic layout defined.
        - Some funcionalities added.
        - Icons for guns and team leader added.
        - CSS file unified.
        - Feedback system implemented.
- v2.2: Data base creation
    - First aproach to DB creation and modification usign JS/JQuerry/PHP.
        - Communication to Raspberry using PHP and JQuerry (Ajax).
        - Ajax commands to send information (plain text).
        - Database logic defined.
        - Game proccess logic defined.
        - Use of uxf file to display info.
        - Change between menus using php.
        - Succesfull sqlite update of table using php and ajax.
- v2.3: Data base and menus integration:
    - CreateMenu and Waiting room basic logic implemented.
    - Now the game stores the username and the icon asociated.
    - 

### v0 - v1: Bluetooth communication
Work focused on the configuration of the rapsberry pi 4 and the bluetooth communication protocol. Basic structure of the repository created.
    
    - Bluetooth interpreter and communication stablised. More work will be added on the future.
        - Connection
        - Basic interpreter and communication
        - Change wifi using BT
        - Execute shells at startup (also as root if needed)
        - Communication logic
        - Make status respond
        - Execute commands
    - Basic sh files created to update the code if changed.
    - Database basic logic


## Special mentions:
### Icons:
- Gun icons: Made by smalllikeart: https://www.flaticon.com/authors/smalllikeart
- Torch icon: Icons made by freepik http://www.freepik.com/

### Links:
Links to pages used to configure or consult with usefull information:
#### Raspberry:
- ssh control: https://vitux.com/how-to-remotely-manage-a-ubuntu-server-with-ssh/
- Rasp SH code:
    - change wifi: https://linuxconfig.org/ubuntu-20-04-connect-to-wifi-from-command-line
    - static IP with wired connection: https://linuxconfig.org/how-to-configure-static-ip-address-on-ubuntu-20-04-focal-fossa-desktop-server
    - Manipulate text on linux: https://www.digitalocean.com/community/tutorials/the-basics-of-using-the-sed-stream-editor-to-manipulate-text-in-linux

- Rasp bluetooth:
    - https://bluedot.readthedocs.io/en/latest/pairpiandroid.html
    - https://www.raspberrypi.org/forums/viewtopic.php?p=919420#p919420

- Rasp LAMP:
    - install-linux-apache-mysql-php: https://www.digitalocean.com/community/tutorials/how-to-install-linux-apache-mysql-php-lamp-stack-ubuntu-18-04
    - MySQL Cheatsheet: https://www.mysqltutorial.org/mysql-cheat-sheet.aspx
    - Secure phpmyadmin: https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-phpmyadmin-on-ubuntu-18-04

- Rasp php:
    - https://askubuntu.com/questions/92069/how-to-add-custom-directory-e-g-phpmyadmin

- Rasp sqlite:
    - https://www.ochobitshacenunbyte.com/2019/10/01/instalacion-y-uso-basico-de-sqlite-en-ubuntu-18-04/
    - connect to SQLite using PHP: https://www.a2hosting.com/kb/developer-corner/sqlite/connect-to-sqlite-using-php
    - jQuerry ajax: https://api.jquery.com/jquery.ajax/
    - js php: https://stackoverflow.com/questions/12498839/how-to-execute-php-code-within-javascript/12498905



#### Web:
- Css loading: https://loading.io/css/
- Crop img: https://codepen.io/blackjacques/pen/bqgNoa
- https://www.w3schools.com/cssref/css_units.asp
