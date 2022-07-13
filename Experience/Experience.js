import * as THREE from 'three';

import Sizes from './Utils/Sizes';
import Time from './Utils/Time';

import Camera from './Camera';
import Renderer from './Renderer';
import Scene from './Scene';

import World from './World/World';

import Character from './Character/Character'
import ThirdPersonCamera from './ThirdPersonCamera';

export default class Experience {

    static instance

	constructor( canvas ) {

		if ( Experience.instance ) {

			return Experience.instance;

		}

		Experience.instance = this;
		this._canvas = canvas;
		this._scene = new Scene();
		this._time = new Time();
		this._sizes = new Sizes();
		this._camera = new Camera();
		this._renderer = new Renderer();
        this._world = new World();
        this._controls = new Character();
		this._thirdPersonCamera = new ThirdPersonCamera();


		this._time.on( "update", (delta) => {
			this._Update(delta);

		} );

		this._sizes.on( "resize", () => {

			this._Resize();

		} );

	}

	_Resize() {

		this._camera._Resize();
		this._renderer._Resize();

	}

	_Update(delta) {

		this._camera._Update();
		this._renderer._Update();
		this._controls._Update(delta);
		// this._thirdPersonCamera.Update(delta);

	}

}
