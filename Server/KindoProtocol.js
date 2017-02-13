var Client = require("./Client.js").Client;
var KindoP = require("./KindoProtocol.js").Protocol;
var Game = require("./Game.js").Game;

// This object is the protocol for building packets.
exports.Protocol = KindoProtocol = {
    // Error codes.
    NAME_SHORT:1,
	NAME_LONG:2,
	NAME_CHARS:3,
	NAME_TAKEN:4,
	GAME_FULL:5,
    NO_GAME: 6,
    GAME_EXISTS: 7,

    // Builds a join response packet.
    buildJoinResponse:(playerId, err) => {
        let packet = Buffer.alloc(6)
        packet.write("JOIN");
        packet.writeUInt8(playerId, 4);
        packet.writeUInt8(err, 5);
        return packet;
    },
    // Host response
    buildHostResponse: () => {

    }


}
