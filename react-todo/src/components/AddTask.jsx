import { useState } from "react";

function AddTask({ dispatch }) { 
    const [text, setText] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        if(text.trim()===""){return}
            dispatch({
                type: "add",
                payload: {
                    id: Date.now(),
                    text: text.trim(),
                    completed:false
                }
            })
            setText("");
    }

    return (
        <form onSubmit={handleSubmit} className="add-task">
            <input
                type="text"
                value={text}
                onChange={(event) => { setText(event.target.value) }}
            />
            <button type="submit">Add</button>
        </form>
    )
}

export default AddTask;