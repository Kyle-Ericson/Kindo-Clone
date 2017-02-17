package {

	public class PacketInChat extends PacketIn {

		public var msg:String;
		public var username:String;

		public function PacketInChat(buffer: LegitBuffer) {
			_type = PacketType.CHAT;
			var nameLength:int = buffer.readUInt8(4);
			username = buffer.slice(5, 5 + nameLength).toString();
			var msgLength:int = buffer.readUInt8(5 + nameLength);
			msg = buffer.slice(5 + nameLength + 1, buffer.length).toString();			
			buffer.trim(6 + nameLength + msgLength);
		}
		static public function tryReading(buffer: LegitBuffer): PacketInChat {
			if (buffer.length < 5) return null; // not enough data in the stream; packet incomplete
			return new PacketInChat(buffer);
		}
	}
}
