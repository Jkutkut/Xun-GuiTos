var global = {
    _data: {},
    set: function (param, value) {
        global._data[param] = value;
    },
    get: function (param) {
        return global._data[param];
    }
}

// Actual code


const STATES = {
    SETUP: 0,
    MEETUP: 1,
    ROUND: 2,
    POLLM: 3,
    MISSION: 4,
    ENDM: 5
}

const FUNCT = {
    emptyF: function() {return;},
    
    // SETUP
    startedGame: function() {return;},
    go2meetup: function() {return;},
    
    // MEETUP
    meetupDelay: function() {return;},
    go2newRound: function() {return;},
    
    // ROUND
    pollEnded: function() {return;},
    pollEndedRoot: function() {return;},

    // POLLM
    good2go: function() {return;},
    multipleFails: function() {return;},
    fail: function() {return;},
    endMission: function() {return;},
    startMission: function() {return;},

    // MISSION
    missionEnded: function() {return;},
    missionEndedRoot: function() {return;},

    // ENDM
    isEndGame: function() {return;},
    endGame: function() {return;},
    go2newRound: function() {return;}
}

global.set("CURRENTSTATE", STATES.SETUP);


global.set("fsmMatrix", {});

global.get("fsmMatrix")[STATES.SETUP] = [
    {
        condition: FUNCT.emptyF, // Waiting for root to start
        to: STATES.SETUP, // SAME
        exe: FUNCT.emptyF // Just wait
    },
    {
        condition: FUNCT.startedGame, // If game started by root
        to: STATES.MEETUP, // Start meetup
        exe: FUNCT.go2meetup // Start meetup
    }
];
global.get("fsmMatrix")[STATES.MEETUP] = [
    {
        condition: FUNCT.emptyF, // Waiting
        to: STATES.MEETUP, // SAME
        exe: FUNCT.emptyF // Just wait
    },
    {
        condition: FUNCT.meetupDelay, // Wait until the time ends
        to: STATES.ROUND, // Start new round
        exe: FUNCT.go2newRound // Start new round
    }
];
global.get("fsmMatrix")[STATES.ROUND] = [
    {
        condition: FUNCT.emptyF, // Waiting
        to: STATES.ROUND, // SAME
        exe: FUNCT.emptyF // Just wait
    },
    {
        condition: FUNCT.pollEndedRoot, // if ended by rootMenu
        to: STATES.POLLM, // Check results
        exe: FUNCT.emptyF
    },
    {
        condition: FUNCT.pollEnded, // All players have already voted
        to: STATES.POLLM, // Check results
        exe: FUNCT.emptyF
    }
];


global.get("fsmMatrix")[STATES.POLLM] = [
    {
        condition: FUNCT.good2go,
        to: STATES.MISSION,
        exe: FUNCT.startMission
    },
    {
        condition: FUNCT.multipleFails,
        to: STATES.ENDM,
        exe: FUNCT.endMission
    },
    {
        condition: FUNCT.fail,
        to: STATES.ROUND,
        exe: FUNCT.go2newRound
    }
];



global.get("fsmMatrix")[STATES.MISSION] = [
    {
        condition: FUNCT.emptyF, // Waiting
        to: STATES.ROUND, // SAME
        exe: FUNCT.emptyF // Just wait
    },
    {
        condition: FUNCT.missionEndedRoot, // if ended by rootMenu
        to: STATES.ENDM, // Update result of the mission
        exe: FUNCT.emptyF
    },
    {
        condition: FUNCT.missionEnded, // All players have already voted
        to: STATES.ENDM, // Update result of the mission
        exe: FUNCT.emptyF
    }
];


global.get("fsmMatrix")[STATES.ENDM] = [
    {
        condition: !FUNCT.isEndGame,
        to: null,
        exe: FUNCT.endGame
    },
    {
        condition: !FUNCT.isEndGame,
        to: STATES.ROUND,
        exe: FUNCT.go2newRound
    }
];

// console.log(global.get("fsmMatrix")[0][1]());
console.log(global.get("fsmMatrix"));

