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
        game.removeUser(client);
        // Remove client from the clients array.
        this.clients.splice(this.clients.indexOf(client), 1);
        // If a player is null reset the game.
        if(game.player1 == null || game.player2 == null) {
            game.reset();
            this.broadcastStatus(game.gameId);
        }
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
    broadcastStatus(gameId, buffer) {
        if(this.findGame(gameId).ready) {

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

}
