var Client = require("./Client.js").Client;
var PP = require("./PlebsProtocol.js").PP;
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
        if (game != null) {
            game.removeUser(client);
            // If a player is null reset the game.
            if (game.player1 == null || game.player2 == null) {
                console.log("Not enough Players");
                this.removeGame(game);
            }
        }
        this.removeClient(client);
        console.log("Clients: " + this.clients.length);
        console.log("Games: " + this.games.length);
    }
    // This broadcasts a packet to all clients in the specified game.
    // Param: gameId <int>
    // Param: buffer <Buffer>
    broadcast(gameId, buffer) {
        // Broadcast to all users in game.

        this.findGame(gameId).inGameBroadcast(buffer);
    }
    // This broadcasts the game status to all clients
    // the specified game.
    // Param: gameId <int>
    // Param: buffer <Buffer>
    broadcastStatus(gameId) {
        let game = this.findGame(gameId);

        if (game.ready) {
            this.broadcast(gameId, PP.buildUpdate(game));


        } else {
            this.broadcast(gameId, PP.buildWait());
        }
    }
    // Find the right game based on the gameId.
    // Param: gameId <int>
    // Return: Game
    findGame(gameId) {
        let gameToReturn = null;
        this.games.map((game) => {
            if (game.gameId == gameId) {
                gameToReturn = game;
                console.log("Found Game:" + game + " ID:" + game.gameId);
            }
        });
        return gameToReturn;
    }
    // Checks the requested name for errors.
    // Returns an error code if one is found.
    // Param: name <String>
    // Return: <int>;
    isNameOkay(name) {
        let error = 0;
        if (name.length < 3) error = PP.NAME_SHORT;
        if (name.length > 16) error = PP.NAME_LONG;
        if (!name.match(/^[a-zA-Z0-9\s\.\-\_]+$/)) error = PP.NAME_CHARS;

        this.clients.map((client) => {
            if (name === client.username) error = PP.NAME_TAKEN;
        });
        return error;
    }
    // Creates a new game.
    // Return: <Game>
    createGame() {
        let newGame = new Game(this.games.length + 1);
        this.games.push(newGame);
        return newGame;
    }
    // Removes a game from the games list.
    // Param: game <Game>
    removeGame(game) {
        this.games.splice(this.games.indexOf(game), 1);
    }
    // Removes client from the server.
    // Param: client <Client>
    removeClient(client) {
        this.clients.splice(this.clients.indexOf(client), 1);
    }
}
