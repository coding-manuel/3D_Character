import FiniteStateMachine from "./FiniteStateMachine";
import State from "./State";

export default class CharacterFSM extends FiniteStateMachine {

	constructor( proxy ) {

		super();
		this._proxy = proxy;

		this._AddState( "idle", IdleState );
		this._AddState( "walk", WalkState );
		this._AddState( "walk_back", WalkBackState );
		this._AddState( "run", RunState );
		// this._AddState('dance', DanceState)

	}

}

class IdleState extends State {

	constructor( parent ) {

		super( parent );

	}

	get Name() {

		return "idle";

	}

	Enter( prevState ) {

		const idleAction = this._parent._proxy.animations[ "idle" ].action;
		if ( prevState ) {

			const prevAction = this._parent._proxy.animations[ prevState.Name ].action;

			idleAction.time = 0.0;
			idleAction.enabled = true;
			idleAction.setEffectiveTimeScale( 1.0 );
			idleAction.setEffectiveWeight( 1.0 );
			idleAction.crossFadeFrom( prevAction, 0.5, true );
			idleAction.play();

		} else {

			idleAction.play();

		}

	}

	Exit() {}

	Update( _, input ) {

		if ( input._keys.forward ) {

			this._parent.SetState( "walk" );

		} else if ( input._keys.backward ) {

			this._parent.SetState( "walk_back" );

		}

	}

}

class WalkState extends State {

	constructor( parent ) {

		super( parent );

	}

	get Name() {

		return "walk";

	}

	Enter( prevState ) {

		const walkAction = this._parent._proxy.animations[ "walk" ].action;
		if ( prevState ) {

			const prevAction = this._parent._proxy.animations[ prevState.Name ].action;

			walkAction.time = 0.0;
			walkAction.enabled = true;
			walkAction.setEffectiveTimeScale( 1.0 );
			walkAction.setEffectiveWeight( 1.0 );
			walkAction.crossFadeFrom( prevAction, 0.5, true );
			walkAction.play();

		} else {

			walkAction.play();

		}

	}

	Exit() {}

	Update( _, input ) {

		if ( input._keys.forward ) {

			if ( input._keys.shift ) {

				this._parent.SetState( "run" );

			}

			return;

		}

		this._parent.SetState( "idle" );

	}

}

class WalkBackState extends State {

	constructor( parent ) {

		super( parent );

	}

	get Name() {

		return "walk_back";

	}

	Enter( prevState ) {

		const walkAction = this._parent._proxy.animations[ "walk_back" ].action;
		if ( prevState ) {

			const prevAction = this._parent._proxy.animations[ prevState.Name ].action;

			walkAction.time = 0.0;
			walkAction.enabled = true;
			walkAction.setEffectiveTimeScale( 1.0 );
			walkAction.setEffectiveWeight( 1.0 );
			walkAction.crossFadeFrom( prevAction, 0.5, true );
			walkAction.play();

		} else {

			walkAction.play();

		}

	}

	Exit() {}

	Update( _, input ) {

		if ( input._keys.backward ) {

			return;

		}

		this._parent.SetState( "idle" );

	}

}

class RunState extends State {

	constructor( parent ) {

		super( parent );

	}

	get Name() {

		return "run";

	}

	Enter( prevState ) {

		const runAction = this._parent._proxy.animations[ "run" ].action;

		if ( prevState ) {

			const prevAction = this._parent._proxy.animations[ prevState.Name ].action;

			runAction.enabled = true;

			if ( prevState.Name == "walk" ) {

				const ratio =
          prevAction.getClip().duration / prevAction.getClip().duration;
				prevAction.time = prevAction.time * ratio;

			} else {

				runAction.time = 0.0;
				runAction.setEffectiveTimeScale( 1.0 );
				runAction.setEffectiveWeight( 1.0 );

			}

			runAction.crossFadeFrom( prevAction, 0.5, true );
			runAction.play();

		} else {

			runAction.play();

		}

	}

	Exit() {}

	Update( timeElapsed, input ) {

		if ( input._keys.forward ) {

			if ( ! input._keys.shift ) {

				this._parent.SetState( "walk" );

			}

			return;

		}

		this._parent.SetState( "idle" );

	}

}
