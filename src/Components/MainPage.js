import React from 'react';

import ImageDisplay from './ImageDisplay';
import TextDisplay from './TextDisplay';
import Button from './Button';

function MainPage() {
    return (
        <>
            <div style={{display: 'flex', minHeight:'100vh', maxHeight:'100vh', backgroundColor:'lightblue'}}>

                <div style={{flex: 1, margin: '3%'}}>
                    <ImageDisplay/>
                    <div style={{position:'relative', top:'4%'}}>
                        <TextDisplay label='Application Messages'/>
                    </div>
                    <div style={{position:'relative', top:'20%'}}>
                        <Button label='Upload Image' />
                        <Button label='Run Model' />
                    </div>
                </div>

                <div style={{flex: 1, margin: '3%'}}>
                    <ImageDisplay/>
                    <div style={{position:'relative', top:'4%'}}>
                        <TextDisplay label='Model Results'/>
                    </div>
                    <div style={{position:'relative', top:'20%'}}>
                        <Button label='Print Results' />
                        <Button label='Clear Results' />
                    </div>
                </div>

            </div>
        </>
    );
}

export default MainPage;