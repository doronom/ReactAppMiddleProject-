import { useState, useEffect, useMemo } from 'react';
import { validateEmail } from './Utils'
import '../Project.css'

const User = ({user, onUpdate, onDelete, tasks, UserIdToDisplay, isUserDataDisplayed}) => {

    const [isDisplay, setIsDisplay] = useState(false)
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [userRecord, setUserRecord] = useState(user);
    const [userUpdate, setUpdateUser] = useState({
      name: user.name,
      email: user.email,
      street: user.address?.street,
      city: user.address?.city,
      zipcode: user.address?.zipcode,
    });
    const [newUserData, setNewUserData] = useState({
      name: user.name,
      email: user.email,
      street: user.address.street,
      city: user.address.city,
      zipcode: user.address.zipcode,
    });
    const [completedTasks, setCompletedTasks] = useState(false)
    const [isEmailValid, setIsEmailValid] = useState(true);

    const incompleteTasks = useMemo(() => {
      return tasks.filter((task) => !task.completed);
    }, [tasks]);

    useEffect(() => {
      if (incompleteTasks.length !== 0) {
        setCompletedTasks(false);
      } else {
        setCompletedTasks(true);
      }
    }, [incompleteTasks, selectedUserId]);
 
      const handleOtherDataAction = () => {
        setIsDisplay(!isDisplay);
      };

      const handleOtherDataClick = () => {
        setIsDisplay(isDisplay);
      }

      const handleNameChange = (e) => {
        setUpdateUser({ ...userUpdate, name: e.target.value });
      };
    
      const handleEmailChange = (e) => {
        setUpdateUser({ ...userUpdate, email: e.target.value });
      };

      const handleStreetChange = (e) => {
        setUpdateUser({ ...userUpdate, street: e.target.value });
      }

      const handleCityChange = (e) => {
        setUpdateUser({ ...userUpdate, city: e.target.value });
      }

      const handleZipcodeChange = (e) => {
        setUpdateUser({ ...userUpdate, zipcode: e.target.value });
      }
    
      const handleUpdateClick = () => {
        // Perform email validation before updating the user data
        if (validateEmail(userUpdate.email)) {
          setIsEmailValid(true);
          const updatedUser = {
            name: userUpdate.name.length === 0 ? userRecord?.name : userUpdate.name,
            email: userUpdate.email.length === 0 ? userRecord?.email : userUpdate.email,
            address: {
              street: isDisplay ? userUpdate.street : userRecord?.address?.street,
              city: isDisplay ? userUpdate.city : userRecord?.address?.city,
              zipcode: isDisplay ? userUpdate.zipcode : userRecord?.address?.zipcode,
            },
          };
          setNewUserData(updatedUser);
        } else {
          setIsEmailValid(false);
          alert("Incorrect email format");
        }
      };
      
      useEffect(() => {
        onUpdate(newUserData);
        setUpdateUser((prevUserUpdate) => ({
          ...prevUserUpdate,
          name: newUserData.name,
          email: newUserData.email,
          street: isDisplay ? userUpdate.street : userRecord?.address?.street,
          city: isDisplay ? userUpdate.city : userRecord?.address?.city,
          zipcode: isDisplay ? userUpdate.zipcode : userRecord?.address?.zipcode,
        }));
      }, [newUserData, isDisplay]);
      
      const handleIdClick = () => {
        setSelectedUserId(userRecord.id);
        UserIdToDisplay(userRecord.id);
      }

      const handleIdHover = () => {
        isUserDataDisplayed = false;
      }

      const handleDeleteClick = () => {
        onDelete(userRecord?.id);
      };


    return (
      <>
      { isUserDataDisplayed &&
        <div className="allUsersArea"
        key={user.id}
        style={{ 
            border: completedTasks ? '3px solid green' : '3px solid red', 
            borderBlockEndWidth: '1px',
            width: '440px', 
            margin: '10px',
            padding: '10px',
            backgroundColor: selectedUserId === user.id ? "#FBBF77" : 'inherit'
            }}>
        <span style = {{cursor: 'pointer'}} className="underline" onClick ={handleIdClick} onMouseOver={handleIdHover} >id:</span> {userRecord.id}<br />
        <span className="underline">Name: </span>
        <input type="text" value={userUpdate.name} onChange={handleNameChange} /> <br />
        <span className="underline">Email: </span>
        <input type="text" value={userUpdate.email} onChange={handleEmailChange} /> <br />
        <br />

            <div>
              <div className={"UserActionButtons" + (isDisplay? " flexColumn":'')}>
                <button className="notExpanded" style={{border: '1px solid gray', backgroundColor: 'gray'}} onMouseOver={handleOtherDataAction} onClick={handleOtherDataClick} >Other Data</button>
                      { isDisplay && (
                      <div className="otherData"> 

                      <span className="underline">Street: </span> {" "}
                      <input type="text" value={userUpdate?.street} onChange={handleStreetChange}/> <br />

                      <span className="underline">City: </span> {" "}
                      <input type="text" value={userUpdate?.city} onChange={handleCityChange}/> <br />

                      <span className="underline">ZipCode: </span> {" "}
                      <input type="text" value={userUpdate?.zipcode} onChange={handleZipcodeChange}/> <br />
                      </div>
                      )}

                      <span>
                      <button className='Add_Cancel_Update_Delete_button' style={{marginRight: 10}} onClick={handleUpdateClick} >Update</button>
                      <button className='Add_Cancel_Update_Delete_button' onClick={handleDeleteClick} >Delete</button>
                      </span>

              </div>

            </div>




        </div>
      }
      </> 

    )

}

export default User