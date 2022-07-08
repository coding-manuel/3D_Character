import Experience from "../Experience";

import CharacterController from './CharacterController';
import CharacterControllerInput from './CharacterControllerInput';

export default class Character {

    static instance

	constructor() {

        if ( Character.instance ) {

			return Character.instance;

		}

        Character.instance = this;

		this._experience = new Experience();
		this._scene = this._experience._scene;
		this._sizes = this._experience._sizes;
		this._input = new CharacterControllerInput();
		this._controller = new CharacterController();

	}

	_Resize() {

	}

	_Update(delta) {

        this._controller.Update(delta * 0.001)

	}

}
