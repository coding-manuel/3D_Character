import * as THREE from 'three';
import Experience from "./Experience";

export default class Renderer {

	constructor() {

		this._experience = new Experience();
		this._scene = this._experience._scene;
		this._sizes = this._experience._sizes;
		this._canvas = this._experience._canvas;
		this._camera = this._experience._camera;
		this._setRenderer();

	}

	_setRenderer() {

		this._threejs = new THREE.WebGLRenderer( {
			canvas: this._canvas,
			antialias: true
		} );

		this._threejs.physicallyCorrectLights = true;
		this._threejs.toneMapping = THREE.CineonToneMapping;
		this._threejs.toneMappingExposure = 1.25;
		this._threejs.shadowMap.enabled = true;
		this._threejs.shadowMap.type = THREE.PCFSoftShadowMap;
		this._threejs.setSize( this._sizes._width, this._sizes._height );
		this._threejs.setPixelRatio( this._sizes._pixelRatio );

	}

	_Resize() {

		this._threejs.setSize( this._sizes._width, this._sizes._height );
		this._threejs.setPixelRatio( this._sizes._pixelRatio );

	}

	_Update() {

		this._threejs.render( this._scene, this._camera._camera );

	}

}
