var global = {
    data: {},
    set: function (param, value) {
        global.data[param] = value;
    },
    get: function (param) {
        return global.data[param];
    }
}

// Actual code


const STATES = {
    SETUP: 0,
    MEETUP: 1,
    PREM: 2,
    MISSION: 3,
    ENDM: 4
}


global.set("CURRENTSTATE", STATES.SETUP);


// global.set("fsmMatrix", [
//     {0, null, 0, null},
//     {0, null, 0, null}
// ]);

console.log(global);
console.log(global.get("CURRENTSTATE"));
