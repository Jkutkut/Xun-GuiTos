# Notes:





## DB logic:
0 = spy; 1 = Resistencia 


{
    GameId: number?
    nPlayers: int
    
    players: table
    Score: table
    Election: table
}

players table
{
    GameId: number
    IndexPlayer: number
    Name: string
    IconIndex: number
    Role: null, 0, 1
}

score table
{
    gameID: number
    missionIndex: {0,1,2,3,4}
    value: null, 0, 1
}

election table
{
    GameId: number
    missionIndex: {0,1,2,3,4}
    player index: {0 -- nPlayers-1}
}





## Links:
- install-linux-apache-mysql-php: https://www.digitalocean.com/community/tutorials/how-to-install-linux-apache-mysql-php-lamp-stack-ubuntu-18-04
- https://linuxconfig.org/ubuntu-20-04-connect-to-wifi-from-command-line
- https://linuxconfig.org/how-to-configure-static-ip-address-on-ubuntu-20-04-focal-fossa-desktop-server
- https://www.mysqltutorial.org/mysql-cheat-sheet.aspx
- https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-phpmyadmin-on-ubuntu-18-04