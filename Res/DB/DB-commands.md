# mysql logic:

## Main table:
CREATE TABLE `Main` (
	`GameId` INT(5) NOT NULL,
	`nPlayers` INT(10),
	PRIMARY KEY (`GameId`)
);
## players table:
CREATE TABLE `Players` (
	`GameId` INT NOT NULL,
	`IndexPlayer` TINYINT NOT NULL,
	`Name` TINYTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
	`IconIndex` TINYINT DEFAULT '0',
	`Role` TINYINT,
	PRIMARY KEY (`GameId`,`IndexPlayer`)
);
## Score table:
CREATE TABLE `Score` (
	`gameId` INT NOT NULL,
	`missionIndex` TINYINT NOT NULL,
	`value` TINYINT,
	PRIMARY KEY (`gameId`,`missionIndex`)
);
## Election table:
CREATE TABLE `Election` (
	`GameId` INT NOT NULL,
	`MissionIndex` TINYINT NOT NULL,
	`PlayerIndex` TINYINT NOT NULL,
	PRIMARY KEY (`GameId`,`MissionIndex`,`PlayerIndex`)
);