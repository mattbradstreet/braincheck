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

//initalise visualisations values and colours
var bt_graph_value1 = 0.0;
var bt_graph_value2 = 0.0;
var bt_graph_value3 = 0.0;
var bt_graph_value4 = 0.0;
var az_graph_value = 0.0;
var pk_graph_value = 0.0;
var az_graph_colour = 'powderBlue';
var pk_graph_colour = 'powderBlue';

//load models
async function loadModel() {
    bt_model = await tf.loadLayersModel('/tfjs_btmodel/model.json');
    az_model = await tf.loadLayersModel('/tfjs_azmodel/model.json');
    pk_model = await tf.loadLayersModel('/tfjs_pkmodel/model.json');
}

function MainPage() {

    //load the models
    loadModel();

    //handles image upload
    const [uploadedImage, setUploadedImage] = useState();
    const [appMessage, setAppMessage] = useState('');
    const handleImage = (event) => 
    {
        clearResults();

        const imageFile = event.target.files[0];

        if (imageFile !== null && (imageFile.type === 'image/jpeg' || imageFile.type === 'image/png')) {

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
        if(uploadedImage === undefined)
        {
            setModelResult('Model Error, upload valid image before running model.');
        }
        else
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
                az_graph_colour = 'firebrick';
            }
            if (az_max_value < 0.0001)  
            {
                az_max_value = 0.00;
            }  

            var pk_max_value = pk_prediction[0];
            var pk_position = 0;
            if (pk_max_value > 0.5)
            {
                pk_position = 1;
                pk_graph_colour = 'firebrick';
            }
            if (pk_max_value < 0.0001)  
            {
                pk_max_value = 0.00;
            }    

            setModelResult("Brain Tumour: " + bt_class_names[bt_position] + " - " + bt_max_value + "\n" 
                            + "Alzheimers: " + az_class_names[az_position] + " - " + az_max_value + "\n"
                            + "Parkinsons: " + pk_class_names[pk_position] + " - " + pk_max_value);
            
            bt_graph_value1 = (130 * bt_prediction[0][0]);
            bt_graph_value2 = (130 * bt_prediction[0][1]);
            bt_graph_value3 = (130 * bt_prediction[0][2]);
            bt_graph_value4 = (130 * bt_prediction[0][3]);
            az_graph_value = (130 * az_max_value);
            pk_graph_value = (130 * pk_max_value);
        }
    }

    //handles Abort Model button
    const abortModel = (event) =>
    {
        clearResults();
        setModelResult('Model Run Aborted.');
    }    

    //handles Print Results button
    const printResults = (event) =>
    {
        window.print();
    }  
    
    //handles Clear Results button
    const clearResults = (event) =>
    {
        setUploadedImage();
        setAppMessage('');
        setModelResult('');
        bt_graph_value1 = 0.0;
        bt_graph_value2 = 0.0;
        bt_graph_value3 = 0.0;
        bt_graph_value4 = 0.0;
        az_graph_value = 0.0;
        pk_graph_value = 0.0;
        az_graph_colour = 'powderBlue';
        pk_graph_colour = 'powderBlue';
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
                    <div style={{width:'100%', height:'60%', borderRadius:'5px', border:'1px solid #000', backgroundColor:'beige'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="-30 0 160 100" preserveAspectRatio="none">

                            <text x="-15" y="8" style={{fontSize:'25%'}}>Brain Tumour</text>
                            <rect x="-15" y="10" width="130" height="42" stroke="black" fill="transparent" stroke-width="0.1"/>
                            <text x="-23" y="17" style={{fontSize:'25%'}}>Gli</text>
                            <rect x="-15" y="12" width={bt_graph_value1} height="8" stroke="black" fill="powderBlue" stroke-width="0.3"/>
                            <text x="-23" y="27" style={{fontSize:'25%'}}>Me</text>
                            <rect x="-15" y="22" width={bt_graph_value2} height="8" stroke="black" fill="powderBlue" stroke-width="0.3"/>
                            <text x="-23" y="37" style={{fontSize:'25%'}}>Pit</text>
                            <rect x="-15" y="32" width={bt_graph_value4} height="8" stroke="black" fill="powderBlue" stroke-width="0.3"/>
                            <text x="-23" y="47" style={{fontSize:'25%'}}>No</text>
                            <rect x="-15" y="42" width={bt_graph_value3} height="8" stroke="black" fill="powderBlue" stroke-width="0.3"/>
                            
                            <text x="-15" y="59" style={{fontSize:'25%'}}>Alzheimer's</text>
                            <text x="-25" y="68" style={{fontSize:'25%'}}>Neg</text>
                            <text x="117" y="68" style={{fontSize:'25%'}}>Pos</text>
                            <rect x="-15" y="61" width="130" height="12" stroke="black" fill="transparent" stroke-width="0.1"/>
                            <rect x="-15" y="61" width={az_graph_value} height="12" stroke="black" fill={az_graph_colour} stroke-width="0.3"/>

                            <text x="-15" y="80" style={{fontSize:'25%'}}>Parkinson's</text>
                            <text x="-25" y="89" style={{fontSize:'25%'}}>Neg</text>
                            <text x="117" y="89" style={{fontSize:'25%'}}>Pos</text>
                            <rect x="-15" y="82" width="130" height="12" stroke="black" fill="transparent" stroke-width="0.1"/>
                            <rect x="-15" y="82" width={pk_graph_value} height="12" stroke="black" fill={pk_graph_colour} stroke-width="0.3"/>
                        </svg>
                    </div>
                    <p>Data Visualisation</p>   
                    <div className="messageArea">
                        <TextDisplay label='Model Results: ' text={modelResult}/>
                        <p>Please note any results are indicative and should not be relied upon for diagnosis</p>
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