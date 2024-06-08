import React, { useState } from "react";
import Partner from "./Partner";
import styles from "./MemberList.module.css";

export const MemberList = () => {
  const [member] = useState([
    {
      name: "姓名",
      identity: "大學生",
      contest: "比賽類型",
      intro: "過去經歷Blabla",
      link: "#",
    },
    {
      name: "姓名",
      identity: "大學生",
      contest: "比賽類型",
      intro: "過去經歷Blabla",
      link: "#",
    },
    {
      name: "姓名",
      identity: "大學生",
      contest: "比賽類型",
      intro: "過去經歷Blabla",
      link: "#",
    },
    {
      name: "姓名",
      identity: "大學生",
      contest: "比賽類型",
      intro: "過去經歷Blabla",
      link: "#",
    },
    {
      name: "姓名",
      identity: "大學生",
      contest: "比賽類型",
      intro: "過去經歷Blabla",
      link: "#",
    },
    {
      name: "姓名",
      identity: "大學生",
      contest: "比賽類型",
      intro: "過去經歷Blabla",
      link: "#",
    },
  ]);

  return (
    <>
      <div className={styles.list}>
        {member.map((p) => {
          return (
            <Partner
              name={p.name}
              identity={p.identity}
              contest={p.contest}
              intro={p.intro}
              link={p.link}
            />
          );
        })}
      </div>
    </>
  );
};
