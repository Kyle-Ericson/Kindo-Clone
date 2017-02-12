package {

	public class GameState {

		public var playersTurn: int = 0;
		public var winner: int = 0;
		public var cells: Array = new Array(
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, );

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
		}
	}
}