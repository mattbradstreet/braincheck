import React from 'react';
import './MainPage.css';

import { useState } from 'react';

import ImageDisplay from './ImageDisplay';
import TextDisplay from './TextDisplay';
import Button from './Button';

function MainPage() {

    const [uploadedImage, setUploadedImage] = useState();

    const handleImage = (event) => 
    {
        const imageFile = event.target.files[0];

        if (imageFile !== null) {

            const reader = new FileReader();
            reader.onloadend = () => setUploadedImage(reader.result);
            reader.readAsDataURL(imageFile);
        }
    }

    return (
        <>
            <div class="main">

                <div class="column">
                    <ImageDisplay image={uploadedImage}/>
                    <p>Original Image</p> 
                    <div class="messageArea">
                        <TextDisplay label='Application Messages:'/>
                    </div>
                    <div class="input">
                        <input type='file' onChange={handleImage}/>
                    </div>
                </div>

                <div class="column">                 
                    <ImageDisplay/>
                    <p>Processed Image</p>   
                    <div class="messageArea">
                        <TextDisplay label='Model Results:'/>
                    </div>
                    <div class="buttons">
                        <Button label='Run Model' />
                        <Button label='Abort Model' />
                        <Button label='Print Results' />
                        <Button label='Clear Results' />
                    </div>
                </div>

            </div>
        </>
    );
}

export default MainPage;