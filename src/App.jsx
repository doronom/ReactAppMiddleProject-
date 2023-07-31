import './App.css'
import Users from './Components/Users'
import { useEffect, useState } from "react";
import { getAll } from './Components/Utils'
import MainInterface from './MainInterface';

const CURRENT_MAX_TASK_ID = 200;
const CURRENT_MAX_POST_ID = 100;

const usersUrl = 'https://jsonplaceholder.typicode.com/users'
const tasksUrl = 'https://jsonplaceholder.typicode.com/todos'
const postsUrl = 'https://jsonplaceholder.typicode.com/posts'

function App() {

  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [posts, setPosts] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [deletedUserID, setDeletedUserID] = useState(-1);
  const [newTaskId, setNewTaskId] = useState(CURRENT_MAX_TASK_ID + 1);
  const [newPostId, setNewPostId] = useState(CURRENT_MAX_POST_ID + 1);

  useEffect(() => {
    const getAllData = async () => {
      try {
        const { data: usersList } = await getAll(usersUrl);
        const { data: todoList } = await getAll(tasksUrl);
        const { data: postList } = await getAll(postsUrl);
  
        setUsers(usersList);
        setTasks(todoList);
        setPosts(postList);
        setFilteredUsers(usersList);

      }  catch (error) {
        console.error('Error fetching data:', error);
      }
  }
    getAllData();
  },[]);


  const handleUserDelete = (userId) => {
    setDeletedUserID(userId);
  };

  useEffect (() => {
    if (deletedUserID != -1) {
      setUsers(users.filter((users) => {
        return users.id != deletedUserID;
      }))

      setTasks(tasks.filter((users) => {
        return users.id != deletedUserID;
      }))

      setPosts(posts.filter((users) => {
        return users.id != deletedUserID;
      }))
    }
  }, [deletedUserID])


  const handleUserUpdate = (userId, updatedUserInfo) => {
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        user.name = updatedUserInfo.name;
        user.email = updatedUserInfo.email;
        user.address.street = updatedUserInfo.street;
        user.address.city = updatedUserInfo.city;
        user.address.zipcode = updatedUserInfo.zipcode;
      }
      return user;
    })

    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
  }

  const [searchText, setSearchText] = useState('');

  const setSearch = (searchText) => {
    setSearchText(searchText);
  };

  useEffect ( () => {
    if (searchText.length !== 0) {
      setFilteredUsers(
        users.filter((user) => 
        (user.name && user.name.toLowerCase().includes(searchText.toLowerCase())) ||
        (user.email && user.email.toLowerCase().includes(searchText.toLowerCase()))
        )
      );
    } 
    else {
      setFilteredUsers(users)
    }
  }, [users, searchText])


const handleMarkCompleted = (taskStat) => {
  setTasks(
    tasks.map((task) => {
      if(task.id === taskStat.id) {
        task.completed = true;
      }
      return task;
    })
  )
};

const addUser = (user) => {
  setUsers([...users, user]);
};

const addTask = (userId, taskTitle) => {
  const newTask = {
    title: taskTitle,
    userId: userId,
    completed: false,
    id: newTaskId
  }
  setTasks([...tasks, newTask]);
  setNewTaskId(newTaskId +1);
}

const addPost = (userId, postTitle, postBody) => {
  const newPost = {
    userId: userId,
    id: newPostId,
    title: postTitle,
    body: postBody
  }
  setPosts([...posts, newPost]);
  setNewPostId(newPostId + 1);
}

  return (
    <>
    <MainInterface 
      setSearch={setSearch}
      users={filteredUsers}
      tasks={tasks}
      posts={posts}
      handleMarkCompleted={handleMarkCompleted}
      handleUserDelete ={handleUserDelete}
      handleUserUpdate={handleUserUpdate}
      addUser={addUser}
      addTask={addTask}
      addPost={addPost}

    />

    </>
  )
}

export default App
