package {

	import flash.display.MovieClip;
	import flash.events.MouseEvent;
	import flash.text.TextFieldAutoSize;


	public class GSPlay extends GameScene {

		static public var playerid: int = 0;

		private var cells: Array = new Array();
		private var state: GameState;

		public function GSPlay(state: GameState) {
			cells.push(cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, cell9, cell10,
				cell11, cell12, cell13, cell14, cell15, cell16, cell17, cell18, cell19, cell20,
				cell21, cell22, cell23, cell24, cell25);
			
			
			if (playerid == 1 || playerid == 2) addListeners();

			updateState(state);


		}
		private function addListeners(): void {
			for each(var cell: Cell in cells) {
				cell.addEventListener(MouseEvent.CLICK, handleClick);
			}
		}
		private function handleClick(e: MouseEvent): void {
			if (e.target.currentFrame == 1) {
				var num: int = cells.indexOf(e.target) + 1; // use the index # of the cell to figure out which number it is
				Game.socket.sendMove(num);
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
			updatePromptText();
		}
		private function updatePromptText(): void {
			if (state.winner != 0) {
				if (playerid == 3) {

				} else {
					if (state.winner == playerid) {

					} else {

					}
				}
			} else if (state.playersTurn == playerid) {

			} else {
				
			}
		}
		override public function handlePacket(packet: PacketIn): void {
			switch (packet.type) {
				case PacketType.UPDT:
					updateState(PacketInUpdt(packet).state);
					break;
			} // end switch
		} // end handlePacket()
	}
}