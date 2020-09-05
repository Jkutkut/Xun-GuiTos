# Notes:

## Bluetooth syntax:
- Change wifi credentials:
    wifiC SSID PASSW




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



## Useful commands:

- Change keyboard: sudo dpkg-reconfigure keyboard-configuration
- on the bluetoothctl menu: trust [XX:XX:XX:XX:XX:XX]

## Links to add:
