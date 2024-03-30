import React from 'react';
import './MainPage.css';

import { useState } from 'react';

import ImageDisplay from './ImageDisplay';
import TextDisplay from './TextDisplay';
import Button from './Button';

import * as tf from '@tensorflow/tfjs';

//initialise models
var bt_model = 0;
var az_model = 0;
var pk_model = 0;

//load models
async function loadModel() {
    bt_model = await tf.loadLayersModel('/tfjs_btmodel/model.json');
    az_model = await tf.loadLayersModel('/tfjs_azmodel/model.json');
    pk_model = await tf.loadLayersModel('/tfjs_pkmodel/model.json');
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
        //brain tumour model
        var bt_prediction = bt_model.predict(tensor_fin);
        bt_prediction = bt_prediction.arraySync();
        //alzheimer model
        var az_prediction = az_model.predict(tensor_fin);
        az_prediction = az_prediction.arraySync();
        //parkinsons model
        var pk_prediction = pk_model.predict(tensor_fin);
        pk_prediction = pk_prediction.arraySync();       
        
        //create results array - make sure class names are in right order!!!!
        const bt_class_names = ['Glioma', 'Meningioma', 'Notumor', 'Pituitary'];
        const az_class_names = ['Negative', 'Positive'];
        const pk_class_names = ['Negative', 'Positive'];
        
        //find max value, return value and position, return position from class names
        var bt_value = 0.0;
        var bt_max_value = 0.0;
        var bt_position = 0;
        for(let i=0; i < 4; i++)
        {
            bt_value = bt_prediction[0][i];

            if (bt_value > bt_max_value)
            {
                bt_max_value = bt_value;
                bt_position = i;
            }
        }

        var az_max_value = az_prediction[0];
        var az_position = 0;
        if (az_max_value > 0.5)
        {
            az_position = 1;
        }

        var pk_max_value = pk_prediction[0];
        var pk_position = 0;
        if (pk_max_value > 0.5)
        {
            pk_position = 1;
        }      

        setModelResult("Brain Tumour: " + bt_class_names[bt_position] + " - " + bt_max_value + "\n" 
                        + "Alzheimers: " + az_class_names[az_position] + " - " + az_max_value + "\n"
                        + "Parkinsons: " + pk_class_names[pk_position] + " - " + pk_max_value);
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
                        <input type='file' accept='.jpg, .png' onChange={handleImage}/>
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