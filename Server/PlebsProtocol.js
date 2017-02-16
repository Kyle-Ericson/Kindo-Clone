var Client = require("./Client.js").Client;
var game = require("./game.js").game;

// This object is the protocol for building packets.
exports.PP = PProtocol = {
    // Error codes.
    NAME_SHORT:1,
	NAME_LONG:2,
	NAME_CHARS:3,
	NAME_TAKEN:4,
	game_FULL:5,
    NO_GAME: 6,
    GAME_EXISTS: 7,

    // Builds a join response packet.
    buildJoinResponse:(playerId, gameId, err) => {
        let packet = Buffer.alloc(7);
        packet.write("JOIN");
        packet.writeUInt8(playerId, 4);
        packet.writeUInt8(gameId, 5);
        packet.writeUInt8(err, 6);
        return packet;
    },
    buildWait: () => {
        let packet = Buffer.alloc(4);
        packet.write("WAIT");
        return packet;
    },
    buildUpdate:(game) => {

		const packet = Buffer.alloc(36);
		packet.write("UPDT");
		packet.writeUInt8(game.playersTurn, 4);
		packet.writeUInt8(game.winner, 5);
		packet.writeUInt8(game.cells[0], 6);
		packet.writeUInt8(game.cells[1], 7);
		packet.writeUInt8(game.cells[2], 8);
		packet.writeUInt8(game.cells[3], 9);
		packet.writeUInt8(game.cells[4], 10);
		packet.writeUInt8(game.cells[5], 11);
		packet.writeUInt8(game.cells[6], 12);
		packet.writeUInt8(game.cells[7], 13);
		packet.writeUInt8(game.cells[8], 14);
        packet.writeUInt8(game.cells[9], 15);
        packet.writeUInt8(game.cells[10], 16);
        packet.writeUInt8(game.cells[11], 17);
        packet.writeUInt8(game.cells[12], 18);
        packet.writeUInt8(game.cells[13], 19);
        packet.writeUInt8(game.cells[14], 20);
        packet.writeUInt8(game.cells[15], 21);
        packet.writeUInt8(game.cells[16], 22);
        packet.writeUInt8(game.cells[17], 23);
        packet.writeUInt8(game.cells[18], 24);
        packet.writeUInt8(game.cells[19], 25);
        packet.writeUInt8(game.cells[20], 26);
        packet.writeUInt8(game.cells[21], 27);
        packet.writeUInt8(game.cells[22], 28);
        packet.writeUInt8(game.cells[23], 29);
        packet.writeUInt8(game.cells[24], 30);
        packet.writeUInt8(game.cells[25], 31);
        packet.writeUInt8(game.cells[26], 32);
        packet.writeUInt8(game.cells[27], 33);
        packet.writeUInt8(game.cells[28], 34);
        packet.writeUInt8(game.cells[29], 35);

		return packet;
	},
    buildChat: (username, message) => {
        let packet = Buffer.alloc(6 + message.length + username.length);
        packet.write("CHAT");
        packet.writeUInt8(username.length, 4);
        packet.write(username, 5)
        packet.writeUInt8(message.length, 5 + username.length);
        packet.write(message, 5 + username.length + 1);
        return packet;
    }


}
