import * as THREE from "three";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import Experience from "../Experience";
import Character from "./Character";
import CharacterControllerProxy from "./CharacterControllerProxy";
import CharacterFSM from "./CharacterFSM";

export default class CharacterController {

	constructor() {

		this._experience = new Experience();
		this._scene = this._experience._scene;

		this._controller = new Character();
		this._input = this._controller._input;

		this._decceleration = new THREE.Vector3( - 0.0005, - 0.0001, - 5.0 );
		this._acceleration = new THREE.Vector3( 1, 0.25, 50.0 );
		this._velocity = new THREE.Vector3( 0, 0, 0 );
		this._position = new THREE.Vector3();

		this._animations = {};

		this._stateMachine = new CharacterFSM( new CharacterControllerProxy( this._animations ) );


		this._LoadModels();


	}


	_LoadModels() {

		this._manager = new THREE.LoadingManager();

		const loader = new GLTFLoader( this._manager );

		//load Bones
		loader.load( "./resources/characters/bone.glb", ( glb ) => {

			glb = glb.scene;

			let skeleton = glb.children[ 0 ].children[ 1 ].skeleton;

			glb.scale.set( 10, 10, 10 );

			glb.traverse( function ( node ) {

				node.frustumCulled = false;
				node.castShadow = true;


			} );

			let loader = new GLTFLoader( this._manager );
			loader.load( "./resources/characters/Tops/rpm_tshirt.glb", ( glb ) => {

				glb = glb.scene;

				glb.children[ 0 ].children.shift();

				glb.traverse( node => {

					node.frustumCulled = false;
					node.castShadow = true;

					if ( node.type == "SkinnedMesh" ) {

						node.scale.set( 10, 10, 10 );
						node.bind( skeleton );

					}

				} );

				this._scene.add( glb );

			} );

			loader.load( "./resources/characters/Bottom/black_jeans_bottom.glb", ( glb ) => {

				glb = glb.scene;

				glb.children[ 0 ].children.shift();

				glb.traverse( node => {

					node.frustumCulled = false;
					node.castShadow = true;

					if ( node.type == "SkinnedMesh" ) {

						node.scale.set( 10, 10, 10 );
						node.bind( skeleton );

					}

				} );

				this._scene.add( glb );

			} );

			loader.load( "./resources/characters/FootWear/white_sneakers.glb", ( glb ) => {

				glb = glb.scene;

				glb.children[ 0 ].children.shift();

				glb.traverse( node => {

					node.frustumCulled = false;
					node.castShadow = true;

					if ( node.type == "SkinnedMesh" ) {

						node.scale.set( 10, 10, 10 );
						node.bind( skeleton );

					}

				} );

				this._scene.add( glb );

			} );

			this._target = glb;

			this._scene.add( this._target );

			this._mixer = new THREE.AnimationMixer( this._target );

			this._manager.onLoad = () => {

				this._stateMachine.SetState( "idle" );

			};

			const _OnLoad = ( animName, anim ) => {

				const clip = anim.animations[ 0 ];
				const action = this._mixer.clipAction( clip );

				this._animations[ animName ] = {
					clip: clip,
					action: action,
				};

			};

			loader = new FBXLoader( this._manager );
			loader.setPath( "./resources/animations/" );
			loader.load( "idle.fbx", ( a ) => {

				_OnLoad( "idle", a );

			} );
			loader.load( "walk.fbx", ( a ) => {

				_OnLoad( "walk", a );

			} );
			loader.load( "walk_back.fbx", ( a ) => {

				_OnLoad( "walk_back", a );

			} );
			loader.load( "jog.fbx", ( a ) => {

				_OnLoad( "run", a );

			} );

		} );

	}

	get Position() {

		return this._position;

	}

	get Rotation() {

		if ( ! this._target ) {

			return new THREE.Quaternion();

		}

		return this._target.quaternion;

	}

	Update( timeInSeconds ) {

		if ( ! this._target ) {

			return;

		}

		this._stateMachine.Update( timeInSeconds, this._input );

		const velocity = this._velocity;
		const frameDecceleration = new THREE.Vector3(
			velocity.x * this._decceleration.x,
			velocity.y * this._decceleration.y,
			velocity.z * this._decceleration.z
		);
		frameDecceleration.multiplyScalar( timeInSeconds );
		frameDecceleration.z =
		  Math.sign( frameDecceleration.z ) *
		  Math.min( Math.abs( frameDecceleration.z ), Math.abs( velocity.z ) );

		velocity.add( frameDecceleration );

		const controlObject = this._target;
		const _Q = new THREE.Quaternion();
		const _A = new THREE.Vector3();
		const _R = controlObject.quaternion.clone();

		const acc = this._acceleration.clone();

		if ( this._input._keys.forward ) {

			if ( this._input._keys.shift ) {

				acc.multiplyScalar( 2.0 );

			}

			velocity.z += acc.z * timeInSeconds;

		}

		if ( this._input._keys.backward ) {

			velocity.z -= acc.z * timeInSeconds;

		}

		if ( this._input._keys.left ) {

			_A.set( 0, 1, 0 );
			_Q.setFromAxisAngle(
				_A,
				4.0 * Math.PI * timeInSeconds * this._acceleration.y
			);
			_R.multiply( _Q );

		}

		if ( this._input._keys.right ) {

			_A.set( 0, 1, 0 );
			_Q.setFromAxisAngle(
				_A,
				4.0 * - Math.PI * timeInSeconds * this._acceleration.y
			);
			_R.multiply( _Q );

		}

		controlObject.quaternion.copy( _R );

		const oldPosition = new THREE.Vector3();
		oldPosition.copy( controlObject.position );

		const forward = new THREE.Vector3( 0, 0, 1 );
		forward.applyQuaternion( controlObject.quaternion );
		forward.normalize();

		const sideways = new THREE.Vector3( 1, 0, 0 );
		sideways.applyQuaternion( controlObject.quaternion );
		sideways.normalize();

		sideways.multiplyScalar( velocity.x * timeInSeconds );
		forward.multiplyScalar( velocity.z * timeInSeconds );

		controlObject.position.add( forward );
		controlObject.position.add( sideways );

		this._position.copy( controlObject.position );

		if ( this._mixer ) {

			this._mixer.update( timeInSeconds );

		}

	}

}
