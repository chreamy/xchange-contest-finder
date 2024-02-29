import React, { Component, useState } from "react";
import Nav from "../components/UI/Nav";
import Filter from "../components/Filter";
import Contest from "../components/Contest";
import Footer from "../components/UI/Footer";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import styles from "./contestList.module.css";

// class ContestList extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }
//   componentDidMount() {}
//   render() {
//     return <h1>Hello World</h1>;
//   }
// }

const ContestList = () => {
  const [contests, setContests] = useState([
    {
      title: "韌性故事短片徵選",
      link: "https://bhuntr.com/tw/competitions/7zaun5gid4vsc1t0i9",
    },
    {
      title: "2024第四屆台灣房屋親情文學獎",
      link: "https://bhuntr.com/tw/competitions/ere87izih152ujnj59",
    },
    {
      title: "第五屆第一梯次T大使計畫",
      link: "https://bhuntr.com/tw/competitions/kmh5lbgq20egzbzimv",
    },
    {
      title: "2024全國學生攝影比賽",
      link: "https://bhuntr.com/tw/competitions/ijdatnrid3dfqb68k8",
    },
    {
      title: "第三屆永豐金控校園商業競賽",
      link: "https://bhuntr.com/tw/competitions/2j7caw8wuyajnc5wl0",
    },
    {
      title: "2024 放視大賞",
      link: "https://bhuntr.com/tw/competitions/s5uzvd968dqz7bstq8",
    },
    {
      title: "G-Force 綠能創意設計賽",
      link: "https://bhuntr.com/tw/competitions/2gt0b6sm2gbo6a0hq6",
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
    {
      title: "第29屆萬家香溫馨家園．童言童畫甄選比賽",
      link: "https://bhuntr.com/tw/competitions/ekl94t0gtlvd410bfq",
    },
    {
      title: "瓩設計獎kW Design Award─第24屆創意競賽",
      link: "https://bhuntr.com/tw/competitions/7e9r8q4aydg5vlyoum",
    },
  ]);
  const handleGoogleLoginSuccess = (res) => {
    console.log("Login Success:", res.credential);
    axios.post("http://localhost:3001/user/google-login", {
      token: res.credential,
      test: "aaa",
    });
  };

  const handleGoogleLoginFailure = (res) => {
    console.log("Login Failed:", res);
  };

  return (
    <>
      <Nav />
      <GoogleLogin
        onSuccess={handleGoogleLoginSuccess}
        onError={handleGoogleLoginFailure}
        useOneTap
      />
      <Filter />
      <div className={styles.list}>
        {contests.map((contest) => (
          <Contest title={contest.title} link={contest.link} />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default ContestList;
