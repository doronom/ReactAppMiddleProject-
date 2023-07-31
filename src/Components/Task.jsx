import { useState, useEffect } from 'react';
import '../Project.css'

const Task = ({ task, handleMarkCompleted }) => {

const handleTaskUpdate = () => {
  handleMarkCompleted({...task, completed: true});
}

    return (
      <>
      <div className='task_post'
      key={task.id}>
      <span className="underline">Title:</span> {task?.title} <br />
      <span className="underline">Completed:</span> 
      {task.completed ? 'true' : (
        <button className='Add_Cancel_Update_Delete_button' onClick={handleTaskUpdate}>
          Mark Completed
        </button>
      )}
      </div>    
      </>
    );
  };
  
  export default Task;
  