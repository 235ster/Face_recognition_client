import React from 'react';

const ImageSearch= ({onSearch, onButtonClick}) => {
	return(
		<div>
			<div className = "center pa3 f4 b"> Upload an image link for magic Brain to detect the face</div>
			<div className='center'>
				<input className='w-40 pa1' type='text' onChange={onSearch}/>
				<button className='w-5 bg-light-yellow grow pa1 normal' onClick={onButtonClick}>Detect</button>
			</div>
		</div>
	);
}
export default ImageSearch;