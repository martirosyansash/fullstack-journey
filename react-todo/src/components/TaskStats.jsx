
function TaskStats({ dispatch, total, completed, remaining }) { 

    return (
      <div className="task-stats">
        <div className="clear">
          <button onClick={() => { 
            dispatch({
              type:"clearCompleted"
            })
          }}>Clear Completed</button>
          <button onClick={() => { 
            dispatch({
              type:"clearAll"
            })  
          }}>Clear All</button>
        </div>
        <div className="stats">
          <span>Total: { total } || </span>
          <span>Completed: { completed } || </span>
          <span>Remaining: { remaining } </span>
        </div>
      </div>
    )
}

export default TaskStats;