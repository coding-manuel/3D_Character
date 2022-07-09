import * as THREE from 'three';
import Experience from "../Experience";

export default class Room {

	constructor() {

		this._experience = new Experience();
		this._scene = this._experience._scene;

		let light = new THREE.DirectionalLight( 0xffffff );
		light.position.set( 100, 100, 100 );
		light.target.position.set( 0, 0, 0 );
		light.castShadow = true;
		light.shadow.bias = - 0.001;
		light.shadow.mapSize.width = 4096;
		light.shadow.mapSize.height = 4096;
		light.shadow.camera.near = 0.1;
		light.shadow.camera.far = 500.0;
		light.shadow.camera.near = 0.5;
		light.shadow.camera.far = 500.0;
		light.shadow.camera.left = 50;
		light.shadow.camera.right = - 50;
		light.shadow.camera.top = 50;
		light.shadow.camera.bottom = - 50;
		light.intensity = 4;


		light = new THREE.AmbientLight( 0x404040 );

		light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
		this._scene.add( light );


		const plane = new THREE.Mesh(
			new THREE.PlaneGeometry( 100, 100, 1, 1 ),
			new THREE.MeshStandardMaterial( {
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
