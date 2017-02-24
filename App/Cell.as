package  {

	import flash.display.MovieClip;
	import flash.events.MouseEvent;


	public class Cell extends MovieClip {


        public var selected:Boolean = false;


		public function Cell() {
			stop();
		}
        public function update() {
            if(selected) gotoAndStop(currentFrame + 3);
        }
		public function reset(){
			gotoAndStop(currentFrame - 3);
		}

	}
}
