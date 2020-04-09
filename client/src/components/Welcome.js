import React from "react";
import { Link } from "react-router-dom";

import PostForm from "./PostForm";

const Welcome = () => {
  return (
    <>
      <h1>Welcome</h1>
      <h2>Enter one of your favorite things to say</h2>
      <p>
        If you would like to check out our full list of what others have to say,
        <Link to="/posts">click here.</Link>{" "}
      </p>
      <PostForm />
    </>
  );
};

export default Welcome;
