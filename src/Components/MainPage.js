import React from 'react';
import './MainPage.css';

import { useState } from 'react';

import ImageDisplay from './ImageDisplay';
import TextDisplay from './TextDisplay';
import Button from './Button';

import * as tf from '@tensorflow/tfjs';

var model = 0;
async function loadModel() {
    model = await tf.loadLayersModel('/tfjs_model/model.json');
}

function MainPage() {

    //load the model
    loadModel();

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
        setModelResult('Model Running...'); 

        //img = img.resize(180,180)
        var elem = document.createElement('canvas');
        var ctx = elem.getContext('2d');
        var resizedImage = new Image();
        resizedImage.src = uploadedImage;
        ctx.drawImage(resizedImage, 0, 0, 180, 180);

        //img_array = tf.keras.utils.img_to_array(img)
        const imageData = ctx.getImageData(0, 0, 180, 180);
        const tensor = tf.browser.fromPixels(imageData)

        //img_array = np.expand_dims(img_array, axis=0)
        const tensor_fin = tensor.expandDims();

        //predict on image, convert result tensor to array
        var prediction = model.predict(tensor_fin);
        prediction = prediction.arraySync();
        
        //create results array - make sure class names are in right order!!!!
        const results_array = {'glioma': prediction[0][0], 'meningioma': prediction[0][1], 'notumor': prediction[0][2], 'pituitary': prediction[0][3]};
        
        console.log(results_array);

        setModelResult(Object.entries(results_array));
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
                    <p>Data Visualisation</p>   
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