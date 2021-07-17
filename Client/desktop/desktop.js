/**
 * The index of the current Mission (1º mission => 0).
 */
var currentMissionIndex;

/**
 * Key: number of players in the game.
 * 
 * Index: number of the mission.
 * 
 * Value: number of players needed for that mission.
 */
var playersPerM = {
    5: [ 2, 3, 2, 3, 3 ],
    6: [ 2, 3, 4, 3, 4 ],
    7: [ 2, 3, 3, 4, 4 ],
    8: [ 3, 4, 4, 5, 5 ],
    9: [ 3, 4, 4, 5, 5 ],
    10:[ 3, 4, 4, 5, 5 ]
}

// GetDB functions

/**
 * Function to execute when data from getDB is received from server.
 * @param {Obj} data - Object from server.
 */
var successGetDBf = (data) => {
    updatePlayers();
    updateMissions();
    updateSelectedPlayers();
    updatePoll();
};

/**
 * Function to execute when error getting data from getDB.
 * @param {Obj} data - Object from server.
 */
var errorGetDBf = (e) => {
    console.error(e);
};

/**
 * Executes the function to get the content of the DB using the functions:
 * @see successGetDBf
 * @see errorGetDBf
 */
 function update() {
    getDB(successGetDBf, errorGetDBf);
}

window.onload = function() {
    // Create poll btns events    
    $("#LeftBtn").click(()=>{vote(1);});
    $("#RightBtn").click(()=>{vote(-1);});

    $(".torch").attr("src", "../../Res/img/torch.png");
    $(".gun").attr("src", "../../Res/img/guns/007-gun.png");
    $(".playerIcon").attr("src", "../../Res/img/users/user13.png");

    getDB((data)=>{
        if (data.currentState == 0) { // If the user shouldn't be here
            throw new Error("The game has not started!");
        }
        successGetDBf(data); // else, process data.
        }, 
        errorGetDBf // If error getting data, execute this function
    );
}

/** Main functions */

/**
 * @param {number} n - Number of players
 * @returns Generator with the id of the players Divs in counterClockwise order.
 */
 function *playerIterator(n) {
    if (n < 5 || n > 10 || !Number.isInteger(n)){ //if n not on the correct range or not an int
        throw "Error at showPlayers: The value show an int be between 5 and 10, both inclusive.";
    }
    
    // bottom
    if (n == 6 || n >= 8) yield 42;
    if (n % 2 == 1 || n == 10) yield 43;
    if (n == 6 || n >= 8) yield 44;

    // right side
    yield 35; // always
    if (n > 6) yield 25;

    // top
    yield 12; // always
    if (n == 10) yield 13;
    yield 14; // always
    
    // left side
    yield 31 // always
    if (n > 6) yield 21;

}

/**
 * Given the number of players, show the containers on the correct positions.
 * @param {number} n - The number of players on the game.
 * @throws error if the value is not on the range [5, 10]
 */
 function showPlayers(n){
    let playersDivIte = playerIterator(n);
    $(".playerDiv").css("display", "none");
    while (true) {
        let pDiv = playersDivIte.next();
        $(`#${pDiv.value}`).css("display", "flex");
        if (pDiv.done == true) break; // If done, end
    }

    // Bottom
    if (n == 6 || n == 8) {
        for (let i = 2; i <= 4; i+=2) {
            $(`#4${i}`).css("--c", i + 2);
        }
    }
    else {
        for (let i = 2; i <= 4; i+=2) {
            $(`#4${i}`).css("--c", i * 2 - 1);
        }
    }

    // Sides
    if (n < 7) {
        for (let c = 1; c <= 5; c+=4) {
            $(`#3${c}`).css("--r", 4);
        }
    }
    else {
        for (let c = 1; c <= 5; c+=4) {
            $(`#3${c}`).css("--r", 5);
        }
    }

    // Top
    if (n > 5 && n < 10) {
        for (let i = 2; i <= 4; i+=2) {
            $(`#1${i}`).css("--c", i + 2);
        }
    }
    else {
        for (let i = 2; i <= 4; i+=2) {
            $(`#1${i}`).css("--c", i * 2 - 1);
        }
    }
}