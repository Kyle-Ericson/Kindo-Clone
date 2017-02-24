package  {
	
	public class PacketInLeave extends PacketIn {

		static public function tryReading(buffer:LegitBuffer):PacketInLeave {
			if(buffer.length < 4) return null; // not enough data in the stream; packet incomplete
			return new PacketInLeave(buffer);
		}
		
		public function PacketInLeave(buffer:LegitBuffer) {
			_type = PacketType.LEAV;
			buffer.trim(4);
		}
	}
}
