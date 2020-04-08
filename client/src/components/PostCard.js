import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const PostCard = () => {
  const [post, setPost] = useState([]);
  const [selected, setSelected] = useState({});
  const [isSelected, setIsSelected] = useState(false);

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

  const getPostById = (info) => e => {
    e.preventDefault();
    if (post.id == info.id) {
      return axios
        .get(`http://localhost:5000/posts/${info.id}`)
        .then((res) => {
          console.log(res);
          setSelected(res.data);
          setIsSelected(true);
          localStorage.setItem("postid", res.data.id);
        })
        .catch((err) => console.log(err));
    }
  };

  const deselect = e => {
    e.preventDefault();
    setIsSelected(false);
    localStorage.removeItem("postid")
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
              <p >{info.text}</p>
            </div>
          );
        })
      ) : (
        <div> <span><button onClick = {deselect}>X</button></span>
          <h2>{selected.title}</h2>
          <p>{selected.text}</p>
          <Link to = {`/posts/${selected.id}`}>Update</Link>
        </div>
      )
      }
    </>
  );
};

export default PostCard;
