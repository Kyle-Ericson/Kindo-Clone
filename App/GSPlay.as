package {

	import flash.display.MovieClip;
	import flash.events.*;
	import flash.text.*;


	public class GSPlay extends GameScene {

		static public var playerid: int = 0;

		private var cells: Array = new Array();
		private var state: GameState;
		private var waitingClick2: Boolean = false;
		private var click1: int;
		private var click2: int;

		public function GSPlay(state: GameState) {
			bttn1.addEventListener(MouseEvent.CLICK, handleSend);
			bttn2.addEventListener(MouseEvent.CLICK, handleLeaveGame);

			cells.push(
				cell1, cell2, cell3, cell4, cell5,
				cell6, cell7, cell8, cell9, cell10,
				cell11, cell12, cell13, cell14, cell15,
				cell16, cell17, cell18, cell19, cell20,
				cell21, cell22, cell23, cell24, cell25,
				cell26, cell27, cell28, cell29, cell30);


			if (playerid == 1 || playerid == 2) addListeners();
			if (playerid == 1) colorTxt.text = "You are: Black";
			if (playerid == 2) colorTxt.text = "You are: White";
			if (playerid == 3) {
				colorTxt.text = "Spectating";
				turnTxt.text = "Spectating";
			}


			updateState(state);
			txt1.text = "Welcome!\n";



		}
		private function addListeners(): void {

			for each(var cell: Cell in cells) {
				cell.addEventListener(MouseEvent.CLICK, handleClick);
			}
		}
		private function handleClick(e: MouseEvent): void {
			if (waitingClick2) {
				handleSecondClick(e);
				return;
			}

			if (e.target.currentFrame == playerid + 1) {
				click1 = cells.indexOf(e.target) + 1;
				waitingClick2 = true;

				//highlight possible moves
				highLightMoves();
			}
			updateCells();
		}
		private function handleSecondClick(e: MouseEvent): void {

			click2 = cells.indexOf(e.target) + 1;
			Game.socket.sendMove(click1, click2);

			for each(var cell: Cell in cells) {cell.selected = false;}
			waitingClick2 = false;
		}
		//
		private function handleSend(e: MouseEvent): void {

			if (txt2.text != "") {

				Game.socket.sendChat(txt2.text);
				txt2.text = "";
			}
		}
		override public function dispose(): void {
			for each(var cell: Cell in cells) {
				cell.removeEventListener(MouseEvent.CLICK, handleClick);
			}
		}
		private function updateCells() {
			for each(var cell: Cell in cells) {
				cell.update();
			}
		}
		private function updateState(state: GameState): void {

			this.state = state;

			for (var i: int = 0; i < state.cells.length; i++) {
				cells[i].gotoAndStop(state.cells[i] + 1);
			}
			updateText();
			if (state.winner != 0) dispose();
		}
		private function updateText(): void {
			if (playerid == 1 || playerid == 2) {
				if (state.playersTurn == playerid) turnTxt.text = "Your Turn!";
				else turnTxt.text = "Waiting...";
			}
			if (state.winner != 0) {
				if (playerid == 3) {
					colorTxt.text = "Player " + state.winner + " wins!";
					turnTxt.text = "Player " + state.winner + " wins!";
				} else if (state.winner != playerid) {
					colorTxt.text = "You Lose!";
					turnTxt.text = "You Lose!";
				} else {
					colorTxt.text = "You Win!";
					turnTxt.text = "You Win!";
				}
			}

		}
		private function handleLeaveGame(e: MouseEvent){
			Game.socket.sendLeave();
			Game.showScene(new GSLobby());
		}
		private function highLightMoves(): void {
			//Left
			if (click1 - 1 != 0 &&
				click1 - 1 != 5 &&
				click1 - 1 != 10 &&
				click1 - 1 != 15 &&
				click1 - 1 != 20 &&
				click1 - 1 != 25) {

				if (cells[click1 - 2] && cells[click1 - 2].currentFrame == playerid + 1 &&
					click1 - 2 != 0 &&
					click1 - 2 != 5 &&
					click1 - 2 != 10 &&
					click1 - 2 != 15 &&
					click1 - 2 != 20 &&
					click1 - 2 != 25) {

					if (cells[click1 - 3] && cells[click1 - 3].currentFrame != playerid + 1) {
						cells[click1 - 3].selected = true;
					}
				}
			}
			//Right
			if (click1 - 1 != 4 &&
				click1 - 1 != 9 &&
				click1 - 1 != 14 &&
				click1 - 1 != 19 &&
				click1 - 1 != 24 &&
				click1 - 1 != 29) {

				if (cells[click1] && cells[click1].currentFrame == playerid + 1 &&
					click1 != 4 &&
					click1 != 9 &&
					click1 != 14 &&
					click1 != 19 &&
					click1 != 24 &&
					click1 != 29) {

					if (cells[click1 + 1] && cells[click1 + 1].currentFrame != playerid + 1) {
						cells[click1 + 1].selected = true;
					}
				}
			}
			//Up
			if (click1 - 1 != 0 &&
				click1 - 1 != 1 &&
				click1 - 1 != 2 &&
				click1 - 1 != 3 &&
				click1 - 1 != 4) {

				if (cells[click1 - 6] && cells[click1 - 6].currentFrame == playerid + 1 &&
					click1 - 6 != 0 &&
					click1 - 6 != 1 &&
					click1 - 6 != 2 &&
					click1 - 6 != 3 &&
					click1 - 6 != 4) {

					if (cells[click1 - (6 + 5)] && cells[click1 - (6 + 5)].currentFrame != playerid + 1) {
						cells[click1 - (6 + 5)].selected = true;
					}
				}
			}
			//Down
			if (click1 - 1 != 25 &&
				click1 - 1 != 26 &&
				click1 - 1 != 27 &&
				click1 - 1 != 28 &&
				click1 - 1 != 29) {

				if (cells[click1 + 4] && cells[click1 + 4].currentFrame == playerid + 1 &&
					click1 + 4 != 25 &&
					click1 + 4 != 26 &&
					click1 + 4 != 27 &&
					click1 + 4 != 28 &&
					click1 + 4 != 29) {

					if (cells[click1 + (4 + 5)] && cells[click1 + (4 + 5)].currentFrame != playerid + 1) {
						cells[click1 + (4 + 5)].selected = true;
					}
				}
			}

		}
		private function updateMessages(username: String, msg: String) {
			txt1.appendText("[" + username + "] " + msg + "\n");
		}
		override public function handlePacket(packet: PacketIn): void {
			trace(packet.type);
			switch (packet.type) {
				
				case PacketType.UPDT:
					updateState(PacketInUpdt(packet).state);
					break;
				case PacketType.CHAT:
					updateMessages(PacketInChat(packet).username, PacketInChat(packet).msg);
					break;
				case PacketType.LEAV:
					Game.showScene(new GSLobby());
					break;
			} // end switch
		} // end handlePacket()
	}
}