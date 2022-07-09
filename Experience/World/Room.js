import * as THREE from 'three';
import Experience from "../Experience";

export default class Room {

	constructor() {

		this._experience = new Experience();
		this._scene = this._experience._scene;


		const plane = new THREE.Mesh(
			new THREE.PlaneGeometry( 5000, 5000, 1, 1 ),
			new THREE.MeshPhongMaterial( {
				color: 0xffffff,
			} )
		);
		plane.castShadow = true;
		plane.receiveShadow = true;
		plane.rotation.x = - Math.PI / 2;
		this._scene.add( plane );

	}

	_Resize() {


	}

	_Update() {


	}

}
