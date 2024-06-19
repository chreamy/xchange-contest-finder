import React, { useState } from "react";
import Post from "./Post";
import styles from "./PostList.module.css";

export const PostList = () => { 
  const [posts] = useState([
    {
      name: "姓名",
      time: "大學生",
      content: "比賽類型",
    },
    {
      name: "姓名",
      time: "大學生",
      content: "比賽類型",
    },
  ]);

  return (
    <>
      <div className={styles.list}>
        {posts.map((p) => {
          return (
            <Post
              name={p.name}
              time={p.time}
              content={p.content}
            />
          );
        })}
      </div>
    </>
  );
};
