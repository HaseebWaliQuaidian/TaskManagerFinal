import Task from './Task'

const Tasks = ({tasks,onDelete,onToggle}) => {
    console.log('value of tasks is ',tasks);
    return (
        <>
        {tasks.map(task => 
            <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle}/>
        )}
        </>
    )
}

export default Tasks