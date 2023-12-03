import React from 'react';
import './MainPage.css';

import { useState } from 'react';

import ImageDisplay from './ImageDisplay';
import TextDisplay from './TextDisplay';
import Button from './Button';

function MainPage() {

    //handles image upload
    const [uploadedImage, setUploadedImage] = useState();
    const [appMessage, setAppMessage] = useState('');
    const handleImage = (event) => 
    {
        const imageFile = event.target.files[0];

        if (imageFile !== null) {

            const reader = new FileReader();
            reader.onloadend = () => setUploadedImage(reader.result);
            reader.readAsDataURL(imageFile);
            setAppMessage('Image Uploaded Successfully.');
        }
        else
        {
            setAppMessage('Image Upload Failed');
        }
    }

    //handles Run Model button
    const [modelResult, setModelResult] = useState('');
    const runModel = (event) =>
    {
        //run model?
        setModelResult('Model Running...');
    }

    //handles Abort Model button
    const abortModel = (event) =>
    {
        //abort model?
        setModelResult('Model Run Aborted.');
    }    

    //handles Print Results button
    const printResults = (event) =>
    {
        setModelResult('');
        window.print();
    }  
    
    //handles Clear Results button
    const clearResults = (event) =>
    {
        setUploadedImage();
        setAppMessage('');
        setModelResult('');
    }      


    return (
        <>
            <div className="main">

                <div className="column">
                    <ImageDisplay image={uploadedImage}/>
                    <p>Original Image</p> 
                    <div className="messageArea">
                        <TextDisplay label='Application Messages:' text={appMessage}/>
                    </div>
                    <div className="input">
                        <input type='file' accept='.jpg' onChange={handleImage}/>
                    </div>
                </div>

                <div className="column">                 
                    <ImageDisplay/>
                    <p>Processed Image</p>   
                    <div className="messageArea">
                        <TextDisplay label='Model Results:' text={modelResult}/>
                    </div>
                    <div className="buttons">
                        <Button label='Run Model' click={runModel}/>
                        <Button label='Abort Model' click={abortModel}/>
                        <Button label='Print Results' click={printResults}/>
                        <Button label='Clear Results' click={clearResults}/>
                    </div>
                </div>

            </div>
        </>
    );
}

export default MainPage;