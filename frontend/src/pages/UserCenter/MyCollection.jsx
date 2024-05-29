import { useState } from "react";
import Contest from "../../components/Contest";

import styles from "./MyCollection.module.css";

const MyCollection = () => {
  const [contest, setContest] = useState([
    {
      name: "比賽名稱",
      date: "2024-01-31",
      address: "???",
      media: [""],
      title: "第三屆永豐金控校園商業競賽",
      link: "https://bhuntr.com/tw/competitions/2j7caw8wuyajnc5wl0",
    },
    {
      title: "憂鬱主題原創歌曲/微電影徵稿活動",
      link: "https://bhuntr.com/tw/competitions/1cj5lwubdzchxg75fe",
    },
    {
      title: "2024年全國學生圖畫書創作獎",
      link: "https://bhuntr.com/tw/competitions/mtjjseznw2rp7eojam",
    },
    {
      title: "第2屆緋染天空插畫比賽",
      link: "https://bhuntr.com/tw/competitions/dzxgmygitmlruevsi3",
    },
  ]);

  return (
    <div className={styles.list}>
      {contest.map((contest) => {
        return (
          <Contest
            title={contest.title}
            link={contest.link}
            coverImg={contest.coverImg}
          />
        );
      })}
    </div>
  );
};

export default MyCollection;
