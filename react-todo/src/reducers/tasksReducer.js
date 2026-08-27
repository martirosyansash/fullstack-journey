
export default function tasksReducer(state, action) { 
    switch (action.type) { 
        case "delete":
            return state.filter((task) => { return task.id !== action.payload });
        
        case "add":
            return [...state, action.payload];
        
        case "toggle":
            return state.map((task) =>
                task.id === action.payload ? { ...task, completed: !task.completed } : task)
         
        case "clearCompleted":
            return state.filter((task) => { return !task.completed });
            
        case "clearAll":
            return [];
        case "edit":
            return state.map((task) => {
                if (task.id === action.payload.id) { 
                    return{ 
                    ...task,
                    text:action.payload.text
                    }
                }
                return task;
            })
        default:
            return state;
    }
}
