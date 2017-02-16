package  {
	
	public class GSWait extends GameScene {
		
		
		
		
		
		public function GSWait(num) {
			gameidText.text = "This game's id number is: " + num;
		}
		override public function handlePacket(packet:PacketIn):void {
			trace(packet.type);
			switch(packet.type){
				case PacketType.UPDT:
					Game.showScene(new GSPlay(PacketInUpdt(packet).state));
					break;
			} // end switch
		} // end handlePacket()
	} // end class
} // end package
