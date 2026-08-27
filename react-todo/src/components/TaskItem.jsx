import { useState } from "react"

function TaskItem({ task, dispatch }) { 
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(task.text);
    function editSave(event) {
        if (event) { 
             event.preventDefault();
        }
        if (editText.trim() === "") {
            return
        }
        dispatch({
            type: "edit",
            payload: {
                id: task.id,
                text: editText
            }
        })
        setIsEditing(false);
    }
    function cencelEdit() { 
        setEditText(task.text);
        setIsEditing(false);
    }
    return (
        <div className="task-item">
            <input type="checkbox" checked={task.completed} onChange={() => {
                dispatch({
                type: "toggle",
                payload: task.id
                })
            }} />
            {isEditing ? (
                
                <form className="edit-form" onSubmit={editSave}>
                    <input
                        type="text"
                        value={editText}
                        onChange={(event) => setEditText(event.target.value)}                
                    />
                </form>
            ):(
                <span className={task.completed ? "completed" : ""}>{task.text}</span>
            )}

            {isEditing && (
                <button className="cancel-btn" onClick={cencelEdit}>Cancel</button>
            )
            }
            <button className="edit-btn"
                onClick={() => { 
                    if (isEditing) {
                        editSave();
                    } else { 
                        setIsEditing(true);
                    }
            }}
            >
                {isEditing ? "Save" : "Edit"}
            </button>
            <button className="delete-btn"
                onClick={() => { 
                    dispatch({
                        type: "delete",
                        payload: task.id
                    })
            }}>Delete</button>
        </div>
    )
}

export default TaskItem;