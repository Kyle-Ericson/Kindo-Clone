var PP = require("./PlebsProtocol.js").PP;


// This is the client class.
exports.Client = class Client {
    // The client constructor.
    // Param: server <Server>
    // Param: socket <Socket>
    constructor(server, socket) {
        // 0: Spectator, 1: Player1, 2: Player2.
        this.playerId = 0;
        // This is the Id of the clients current game.
        this.gameId = 0;
        // Holds a reference to the server.
        this.server = server;
        // This client's socket.
        this.socket = socket;
        // Holds the buffer for controlling data flow.
        this.buffer = Buffer.alloc(0);
        // This client's username.
        this.username = "";
        // If there is an error.
        this.socket.on('error', (msg) => {
            console.log(msg);
        });
        // If the client loses connection.
        this.socket.on('close', () => {
            this.server.handleDisconnect(this);
        });
        // For incoming data.
        this.socket.on('data', (data) => {
            this.handleData(data);
        });
        // Print to confirm connection.
        console.log("Client connected.");
    }
    // This function handles the incoming data and decides what to do with it.
    // Param: data <Buffer>
    handleData(data) {
        // Adds the new data to the end of the buffer.
        this.buffer = Buffer.concat([this.buffer, Buffer.from(data)]);

        // If buffer is not empty, test the packet.
        while (this.buffer.length > 0) {
            // Attempt to read the packet, break out if valid packet.
            if (this.testPacket()) break;
            // If unexpected data is found destroy data and try again.
            destroyStreamData();
        }
    }
    // Destroys the leading data in the stream.
    destroyStreamData() {
        this.buffer = this.buffer.slice(1, this.buffer.length);
    }
    // Attempts to read the packet.
    // Return: Boolean
    testPacket() {
        switch (this.getPacketType()) {
            // No valid packet.
            case null:
                break;
                // Join packet.
            case "JOIN":
                this.readPacketJoin();
                break;
                // Move packet.
            case "MOVE":
                this.readPacketMove();
                break;
                // Chat packet.
            case "CHAT":
                this.readPacketChat();
                break;
                // Host packet.
            case "HOST":
                this.readPacketHost();
                break;
                // This will happen if there is an unexpected packet in the stream.
            default:
                return false;
                break;
        }
        return true;
    }
    // Gets the packets type.
    // Return: String
    getPacketType() {
        if (this.buffer.length < 4) return null;
        return this.buffer.slice(0, 4).toString();
    }
    // Splits the buffer at a given point, removing that data from the buffer.
    splitBuffer(n) {
        this.buffer = this.buffer.slice(n, this.buffer.length);
    }
    // Reads the join packets.
    readPacketJoin() {
        // If not enough data, return.
        if (this.buffer.length < 7) return;
        // What to join the game as.
        let joinAs = this.buffer.readUInt8(4);
        // The game id of the game they want to join.
        let gameId = this.buffer.readUInt8(5);
        // The target game the player wants to join.
        let game = this.server.findGame(gameId);
        // If there is no game, respond with and error code 6.
        // else, give this games id to the client.
        if (game == null) {
            this.socket.write(PP.buildJoinResponse(this.playerId, gameId, PP.NO_GAME));
            return;
        } else this.gameId = game.gameId;
        // Username length.
        let usernameLength = this.buffer.readUInt8(6);
        // Total packet Length.
        let packetLength = 7 + usernameLength;
        // Not enough data, return.
        if (this.buffer.length < packetLength) return;
        // Requested username.
        let username = this.buffer.slice(7, 7 + usernameLength).toString();
        // Remove this data from the buffer.
        this.splitBuffer(packetLength);
        // Decide if the players username is valid.
        let errcode = this.server.isNameOkay(username);
        // If no error, default to spectator.
        // If errcode == 0 playerId = 3, else it = 0.
        this.playerId = (errcode == 0 ? 3 : 0);

        if (joinAs == 1 && errcode == 0) {
            this.username = username;
            if (game.player1 == null) {
                this.playerId = 1;
                game.player1 = this;
            } else if (game.player2 == null) {
                this.playerId = 2;
                game.player2 = this;
            } else {
                this.playerId = 0;
                errcode = PP.GAME_FULL;
            }
            if(game.player1 && game.player2) game.ready = true;

        } else if (joinAs == 2 && errcode == 0) {
            this.username = username;
            game.spectators.push(this);


        }
        console.log("Join request.");
        console.log("Buffer: " + this.buffer.length);
        console.log("Packet: " + packetLength);
        console.log("Username: " + this.username);
        console.log("Game Id: " + game.gameId);
        console.log("playerid: " + this.playerId);
        console.log("Games: " + this.server.games.length);
        console.log("Specs: " + game.spectators.length);
        console.log("Ready?: " + game.ready);
        console.log("Err: " + errcode);

        this.socket.write(PP.buildJoinResponse(this.playerId, gameId, errcode));
        this.server.broadcastStatus(game.gameId);
    }
    readPacketMove() {

    }
    // Reads Chat packets
    readPacketChat() {
        console.log("Chat received.");
        // If not enough data, return.
        if (this.buffer.length < 5) return;
        // The length of the message.
        let messageLength = this.buffer.readUInt8(4);
        // The length of the packet.
        let packetLength = 5 + messageLength;
        // Not enough data return.
        if (this.buffer.length < packetLength) return;
        // The message.
        let message = this.buffer.slice(5, 5 + messageLength).toString();
        // Remove data.
        this.splitBuffer(packetLength);
        // Broadcast message to the game.
        this.server.broadcast(this.gameId, PP.buildChat(this.username, message));
    }
    // This method reads the host packet.
    readPacketHost() {
        // If not enough data, return.
        if (this.buffer.length < 5) return;
        // Username length.
        let usernameLength = this.buffer.readUInt8(4);
        // Total packet Length.
        let packetLength = 5 + usernameLength;
        // Not enough data, return.
        if (this.buffer.length < packetLength) return;
        // Requested username.
        let username = this.buffer.slice(5, 5 + usernameLength).toString();
        // Remove this data from the buffer.
        this.splitBuffer(packetLength);
        // Decide if the players username is valid.
        let errcode = this.server.isNameOkay(username);
        // Create a new game.
        let newGame = this.server.createGame();
        // Check to see if there is a game that already has that ID.
        this.server.games.map((game) => {
            // If newGame isnt only game that has that ID...
            if (newGame.gameId == game.gameId && newGame != game) {
                // There is an error.
                errcode = PP.GAME_EXISTS;
                // Remove the newGame from the games array.
                this.server.removeGame(newGame);
                newGame = null;
            }
        });
        // If still no errors...
        if (errcode == 0) {
            this.username = username;
            // This users player ID defaults to player 1.
            this.playerId = 1;
            // This users gameId is the newGame's game id.
            this.gameId = newGame.gameId;
            // newGame's player1 is this user.
            newGame.player1 = this;
        } else if (errcode > 0) {
            this.gameId = 0;
            this.playerId = 0;
            this.server.removeGame(newGame);
            newGame = null;
        }
        console.log("Host request.");
        console.log("Buffer: " + this.buffer.length);
        console.log("Packet: " + packetLength);
        console.log("Username: " + this.username);
        if(newGame) console.log("Game Id: " + newGame.gameId);
        console.log("playerid: " + this.playerId);
        console.log("Games: " + this.server.games.length);
        console.log("Err: " + errcode);

        this.socket.write(PP.buildJoinResponse(this.playerId, this.gameId, errcode));
        if (newGame != null) this.server.broadcastStatus(this.gameId);
    }
}
