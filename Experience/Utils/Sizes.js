import { EventEmitter } from "events";

export default class Sizes extends EventEmitter {

	constructor() {

		super();
		this._width = window.innerWidth;
		this._height = window.innerHeight;
		this._aspect = this._width / this._height;
		this._pixelRatio = Math.min( window.devicePixelRatio, 2 );

		window.addEventListener(
			"resize",
			() => {

				this._width = window.innerWidth;
				this._height = window.innerHeight;
				this._aspect = this._width / this._height;
				this._pixelRatio = Math.min( window.devicePixelRatio, 2 );
				this.emit( "resize" );

			},
			false
		);


	}

}
