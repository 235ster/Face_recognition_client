import React from 'react';
import './FaceRecognition.css'

const FaceRecognition= ({imageLink, box}) => {
	return(
		<div className="center ma">
			<div  className="absolute mt3">
				<img id='imgDim' alt='' src={imageLink} width='600px' height='auto'/>
				<div className="boundingBox" style={{top : box.topRow, right : box.rightCol, bottom : box.bottomRow, left : box.leftCol}}></div>
			</div>
		</div>
	);
}
export default FaceRecognition;