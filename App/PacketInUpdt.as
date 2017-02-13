package  {
	
	/**
	 * The incoming packet update class.
	 **/
	public class PacketInUpdt extends PacketIn {		
		/**
		 * The state of the game.
		 **/
		public var state:GameState;
		
		
		
		
		/**
		 * PacketInUpdt constructor.
		 **/
		public function PacketInUpdt(buffer:LegitBuffer) {
			_type = PacketType.UPDT;
	
			state = new GameState(buffer);
			buffer.trim(15);
		}
		/**
		 *
		 **/
		static public function tryReading(buffer:LegitBuffer):PacketInUpdt {
			if(buffer.length < 15) return null; // not enough data in the stream; packet incomplete
			return new PacketInUpdt(buffer);
		}
	}
}
