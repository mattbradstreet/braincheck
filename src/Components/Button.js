import React from 'react';

function Button(props) {
    return (
        <>
            <button onClick={props.click} style={{width:'50%', height:'30px', borderRadius:'5px', border:'1px solid #333', backgroundColor:'gainsboro'}}>
                {props.label}
            </button>
        </>
    );
}

export default Button;