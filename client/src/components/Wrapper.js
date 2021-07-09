
import {useState,useEffect} from 'react'

import Header from './Header'
import Tasks from './Tasks'
import AddTask from './AddTask'
import {getTasksApi,deleteTaskApi,toggleReminderApi,createTaskApi} from '../api/tasksApi'
const Wrapper = () => {
    const [tasks,setTasks] = useState([])
    const [showAddTask,setShowAddTask] = useState(false);
    const addTask = async (task) => {
        const res = await createTaskApi(task);
        if(res.success)
            getTasks();
    }
    const getTasks = async () =>{
        const { data } = await getTasksApi();
        setTasks(data)
    }
    const toggleReminder = async (id) => {
        const res = await toggleReminderApi(id);
        if(res.success)
            getTasks();
    }
     const deleteTask = async (id) => {
        const res = await deleteTaskApi(id);
        if(res.success)
            getTasks()
    }
    useEffect(() => {
        getTasks();
        
    }, [])
    return (
        <div>
            <Header onAdd={() => setShowAddTask(!showAddTask)}/>
            {showAddTask && <AddTask onAdd={addTask}/>}
            <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
        </div>
    )
}

export default Wrapper
