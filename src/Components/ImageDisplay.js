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
            <div style={{width:'100%', height:'60%'}}>
                <img src={displayedImage} alt='Test of brain' style={{width:'100%', height:'100%', borderRadius:'5px', border:'1px solid #000'}}/>
            </div>
        </>
    );
}

export default ImageDisplay;