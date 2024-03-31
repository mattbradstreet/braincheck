import React from 'react';

function TextDisplay(props) {
    return (
        <>
            <label>
                <div style={{textAlign:'left', fontWeight:'bold'}}>{props.label}</div>
                <textarea rows={4} cols={20} style={{width:'100%', borderRadius:'5px', border:'1px solid #000', backgroundColor:'white'}} readOnly={true} value={props.text}/>
            </label>
        </>
    );
}

export default TextDisplay;