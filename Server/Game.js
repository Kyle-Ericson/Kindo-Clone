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
    // Resets the game to its starting state.
    reset() {
        this.winner = 0;
        this.whoseTurn = 1;
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
    changeTurn() {
        if(this.whoseTurn == 1) this.whoseTurn = 2;
        else if(this.whoseTurn == 2) this.whoseTurn = 1;
    }
    // Checks for a win condition.
    checkForWin() {
        if (this.cells[0] == 1 || this.cells[1] == 1 || this.cells[2] == 1 || this.cells[3] == 1 || this.cells[4] == 1) this.winner = 1;
        if (this.cells[25] == 2 || this.cells[26] == 2 || this.cells[27] == 2 || this.cells[28] == 2 || this.cells[29] == 2) this.winner = 2;
    }
    doMove(cell1, cell2, playerid) {
        if (this.cells[cell1] == playerid && this.whoseTurn == playerid) {
            // Check to the left.
            if(this.checkLeft(cell1, cell2, playerid) ||
               this.checkRight(cell1, cell2, playerid) ||
               this.checkUp(cell1, cell2, playerid) ||
               this.checkDown(cell1, cell2, playerid)) {

                this.cells[cell2] = playerid;
                this.cells[cell1] = 0;
                this.changeTurn();
            }
            this.checkForWin();
        }
    }
    checkLeft(cell1,cell2, playerid) {
        if (cell1 != 0 &&
            cell1 != 5 &&
            cell1 != 10 &&
            cell1 != 15 &&
            cell1 != 20 &&
            cell1 != 25) {

                if (this.cells[cell1 - 1] == playerid &&
                    cell1 - 1 != 0 &&
                    cell1 - 1 != 5 &&
                    cell1 - 1 != 10 &&
                    cell1 - 1 != 15 &&
                    cell1 - 1 != 20 &&
                    cell1 - 1 != 25) {

                        if (this.cells[cell1 - 2] != playerid && cell1 - 2 == cell2) {
                            return true;
                        }
                        else return false;
                    }
                    else return false;
            }
            else return false;
    }
    checkRight(cell1,cell2, playerid) {
        if (cell1 != 4 &&
            cell1 != 9 &&
            cell1 != 14 &&
            cell1 != 19 &&
            cell1 != 24 &&
            cell1 != 29) {

                if (this.cells[cell1 + 1] == playerid &&
                    cell1 + 1 != 0 &&
                    cell1 + 1 != 5 &&
                    cell1 + 1 != 10 &&
                    cell1 + 1 != 15 &&
                    cell1 + 1 != 20 &&
                    cell1 + 1 != 25) {

                        if (this.cells[cell1 + 2] != playerid && cell1 + 2 == cell2) {
                            return true;
                        }
                        else return false;
                    }
                    else return false;
            }
            else return false;
    }
    checkUp(cell1,cell2, playerid) {
        if (cell1 != 0 &&
            cell1 != 1 &&
            cell1 != 2 &&
            cell1 != 3 &&
            cell1 != 4 ) {

                if (this.cells[cell1 - 5] == playerid &&
                    cell1 - 5 != 0 &&
                    cell1 - 5 != 1 &&
                    cell1 - 5 != 2 &&
                    cell1 - 5 != 3 &&
                    cell1 - 5 != 4 ) {

                        if (this.cells[cell1 - 10] != playerid && cell1 - 10 == cell2) {
                            return true;
                        }
                        else return false;
                    }
                    else return false;
            }
            else return false;
    }
    checkDown(cell1,cell2, playerid) {
        if (cell1 != 25 &&
            cell1 != 26 &&
            cell1 != 27 &&
            cell1 != 28 &&
            cell1 != 29 ) {

                if (this.cells[cell1 + 5] == playerid &&
                    cell1 + 5 != 25 &&
                    cell1 + 5 != 26 &&
                    cell1 + 5 != 27 &&
                    cell1 + 5 != 28 &&
                    cell1 + 5 != 29 ) {

                        if (this.cells[cell1 + 10] != playerid && cell1 + 10 == cell2) {
                            return true;
                        }
                        else return false;
                    }
                    else return false;
            }
            else return false;
    }
}
