import React, { useState, useEffect } from "react";
import axios from "axios";

import UpdatePost from './UpdatePost';

const PostCard = () => {
  const [post, setPost] = useState([]);
  const [selected, setSelected] = useState({});
  const [isSelected, setIsSelected] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const getPosts = () => {
    return axios
      .get("http://localhost:5000/posts")
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        console.log("This is getposts", err);
      });
  };

  const getPostById = (info) => (e) => {
    e.preventDefault();
    return axios
      .get(`http://localhost:5000/posts/${info.id}`)
      .then((res) => {
        console.log(res);
        setSelected(res.data);
        setIsSelected(true);
        localStorage.setItem("postid", res.data.id);
      })
      .catch((err) => console.log(err));
  };

  const deselect = (e) => {
    e.preventDefault();

    setIsSelected(false);
  };

  const updating = e => {
    e.preventDefault();
    setIsUpdating(!isUpdating);
  }

  useEffect(() => {
    getPosts();
  }, [post.id]);

  return (
    <>
      {!isSelected ? (
        post.map((info) => {
          return (
            <div key={info.id} onClick={getPostById(info)}>
              <p>{info.text}</p>
            </div>
          );
        })
      ) : (
        <div>
          {" "}
          <span>
            <button onClick={deselect}>X</button>
          </span>
          <p>{selected.text}</p>
          <div onClick = {updating}>Update</div>
          <UpdatePost isUpdating = {isUpdating} />
        </div>
      )}
    </>
  );
};

export default PostCard;
