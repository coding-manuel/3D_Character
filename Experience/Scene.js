import * as THREE from "three";
export default class Scene {

	constructor() {

		const _VS = `
		varying vec3 vWorldPosition;
		void main() {
		vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
		vWorldPosition = worldPosition.xyz;
		gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`;


		const _FS = `
		uniform vec3 topColor;
		uniform vec3 bottomColor;
		uniform float offset;
		uniform float exponent;
		varying vec3 vWorldPosition;
		void main() {
		float h = normalize( vWorldPosition + offset ).y;
		gl_FragColor = vec4( mix( bottomColor, topColor, max( pow( max( h , 0.0), exponent ), 0.0 ) ), 1.0 );
		}`;

		this._scene = new THREE.Scene();

		this._scene.background = new THREE.Color( 0xFFFFFF );
		this._scene.fog = new THREE.FogExp2( 0x89b2eb, 0.002 );

		const hemiLight = new THREE.HemisphereLight( 0xFFFFFF, 0xFFFFFFF, 0.6 );
		hemiLight.color.setHSL( 0.6, 1, 0.6 );
		hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
		this._scene.add( hemiLight );

		const uniforms = {
			"topColor": { value: new THREE.Color( 0x0077ff ) },
			"bottomColor": { value: new THREE.Color( 0xffffff ) },
			"offset": { value: 33 },
			"exponent": { value: 0.6 }
		};
		uniforms[ "topColor" ].value.copy( hemiLight.color );

		this._scene.fog.color.copy( uniforms[ "bottomColor" ].value );

		const skyGeo = new THREE.SphereBufferGeometry( 1000, 32, 15 );
		const skyMat = new THREE.ShaderMaterial( {
			uniforms: uniforms,
			vertexShader: _VS,
			fragmentShader: _FS,
			side: THREE.BackSide
		} );

		const sky = new THREE.Mesh( skyGeo, skyMat );
		this._scene.add( sky );


		return this._scene;

	}

}
