import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdatePost = () => {
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

  const updatePost = (e) => {
    e.preventDefault();
    if (newPost) {
      return axios
        .put(`http://localhost:5000/posts/${id}`, id)
        .then((res) => {
          return newPost;
        })
        .catch((err) => console.log(err));
    } 
  };

  const handleChanges = (e) => {
    e.preventDefault();
    setNewPost({
      ...newPost,
      [e.target.title]: e.target.value,
    });
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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newPost.text}
          placeholder={post.text}
          onChange={handleChanges}
        />
        <button type="submit" />
      </form>
    </>
  );
};

export default UpdatePost;
