package  {
	
	import flash.display.MovieClip;
	import flash.events.KeyboardEvent;
	import flash.events.MouseEvent;
	
	/**
	 * This is the Login Scene.
	 **/
	public class GSLogin extends GameScene {
		/**
		 * This is the Login constructor.
		 **/
		public function GSLogin() {
			txt1.addEventListener(KeyboardEvent.KEY_DOWN, handleKey);
			txt2.addEventListener(KeyboardEvent.KEY_DOWN, handleKey);
			bttn.addEventListener(MouseEvent.CLICK, handleClick);
		}
		/**
		 * This function handles keypresses. 
		 * In this case, we are waiting for the enter key.
		 **/
		function handleKey(e:KeyboardEvent):void {
			if(e.keyCode == 13) connect();
		}
		/**
		 * This handles the button click for the submit button.
		 **/
		function handleClick(e:MouseEvent):void {
			connect();
		}
		/**
		 * This function connects the socket to the server
		 * using the inputs for the ip and the port.
		 **/
		function connect():void {
			Game.socket.connect(txt1.text, int(txt2.text));
		}	
		/**
		 * This function disposes of the event listeners in this scene.
		 **/
		public override function dispose():void {
			txt1.removeEventListener(KeyboardEvent.KEY_DOWN, handleKey);
			txt2.removeEventListener(KeyboardEvent.KEY_DOWN, handleKey);
			bttn.removeEventListener(MouseEvent.CLICK, handleClick);
		}
	}
}
