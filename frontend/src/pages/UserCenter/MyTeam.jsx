import { useState } from "react";
import Team from "../../components/UserCenter/Team";

import styles from "./MyTeam.module.css";

const MyTeam = () => {
  const [contest, setContest] = useState([
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
    {
      title: "第29屆萬家香溫馨家園．童言童畫甄選比賽",
      link: "https://bhuntr.com/tw/competitions/ekl94t0gtlvd410bfq",
    },
    {
      title: "瓩設計獎kW Design Award─第24屆創意競賽",
      link: "https://bhuntr.com/tw/competitions/7e9r8q4aydg5vlyoum",
    },
  ]);

  return (
    <div className={styles.list}>
      {contest.map((contest) => {
        return (
          <Team
            title={contest.title}
            link={contest.link}
            coverImg={contest.coverImg}
          />
        );
      })}
    </div>
  );
};

export default MyTeam;
