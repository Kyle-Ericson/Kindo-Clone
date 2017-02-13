var Client = require("./Client.js").Client;
var KindoP = require("./KindoProtocol.js").Protocol;
var Game = require("./Game.js").Game;
var net = require("net");

// This is the server class.
exports.Server = class Server {
    // The server constructor.
    constructor() {
        // The servers port.
        this.port = 1234;
        // An array of all connected clients.
        this.clients = [];
        // A list of active games.
        this.games = [];
        // This creates the server.
        this.server = net.createServer((socket) => {
            this.clients.push(new Client(this, socket));
        });
        // This sets the server to listen on the given port.
        this.server.listen(this.port, () => {
            console.log("Server listening on " + this.port);
        });
    }
    // This runs when a client disconnects.
    // Param: game <Game>
    // Param: client <Client>
    handleDisconnect(client) {
        console.log("Client disconnected.");
        // Find that clients game.
        let game = this.findGame(client.gameId);
        // Remove user from game.
        if(game != null) {
            game.removeUser(client);
            // If a player is null reset the game.
            if(game.player1 == null || game.player2 == null) {
                game.reset();
                this.broadcastStatus(game.gameId);
            }
        }
        // Remove client from the clients array.
        this.clients.splice(this.clients.indexOf(client), 1);
    }
    // This broadcasts a packet to all clients in the specified game.
    // Param: gameId <int>
    // Param: buffer <Buffer>
    broadcast(gameId, buffer) {
        // Find the right game.
        let game = this.findGame(gameId);
        // Broadcast to all users in game.
        game.inGameBroadcast(buffer);
    }
    // This broadcasts the game status to all clients
    // the specified game.
    // Param: gameId <int>
    // Param: buffer <Buffer>
    broadcastStatus(gameId) {
        let game = this.findGame(gameId);

        if(game.ready) {
            this.broadcast(gameId, KindoP.buildUpdate());

            if(game.winner != 0) {
                Game.reset();
                this.player1 = null;
                this.player2 = null;
            }
        }
        else {
            this.broadcast(KindoP.buildWait());
        }

    }
    // Find the right game based on the gameId.
    // Param: gameId <int>
    // Return: Game
    findGame(gameId) {
        this.games.map((game) => {
            if(game.gameId === gameId) { return game; }
            else return null;
        });
    }
    // Checks the requested name for errors.
    // Returns an error code if one is found.
    // Param: name <String>
    // Return: <int>;
    isNameOkay(name){
		if(name.length < 3) return KindoP.NAME_SHORT;
		if(name.length > 16) return KindoP.NAME_LONG;
		if(!name.match(/^[a-zA-Z0-9\s\.\-\_]+$/)) return KindoP.NAME_CHARS;
		this.clients.map((client) => {
			if(name == client.username) return KindoP.NAME_TAKEN;
		});
		return 0;
	}
    // Creates a new game.
    // Return: <Game>
    createGame() {
        let newGame = new Game(this.games.length + 1);
        this.games.push(newGame);
        return newGame();
    }
}
