var Client = require("./Client.js").Client;
var Protocol = require("./KindoProtocol.js").Protocol;
var Game = require("./Game.js").Game;


// This object stores the state of the game.
exports.Game = class Game = {
	constructor(id) {
		this.gameId = id;
		this.whoseTurn = 1;
		this.player1 = null;
        this.player2 = null;
        this.spectators = [];
        this.readyStart = false;
	}


}