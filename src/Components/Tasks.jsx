import { useState, useEffect } from 'react';
import Task from './Task';
import '../Project.css'

const Tasks = ({tasks, currentUserId, addTask, addNewTaskOrPost, handleMarkCompleted}) => {

    const [isDisplayTasksWindow, setIsDisplayTasksWindow] = useState(false);
    const [taskTitle, setTaskTitle] = useState("");

    const handleAddTask = () => {
        if(taskTitle.length !==0) {
            addTask(currentUserId, taskTitle);
            setIsDisplayTasksWindow(true);
        }
    else { 
        setIsDisplayTasksWindow(false);
        alert("No task title")
    }
    };

    return (
        <>
        <div className='mainBorder' style={{width:"400px" , marginTop:0}} >
            <div>
           <strong>Todos - User <span>{currentUserId === -1 ? "" : currentUserId}</span></strong> 
            <button className='Add_Cancel_Update_Delete_button' onClick={() => setIsDisplayTasksWindow(true)}>Add</button>
            </div>
            { !isDisplayTasksWindow &&
            tasks.map((task) => {
                return (
                    <>
                    {" "}
                    <Task key={task.id}
                    task={task}
                    handleMarkCompleted={handleMarkCompleted}
                    />
                    <br />
                    </>
                );
            })}

            { isDisplayTasksWindow && (
                <div className='task_post'>
                    <span className="underline">Title:</span>
                    <input type="text" placeholder="Some Title" onChange={(e) => {setTaskTitle(e.target.value)}}/> <br />
                    <button className='Add_Cancel_Update_Delete_button' style = {{marginRight: 10}} onClick={() => setIsDisplayTasksWindow(false)}>Cancel</button>
                    <button className='Add_Cancel_Update_Delete_button' onClick={handleAddTask}>Add</button>
                    </div>
            )}
        </div>
        </>
    )

}

export default Tasks