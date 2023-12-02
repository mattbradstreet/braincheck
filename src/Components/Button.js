import React from 'react';

function Button(props) {
    return (
        <>
            <button onClick={props.click} style={{width:'50%', height:'30px', backgroundColor:'gainsboro'}}>
                {props.label}
            </button>
        </>
    );
}

export default Button;