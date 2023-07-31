import { useState, useEffect } from "react";
import Task from './Task';
import Post from "./Post";
import '../Project.css'

const Posts = ({posts, currentUserId, addPost}) => {

    const [isDisplayPostsWindow, setIsDisplayPostsWindow] = useState(false);
    const [postTitle, setPostTitle] = useState("")
    const [postBody, setPostBody] = useState("")

    const handleAddPost = () => {
        if (postTitle.length === 0 || postBody.length === 0) {
            alert("Missing post title or post body");
          } else {
            try {
              addPost(currentUserId, postTitle, postBody);
              setIsDisplayPostsWindow(true);
            } catch (error) {
              alert("An error occurred while adding the post. Please try again.");
            }
          }
          setIsDisplayPostsWindow(false);
    }

    return (
        <>
        <div className='mainBorder' style={{width:"400px" , marginTop:0}}>
            <div>
            <strong>Posts - User <span>{currentUserId == -1 ? "" : currentUserId}</span></strong> 
            <button className="Add_Cancel_Update_Delete_button" onClick={() => {setIsDisplayPostsWindow(true)}}>Add</button>
            </div>
            { !isDisplayPostsWindow && posts.map((post) => {
                return (
                    <>
                    {" "}
                    <Post
                    key={post.id}
                    post={post}
                    /> <br />
                    </>
                );
            })
            }

            { isDisplayPostsWindow && (
                <div>
                    <span className="underline">Title:</span> {" "}
                    <input type="text" placeholder="Some Title" onInput={(e) => {setPostTitle(e.target.value)}}/> <br />
                    <span className="underline">Body:</span> {" "}
                    <input type="text" placeholder="Some body" onInput={(e) => {setPostBody(e.target.value)}}/> <br />
                    <button className = "Add_Cancel_Update_Delete_button" onClick={() => { setIsDisplayPostsWindow(false); }}>Cancel</button>
                    <button className = "Add_Cancel_Update_Delete_button" onClick={handleAddPost}>Add</button>
                </div>
            )
            }
        </div>
        </>
    );
}

export default Posts;