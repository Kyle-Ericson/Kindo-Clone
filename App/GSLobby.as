package {

	import flash.display.MovieClip;
	import flash.events.MouseEvent;


	/**
	 * This is the Lobby Scene.
	 **/
	public class GSLobby extends GameScene {

		/**
		 * This is the lobby scene constructor.
		 **/
		public function GSLobby() {
			//txt1.addEventListener(KeyboardEvent.KEY_DOWN, handleKey);
			bttn1.addEventListener(MouseEvent.CLICK, handleClickPlay);
			bttn2.addEventListener(MouseEvent.CLICK, handleClickSpectate);
			bttn3.addEventListener(MouseEvent.CLICK, handleClickHost);
		}
		/**
		 * This handles the mouse click event for the play button.
		 **/
		function handleClickPlay(e: MouseEvent): void {
			Game.socket.sendJoinRequest(true, txt1.text, int(txt2.text));
		}
		/**
		 * This handles the mouse click event for the specate button.
		 **/
		function handleClickSpectate(e: MouseEvent): void {
			Game.socket.sendJoinRequest(false, txt1.text, int(txt2.text));
		}
		function handleClickHost(e: MouseEvent): void {
			Game.socket.sendHostRequest(txt1.text);
		}
		/**
		 * This removes all event listeners.
		 **/
		public override function dispose(): void {
			bttn1.removeEventListener(MouseEvent.CLICK, handleClickPlay);
			bttn2.removeEventListener(MouseEvent.CLICK, handleClickSpectate);
			bttn3.removeEventListener(MouseEvent.CLICK, handleClickHost);
		}
		/**
		 * This handles any incoming packets.
		 * In this scene we are only expecting join packets.
		 **/
		override public function handlePacket(packet: PacketIn): void {
			
			
			switch (packet.type) {
				
				case PacketType.JOIN:
					var joinPacket:PacketInJoin = PacketInJoin(packet);
				
					if (joinPacket.errcode == 0) {
						GSPlay.playerid = joinPacket.playerid;
						Game.showScene(new GSWait());
					}
					else errorText.text = "Error: " + joinPacket.errmsg();
					break;
			}
		}
	}
}