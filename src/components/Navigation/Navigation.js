import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';
import './Navigation.css';


const Navigation= ({setChoice}) => {
	return(
		<div className='header'>
			<Tilt className="Tilt" options={{ max : 55 }} style={{ height: 150, width: 150 }}  >
	 			<div className="Tilt-inner pa4">
	 				<img src={brain} alt ='logo'/>
	 			</div>
			</Tilt>
			<div className= 'signout'>
				<p className='f3 link dim black underline pa2 pointer mv3' onClick={() => setChoice('signin')}>Sign Out</p>
			</div>

		</div>
		)
}
export default Navigation;
