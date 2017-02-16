package {

	public class GameState {

		public var playersTurn: int = 1;
		public var winner: int = 0;
		public var cells: Array = new Array(
			2, 2, 2, 2, 2, 
			2, 2, 2, 2, 2, 
			0, 0, 0, 0, 0, 
			0, 0, 0, 0, 0,
			1, 1, 1, 1, 1, 
			1, 1, 1, 1, 1);

		public function GameState(stream: LegitBuffer) {
			playersTurn = stream.readUInt8(4);
			winner = stream.readUInt8(5);
			cells[0] = stream.readUInt8(6);
			cells[1] = stream.readUInt8(7);
			cells[2] = stream.readUInt8(8);
			cells[3] = stream.readUInt8(9);
			cells[4] = stream.readUInt8(10);
			cells[5] = stream.readUInt8(11);
			cells[6] = stream.readUInt8(12);
			cells[7] = stream.readUInt8(13);
			cells[8] = stream.readUInt8(14);
			cells[9] = stream.readUInt8(15);
			cells[10] = stream.readUInt8(16);
			cells[11] = stream.readUInt8(17);
			cells[12] = stream.readUInt8(18);
			cells[13] = stream.readUInt8(19);
			cells[14] = stream.readUInt8(20);
			cells[15] = stream.readUInt8(21);
			cells[16] = stream.readUInt8(22);
			cells[17] = stream.readUInt8(23);
			cells[18] = stream.readUInt8(24);
			cells[19] = stream.readUInt8(25);
			cells[20] = stream.readUInt8(26);
			cells[21] = stream.readUInt8(27);
			cells[22] = stream.readUInt8(28);
			cells[23] = stream.readUInt8(29);
			cells[24] = stream.readUInt8(30);
		}
	}
}