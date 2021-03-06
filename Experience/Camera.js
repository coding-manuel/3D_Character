import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Experience from "./Experience";

export default class Camera {

	constructor() {

		this._experience = new Experience();
		this._scene = this._experience._scene;
		this._sizes = this._experience._sizes;
		this._CreateCamera();

	}

	_CreateCamera() {

		const fov = 60;
		const near = 1.0;
		const far = 10000.0;
		this._camera = new THREE.PerspectiveCamera( fov, this._sizes._aspect, near, far );
		this._camera.updateProjectionMatrix();
		const controls = new OrbitControls( this._camera, this._experience._canvas );
		controls.update();


		this._camera.position.set( 10, 20, 80 );

	}

	_Resize() {

		this._camera.aspect = this._sizes._aspect;
		this._camera.updateProjectionMatrix();

	}

	_Update() {

	}

}
