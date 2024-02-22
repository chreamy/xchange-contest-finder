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
      name: "比賽名稱",
      date: "2024-01-31",
      address: "???",
      media: [""],
    },
    {
      name: "比賽名稱",
      date: "2024-01-31",
      address: "???",
      media: [""],
    },
    {
      name: "比賽名稱",
      date: "2024-01-31",
      address: "???",
      media: [""],
    },
    {
      name: "比賽名稱",
      date: "2024-01-31",
      address: "???",
      media: [""],
    },
    {
      name: "比賽名稱",
      date: "2024-01-31",
      address: "???",
      media: [""],
    },
    {
      name: "比賽名稱",
      date: "2024-01-31",
      address: "???",
      media: [""],
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
      <Nav></Nav>
      <GoogleLogin
        onSuccess={handleGoogleLoginSuccess}
        onError={handleGoogleLoginFailure}
        useOneTap
      />
      <Filter></Filter>
      <div className={styles.list}>
        {contests.map((contest) => (
          <Contest
            name={contest.name}
            date={contest.date}
            address={contest.address}
            media={contest.media}
          />
        ))}
      </div>
      <Footer></Footer>
    </>
  );
};

export default ContestList;
