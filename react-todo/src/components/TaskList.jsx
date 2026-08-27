import TaskItem from "./TaskItem";
function TaskList({ tasks, dispatch }) { 
    return (
        <div className="task-list">
            {tasks.map((task) => { 
                return (
                    <TaskItem
                    task={task}
                    dispatch={dispatch}
                    key={task.id}
                    />
                )
            })}
        </div>
    )
}
export default TaskList;