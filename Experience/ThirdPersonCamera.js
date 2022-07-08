import { Vector3 } from "three";
import Character from "./Character/Character";
import Experience from "./Experience";

export default class ThirdPersonCamera {

	constructor() {

		this._experience = new Experience();
		this._camera = this._experience._camera._camera;

		this._controls = new Character();
		this._controller = this._controls._controller;

		this._currentPosition = new Vector3();
		this._currentLookat = new Vector3();

	}

	_CalculateOffset( vector ) {

		const idealLookat = vector;
		idealLookat.applyQuaternion( this._controller.Rotation );
		idealLookat.add( this._controller.Position );
		return idealLookat;

	}

	Update( timeElapsed ) {

		const idealOffset = this._CalculateOffset( new Vector3( - 1, 20, - 30 ) );
		const idealLookat = this._CalculateOffset( new Vector3( 0, 10, 50 ) );

		const t = 1.0 - Math.pow( 0.9, timeElapsed * 0.07 );

		this._currentPosition.lerp( idealOffset, t );
		this._currentLookat.lerp( idealLookat, t );

		this._camera.position.copy( this._currentPosition );
		this._camera.lookAt( this._currentLookat );

	}

}
