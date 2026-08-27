import { useState } from 'react'

function LessText({ text,max = 50 }) { 
    const [showLess, setShowLess] = useState(true);

    if (text.length <= max) {
        return <span>{ text }</span>
    }
    return (
        <div>
            <span>{showLess? text.substring(0,max): text }</span>
            <a href="#" onClick={(evt) => { 
                evt.preventDefault();
                setShowLess(!showLess);
            }}>{showLess ? "...more" : "less"}</a>
        </div>
    )
}

export default LessText;