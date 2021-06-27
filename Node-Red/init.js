const STATES = {
    SETUP: 0,
    MEETUP: 1,
    ROUND: 2,
    POLLM: 3,
    MISSION: 4,
    ENDM: 5,
    0: "Setup",
    1: "Meetup",
    2: "Round",
    3: "PollM",
    4: "Mission",
    5: "EndM"
}

global.set("currentState", STATES.SETUP);
global.set("STATES", STATES);

msg.topic = "FSM initialized";

return msg;