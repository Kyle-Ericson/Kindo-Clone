var Client = require("./Client.js").Client;
var KindoP = require("./KindoProtocol.js").Protocol;
var Game = require("./Game.js").Game;


// This object stores the state of the game.
exports.Game = class Game {
    // The Game constructor.
	constructor(id) {
		this.gameId = id;
		this.whoseTurn = 1;
		this.player1 = null;
        this.player2 = null;
        this.spectators = [];
        this.ready = false;
	}
    // Broadcasts to all users in this game.
    // Parameter: buffer <Buffer>
    inGameBroadcast(buffer) {
        player1.socket.write(buffer);
        player2.socket.write(buffer);
        spectators.map((spec) => { spec.socket.write(buffer); });
    }
    removeUser(user) {
        if(player1 == user) player1 = null;
        if(player2 == user) player2 = null;
    }
}
