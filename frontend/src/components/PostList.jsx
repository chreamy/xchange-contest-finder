import React, { useState } from "react";
import Post from "./Post";
import styles from "./PostList.module.css";

export const PostList = () => {
  const [post] = useState([
    {
      name: "姓名",
      time:"2024.05.22",
      content: "內文",
    },
    {
      name: "姓名",
      time:"2024.05.22",
      content: "內文",
    },
    {
      name: "姓名",
      time:"2024.05.22",
      content: "內文",
    },
  ]);

  return (
    <>
      <div className={styles.list}>
        {post.map((p) => {
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
