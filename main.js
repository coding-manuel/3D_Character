import Experience from './Experience/Experience';
import './styles/index.css';


let _APP = null;

window.addEventListener( "DOMContentLoaded", () => {

	_APP = new Experience( document.querySelector( ".experience-canvas" ) );

} );

