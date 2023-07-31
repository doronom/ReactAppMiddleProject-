import { useState, useEffect } from "react";
import '../Project.css'

const Post = ({post}) => {

    return (
        <>
        <div className="task_post">
        <span className="underline">Title:</span>{post?.title}
        <br />
        <span className="underline">Body:</span>{post?.body}
        </div>
        </>
    );
}

export default Post;