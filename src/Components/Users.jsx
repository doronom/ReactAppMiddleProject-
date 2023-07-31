import { useState, useEffect } from "react"
import User from './User';
import '../Project.css'

const Users = ({users, UserIdToDisplay, handleUserUpdate, handleUserDelete, tasks, currentUserId, userSelectionById}) => {
 
  const [isUserDataDisplayed, setIsUserDataDisplayed] = useState(false)

  useEffect(() => {
      setIsUserDataDisplayed(true);
    }, [currentUserId]);


    return (
    <>
      {
        users?.map((user) => {
          return (
            <User 
            key={user.id} 
            user={user}
            onUpdate={handleUserUpdate}
            onDelete={handleUserDelete}
            tasks={userSelectionById(tasks, user.id)}
            UserIdToDisplay={UserIdToDisplay}
            isUserDataDisplayed={isUserDataDisplayed}
            />  
          )
        })
      }
    </>
    );
}

export default Users