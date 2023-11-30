import React from 'react';

import testImage from './test.jpg';

function ImageDisplay() {
    return (
        <>
            <div style={{width:'100%', height:'60%', border:'1px solid #333'}}>
                <img src={testImage} alt='Test of brain' style={{width:'100%', height:'100%'}}/>
            </div>
        </>
    );
}

export default ImageDisplay;