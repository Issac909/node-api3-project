import React from "react";
import { Route } from "react-router-dom";

import UpdatePost from "./UpdatePost";
import PostCard from "./PostCard";

const Posts = () => {
  return (
    <div>
      <PostCard />
      <Route path = 'posts/:id' component = {UpdatePost} />
    </div>
  );
};

export default Posts;
