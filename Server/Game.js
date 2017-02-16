var Client = require("./Client.js").Client;
var PP = require("./PlebsProtocol.js").PP;


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
        this.cells = [
            2, 2, 2, 2, 2,
            2, 2, 2, 2, 2,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            1, 1, 1, 1, 1,
            1, 1, 1, 1, 1,
        ];
    }
    reset() {
        this.winner = 0;
        this.playersTurn = 1;
        this.cells = [
            2, 2, 2, 2, 2,
            2, 2, 2, 2, 2,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            1, 1, 1, 1, 1,
            1, 1, 1, 1, 1,
        ];
    }
    // Broadcasts to all users in this game.
    // Parameter: buffer <Buffer>
    inGameBroadcast(buffer) {
        if (this.player1) this.player1.socket.write(buffer);
        if (this.player2) this.player2.socket.write(buffer);
        this.spectators.map((spec) => {
            spec.socket.write(buffer);
        });
    }
    // Removes a user from the game.
    // Param: user <Client>
    removeUser(user) {
        if (this.player1 == user) this.player1 = null;
        if (this.player2 == user) this.player2 = null;
        if (user.playerId == 3) this.spectators.splice(this.spectators.indexOf(user), 1);
    }
    // Checks for a win condition.
    checkForWin() {
        if (this.cells[4] == 1) this.winner = 1;
        if (this.cells[20] == 2) this.winner = 2;
    }
}
