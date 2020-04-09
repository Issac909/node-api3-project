import React, { useState } from "react";
import axios from "axios";

const PostForm = () => {  
  const id = localStorage.getItem("postid")

  const [newPost, setnewPost] = useState({
    id: id,
    text: "",
    user_id: 1
  });

  const handleChanges = (e) => {
    e.preventDefault();
    setnewPost({
      ...newPost,
      text: e.target.value,
    });
  };

  const makepost = post => {
    return axios
      .post("http://localhost:5000/posts", post)
      .then((res) => {
        window.location.reload(false);
        return res.data
      })
      .catch((err) => {
        console.log(console.log("This is makeposts", err));
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    makepost(newPost);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          title="text"
          placeholder="text"
          value={newPost.text}
          onChange={handleChanges}
        />

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default PostForm;