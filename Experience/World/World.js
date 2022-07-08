import * as THREE from 'three';
import Experience from "../Experience";

import Room from './Room';

export default class World {

	constructor() {

		this._experience = new Experience();
		this._scene = this._experience._scene;
		this._sizes = this._experience._sizes;
		this._canvas = this._experience._canvas;
		this._camera = this._experience._camera;
		this._room = new Room();

	}

	_Resize() {


	}

	_Update() {


	}

}
