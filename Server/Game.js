var Client = require("./Client.js").Client;
var KindoP = require("./KindoProtocol.js").Protocol;
var Game = require("./Game.js").Game;


// This object stores the state of the game.
exports.Game = class Game {
    // The Game constructor.
    constructor(id) {
        this.gameId = id;
        this.whoseTurn = 1;
        this.winner = 0;
        this.player1 = null;
        this.player2 = null;
        this.spectators = [];
        this.ready = false;
        this.cells = [0, 0, 0, 0, 2, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0
        ];
    }
    reset() {
        this.winner = 0;
        this.playersTurn = 1;
        this.cells = [0, 0, 0, 0, 2, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0
        ];
    }
    // Broadcasts to all users in this game.
    // Parameter: buffer <Buffer>
    inGameBroadcast(buffer) {
        player1.socket.write(buffer);
        player2.socket.write(buffer);
        spectators.map((spec) => {
            spec.socket.write(buffer);
        });
    }
    // Removes a user from the game.
    // Param: user <Client>
    removeUser(user) {
        if (player1 == user) player1 = null;
        if (player2 == user) player2 = null;
        if (user.playerId == 3) this.spectators.splice(this.spectators.indexOf(user), 1);
    }
    // Checks for a win condition.
    checkForWin() {
        if(cells[4] == 1) winner = 1;
        if(cells[20] == 2) winner = 2;
    }
}
