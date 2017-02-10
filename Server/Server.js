var Client = require("./Client.js").Client;
var Protocol = require("./KindoProtocol.js").Protocol;
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
        // An instance of the Game class.
        this.game = new Game();
        // This creates the server.
        this.server = net.createServer((connection) => {
            this.clients.push(new Client(this, connection));
        });
        // This sets the server to listen on the given port.
        this.server.listen(this.port, () => { 
            console.log("Server listening on " + this.port);
        });
    }
    // This runs when a client disconnects.
    // Param: game <Game>
    // Param: client <Client>
    onDisconnect(game, client) {
        // Remove client from the clients array.
        this.clients.splice(this.clients.indexOf(client), 1);
        // If the client is a player, that player is null.
        if(game.player1 === client) game.player1 = null;
        if(game.player2 === client) game.player2 = null;
        // If a player is null reset the game.
        if(game.player1 == null || game.player2 == null) {
            game.reset();
            this.broadcastStatus(game);
        }


    }
    // This broadcasts a packet to all clients in the specified game.
    // Param: game <Game> The target game's id.
    // Param: buffer <Buffer>
    broadcast(game, buffer) {

    }
    // This broadcasts the game status to all clients
    // the specified game.
    // Param: game <Game>
    broadcastStatus(game) {

    }
    // This checks to see if the specified game is ready.
    // Param: game <Game>
    isReady(game) {

    }

}