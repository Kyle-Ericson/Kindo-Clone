var Client = require("./Client.js").Client;
var Protocol = require("./KindoProtocol.js").Protocol;
var Game = require("./Game.js").Game;


// This is the client class.
exports.Client = class Client {
    // The client constructor.
    // Param: server <Server>
    // Param: socket <Socket>
    constructor(server, socket) {
        // 0: Spectator, 1: Player1, 2: Player2.
        this.playerId = 0;
        // Holds a reference to the server.
        this.server = server;
        // This client's socket.
        this.socket = socket;
        // Holds the buffer for controlling data flow.
        this.buffer = Buffer.aloc(0);
        // This client's username.
        this.username = "";
        // If there is an error.
        this.socket.on('error', (msg) = > {console.log(msg)});
        // If the client loses connection.
        this.socket.on('close', () => { this.server.handleDisconnect(this); });
        // For incoming data.
        this.socket.on('data', (data) => { this.handleData(data); });
        // Print to confirm connection.
        console.log("Client connected.");
    }
    // This function handles the incoming data and decides what to do with it.
    // Param: data <Buffer>
    handleData(data) {
        // Adds the new data to the end of the buffer.
        this.buffer = Buffer.concat([this.buffer, Buffer.from(data)]);

        // If buffer is not empty, test the packet.
        while(this.buffer.length > 0) {
            // Attempt to read the packet, break out if valid packet.
            if(this.testPacket()) break;
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
        switch(this.getPacketType()) {
            // No valid packet.
            case null:
                break;
            // Join packet.
            case "JOIN": readPacketJoin();
                break;
            // Move packet.
            case "MOVE": readPacketMove();
                break;
            // Chat packet.
            case "CHAT": readPacketChat();
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
        if(this.buffer.length < 4) return null;
        return this.buffer.slice(0,4).toString();
    }
    // Splits the buffer at a given point, removing that data from the buffer.
    splitBuffer(n) {
        this.buffer = this.buffer.slice(n, this.buffer.length);
    }
    readPacketJoin() {

    }
    readPacketMove() {

    }
    readPacketChat() {

    }


}// end connection