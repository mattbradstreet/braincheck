import React from 'react';

function TextDisplay(props) {
    return (
        <>
            <label>
                <div style={{textAlign:'left'}}>{props.label}</div>
                <textarea rows={4} cols={20} style={{width:'100%'}} readOnly={true} value={props.text}/>
            </label>
        </>
    );
}

export default TextDisplay;