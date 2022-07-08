import { EventEmitter } from "events";

export default class Time extends EventEmitter {

	constructor() {

		super();
		this._start = Date.now();
		this._current = this._start;
		this._elapsed = 0;
		this._delta = 16;

		this._Update();


	}

	_Update() {

		const currentTime = Date.now();
		this._delta = currentTime - this._current;
		this._current = currentTime;
		this._elapsed = this._current - this._start;

		this.emit( "update", this._delta );

		window.requestAnimationFrame( ( ) => {

			this._Update();

		} );

	}

}
