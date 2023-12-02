import React from 'react';

import defaultImage from './defaultImage.jpg';

function ImageDisplay(props) {    

    var displayedImage = defaultImage;

    if(props.image)
    {
        displayedImage = props.image;
    }

    return (
        <>
            <div style={{width:'100%', height:'60%', border:'1px solid #333'}}>
                <img src={displayedImage} alt='Test of brain' style={{width:'100%', height:'100%'}}/>
            </div>
        </>
    );
}

export default ImageDisplay;