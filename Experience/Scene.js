import * as THREE from "three";
export default class Scene {

	constructor() {

		this._scene = new THREE.Scene();

		const loader = new THREE.CubeTextureLoader();
		let texture = loader.load( [
			"./resources/skybox/px.png",
			"./resources/skybox/nx.png",
			"./resources/skybox/py.png",
			"./resources/skybox/ny.png",
			"./resources/skybox/pz.png",
			"./resources/skybox/nz.png",
		] );
		this._scene.background = texture;

		return this._scene;

	}

}
