package {

	import flash.display.MovieClip;
	import flash.events.*;
	import flash.text.*;


	public class GSPlay extends GameScene {

		static public var playerid: int = 0;

		private var cells: Array = new Array();
		private var state: GameState;

		public function GSPlay(state: GameState) {
			bttn1.addEventListener(MouseEvent.CLICK, handleSend);
				
			cells.push(
				cell1, cell2, cell3, cell4, cell5, 
			    cell6, cell7, cell8, cell9, cell10,
				cell11, cell12, cell13, cell14, cell15, 
			    cell16, cell17, cell18, cell19, cell20,
				cell21, cell22, cell23, cell24, cell25, 
			    cell26, cell27, cell28, cell29, cell30);


			if (playerid == 1 || playerid == 2) addListeners();
			if(playerid == 1) colorTxt.text = "You are: Black";
			if(playerid == 2) colorTxt.text = "You are: White";
			

			updateState(state);
			txt1.text = "Welcome!\n";
		


		}
		private function addListeners(): void {
		
			for each(var cell: Cell in cells) {
					cell.addEventListener(MouseEvent.CLICK, handleClick);
			}
		}
		private function handleClick(e: MouseEvent): void {
			trace("Click");
			if (e.target.currentFrame == playerid + 1) {
				var num: int = cells.indexOf(e.target); // use the index # of the cell to figure out which number it is
				
				// check the left
				if(cells[num - 1] && cells[num - 1].currentFrame == playerid + 1) {
					cells[num - 1].gotoAndStop(1);
				}
			}
		}
		private function handleSend(e:MouseEvent):void {
			
			if(txt2.text != "") {
				
				Game.socket.sendChat(txt2.text);
				txt2.text = "";
			}
		}
		override public function dispose(): void {
			for each(var cell: Cell in cells) {
				cell.removeEventListener(MouseEvent.CLICK, handleClick);
			}
		}
		private function updateState(state: GameState): void {

			this.state = state;

			for (var i: int = 0; i < state.cells.length; i++) {
				cells[i].gotoAndStop(state.cells[i] + 1);
			}
		}
		private function updateMessages(username:String, msg:String) {
			txt1.appendText("["+username+"] " + msg + "\n");
		}
		override public function handlePacket(packet: PacketIn): void {
			
			switch (packet.type) {
				case PacketType.UPDT:
					updateState(PacketInUpdt(packet).state);
					break;
				case PacketType.CHAT:
					updateMessages(PacketInChat(packet).username, PacketInChat(packet).msg);					
					break;
			} // end switch
		} // end handlePacket()
	}
}