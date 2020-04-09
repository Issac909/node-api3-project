import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdatePost = (props) => {
  const [post, setPost] = useState({});
  const [newPost, setNewPost] = useState({});

  const id = localStorage.getItem("postid");

  const getPostById = () => {
    if (id) {
      return axios
        .get(`http://localhost:5000/posts/${id}`)
        .then((res) => {
          setPost(res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  const updatePost = () => {
    if (newPost) {
      return axios
        .put(`http://localhost:5000/posts/${id}`, id)
        .then((res) => {
          console.log(res);
          return newPost.text;
        })
        .catch((err) => console.log(err));
    }
  };

  const handleChanges = (e) => {
    e.preventDefault();
    setNewPost({ text: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePost();
  };

  useEffect(() => {
    getPostById();
  }, [post.id]);

  return (
    <>
      {props.isUpdating ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newPost.text}
            placeholder={post.text}
            onChange={handleChanges}
          />
          <button type="submit">Confirm</button>
        </form>
      ) : (
        <></>
      )}
    </>
  );
};

export default UpdatePost;
