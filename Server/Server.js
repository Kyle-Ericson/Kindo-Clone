
const TTTP = {

}// end TTTP

const Game = {

}// end Game



/////////////////////////////////////
// This is the server class.
class Server {
    // The server constructor.
    constructor() {

    }

}// end server





/////////////////////////////////////
// This is the client class.
class Client {
    // The client constructor.
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
    // Parameters: data <Buffer>.
    handleData(data) {
        // Adds the new data to the end of the buffer.
        this.buffer = Buffer.concat([this.buffer, Buffer.from(data)]);
        // If buffer is not empty, test the packet.
        while(this.buffer.length > 0) {
            // Attempt to read the packet.
            if(this.testPacket)

        }
    }
    // Attempts to read the packet
    testPacket() {
        switch(this.getPacketType()) {
            case null:
                break;
            case "JOIN": readPacketJoin();
                break;
            case "MOVE": readPacketMove();
                break;
            default:
                return false;
                break;
        }
    }


}// end connection
