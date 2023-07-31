import { useEffect, useState } from "react";
import Users from "./Components/Users";
import Posts from "./Components/Posts";
import Tasks from "./Components/Tasks";
import { validateEmail } from './Components/Utils'
import './Project.css'

const CURRENT_MAX_ID = 10;
    
const MainInterface = ({users, tasks, posts, handleUserUpdate, handleUserDelete, handleMarkCompleted, 
        addUser, addTask, addPost, setSearch}) => {

        const [isAddNewUserDisplay, setIsAddNewUserDisplay] = useState(false)
        const [isUserTasksAndPostsDisplay, setIsUserTasksAndPostsDisplay] = useState(false)
        const [selectedPostById, setSelectedPostById] = useState([]);
        const [selectedTaskById, setSelectedTaskById] = useState([]);
        const [currentUserId, setCurrentUserId] = useState(0)
        const [newUserId, setUserID] = useState(CURRENT_MAX_ID + 1)
        const [newUserName, setUserName] = useState("");
        const [newUserEmail, setUserEmail] = useState("");

        const addNewUser = () => {
            if (newUserName.length !== 0 && newUserEmail.length !== 0) {
              if (validateEmail(newUserEmail)) {
                addUser({
                  id: newUserId,
                  name: newUserName,
                  email: newUserEmail,
                  address: { street: "", city: "", zipcode: "" }
                });
                setUserID(prevId => prevId + 1);
                if (currentUserId !== -1) {
                  setIsUserTasksAndPostsDisplay(true);
                }
              } else {
                alert("Incorrect email format");
              }
            } else {
              alert("Name and Email fields are required");
            }
          };
          
        const updateTask = (data) => {
           setSelectedTaskById(data);
        };

        const updatePost = (data) => {
            setSelectedPostById(data);
        }; 

        const userSelectionById = (data, id) => {
          return data.filter((item) => {
              return item.userId === id;
          });
      };

        useEffect(() => {
            updateTask(userSelectionById(tasks, currentUserId));
            updatePost(userSelectionById(posts, currentUserId));
        }, [currentUserId, tasks, posts])

          const handleAddClick = () => {
            setIsAddNewUserDisplay(true);
            setIsUserTasksAndPostsDisplay(false);
          };

          const UserIdToDisplay = (id) => {
            setCurrentUserId(id);
            setIsAddNewUserDisplay(false);
            setIsUserTasksAndPostsDisplay(true);
          };

          return (
            <>
            <h1><strong>React - Mid Project</strong></h1>
            <div className="OuterElement, flex">
                <div className="divMain">
                    <div className="add_Search, flex" style={{alignItems:"baseline"}} >
                      <strong>Search:</strong> <input type="text" onChange={(e) => setSearch(e.target.value)} />
                        <button style={{border: '1px solid gray', backgroundColor: 'yellow'}} onClick={handleAddClick}>Add</button>
                    </div>

                    <div className="">
                         <Users 
                            users={users}
                            UserIdToDisplay={UserIdToDisplay}
                            handleUserUpdate={handleUserUpdate}
                            handleUserDelete={handleUserDelete}
                            tasks={tasks}
                            currentUserId={currentUserId}
                            userSelectionById={userSelectionById}  
                            />

                    </div>

                </div>

                <div className="rightSideArea">
                    { isUserTasksAndPostsDisplay && (users.find(user => user.id === currentUserId))
                    && (
                        <div className="userTasks&posts flex">
                            <div className="collapsedUserTasks&Posts">
                                <Tasks
                                    handleMarkCompleted={handleMarkCompleted}
                                    tasks={selectedTaskById}
                                    currentUserId={currentUserId}
                                    addTask={addTask}                                
                                 />
                            </div>

                            <div className="userTasks&posts flex">
                                <Posts
                                    posts={selectedPostById}
                                    currentUserId={currentUserId}
                                    addPost={addPost}
                                />
                            </div>
                        </div>
                        )}

                        { isAddNewUserDisplay && (
                            <div className="AddNewUser mainBorder" style={{padding:"20px 40px"}}>
                                Name: {" "}
                                <input type="text" placeholder="Some Title" onChange={(e) => setUserName(e.target.value)} /> <br /><br />
                                Email: {" "}
                                <input type="text" placeholder="Some Title" onChange={(e) => setUserEmail(e.target.value)} /> <br /><br />
                                <button style = {{border: '1px solid gray', backgroundColor: 'yellow', marginRight: 10}} onClick={() => setIsAddNewUserDisplay(false)} >Cancel</button>
                                <button
                                      style={{ border: '1px solid gray', backgroundColor: 'yellow' }}
                                      onClick={() => {
                                        setIsAddNewUserDisplay(false);
                                        addNewUser(); // Call the addNewUser function here
                                      }}
                                    >Add
                                    </button>
                            
                            </div>
                        )}

                </div>
            </div>
            </>
          );
}

export default MainInterface