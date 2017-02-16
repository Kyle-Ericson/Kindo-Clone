package {
	import flash.net.Socket;
	import flash.utils.ByteArray;
	import flash.events.Event;
	import flash.events.IOErrorEvent;
	import flash.events.ProgressEvent;
	import flash.events.DataEvent;
	
	public class Connection extends Socket {

		var buffer:LegitBuffer = new LegitBuffer();
		
		public function Connection() {
			addEventListener(Event.CONNECT, handleConnect);
			addEventListener(IOErrorEvent.IO_ERROR, handleError);
			addEventListener(Event.CLOSE, handleClose);
			addEventListener(ProgressEvent.SOCKET_DATA, handleData);
		}
		private function handleConnect(e:Event):void {
			Game.showScene(new GSLobby());
		}
		private function handleError(e:IOErrorEvent):void {
			
		}
		private function handleClose(e:Event):void {
			Game.showScene(new GSLogin());
		}
		private function handleData(e:ProgressEvent):void {
			
			readBytes(buffer.byteArray, buffer.length);
		
			while(buffer.length >= 4){

				var keepLooping:Boolean = tryReadingPacket();
				if(!keepLooping) break;
			}
			
		} // end handleData()
		/**
		 * This method attempts to read a packet from the input stream.
		 * If there's not enough info to determine packet type (4 bytes),
		 * the method will return false.
		 *
		 * If there
		 **/
		private function tryReadingPacket():Boolean {
			
			// buffer.print();
			
			if(buffer.length < 4) return false; // not enough info to read
			
			var packet:PacketIn = null;
			
			switch(getNextPacketType()){
				case PacketType.JOIN: packet = PacketInJoin.tryReading(buffer); break;
				case PacketType.UPDT: packet = PacketInUpdt.tryReading(buffer); break;
				case PacketType.WAIT: packet = PacketInWait.tryReading(buffer); break;
				case PacketType.CHAT: packet = PacketInChat.tryReading(buffer); break;
				default: // unknown packet type...
					// there's unrecognized data in the stream, so
					// purge one character from the stream:
					buffer.trim(); 
					return true; // keep looping
			}
			
			if(packet != null) { // a packet was found and extracted from the buffer!
				Game.handlePacket(packet); // pass the packet along to the Game class
				return true; // keep looking for packets; there may be more in the input stream
			}
			
			// a packet was found, but its data is incomplete...
			return false; // stop looking for packets, wait for more data
		}
		private function getNextPacketType():String {
			if(buffer.length < 4) return "";
			return buffer.slice(0, 4).toString();
		}
		
		//////////////////////// BUILDING PACKETS: ///////////////////////////////
		
		// Use ONLY this method for sending.
		// This will ensure that everything you send will use the LegitBuffer class
		public function write(buffer:LegitBuffer):void {
			writeBytes(buffer.byteArray);
			flush();
		}
		
		public function sendJoinRequest(playMode:Boolean, username:String, gameId:int):void {
			var buffer:LegitBuffer = new LegitBuffer();
			buffer.write("JOIN");
			buffer.writeUInt8(playMode ? 1 : 2, 4);
			buffer.writeUInt8(gameId, 5);
			buffer.writeUInt8(username.length, 6);
			buffer.write(username, 7);
			
			write(buffer);
		}
		public function sendHostRequest(username:String) {
			var buffer:LegitBuffer = new LegitBuffer();
			buffer.write("HOST");
			buffer.writeUInt8(username.length, 4);
			buffer.write(username, 5);
			
			write(buffer);
		}
		public function sendMove(cell:int):void {
			var buffer:LegitBuffer = new LegitBuffer();
			buffer.write("MOVE");
			buffer.writeUInt8(cell, 4);
			
			write(buffer);
		}
		public function sendChat(msg:String) {
			var buffer:LegitBuffer = new LegitBuffer();
			buffer.write("CHAT");
			buffer.writeUInt8(msg.length, 4);
			buffer.write(msg, 5);
			
			write(buffer);
		}
		
	}
}
