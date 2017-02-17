package {

	public class PacketInJoin extends PacketIn {

		static public function tryReading(buffer: LegitBuffer): PacketInJoin {
			if (buffer.length < 7) return null; // not enough data in the stream; packet incomplete
			return new PacketInJoin(buffer);
		}

		public var playerid: int = 0;
		public var gameid: int = 0;
		public var errcode: int = 0;

		public function PacketInJoin(buffer: LegitBuffer) {
			_type = PacketType.JOIN;
			playerid = buffer.readUInt8(4);
			gameid = buffer.readUInt8(5);
			errcode = buffer.readUInt8(6);
			buffer.trim(7);
		}
		public function errmsg(): String {
			trace(errcode);
			switch (errcode) {
				case 0:
					return "";
				case 1:
					return "Username too short.";
				case 2:
					return "Username too long.";
				case 3:
					return "Username uses invalid characters.";
				case 4:
					return "Username is already taken.";
				case 5:
					return "The game session is full, you may spectate.";
				case 6:
					return "Game Id does not exist."
				default:
					return "Unknown.";
			}
			errcode = 0;
		}

	}
}
