import React, { Component, useState } from "react";
import Nav from "../components/UI/Nav";
import Filter from "../components/Filter";
import Contest from "../components/Contest";
import Footer from "../components/UI/Footer";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import styles from "./contestList.module.css";

<<<<<<< Updated upstream
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
=======
class ContestList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contests: [],
    };
  }
  fetchData = async () => {
    const contests = (
      await axios.post("http://localhost:3001/contest/list", {})
    ).data;
    this.setState({ contests });
  };
  handleGoogleLoginSuccess = (res) => {
>>>>>>> Stashed changes
    console.log("Login Success:", res.credential);
    axios.post("http://localhost:3001/user/google-login", {
      token: res.credential,
      test: "aaa",
    });
  };
  handleGoogleLoginFailure = (res) => {
    console.log("Login Failed:", res);
  };
  componentDidMount() {
    this.fetchData();
  }

<<<<<<< Updated upstream
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
=======
  render() {
    return (
      <>
        <Nav />
        <GoogleLogin
          onSuccess={this.handleGoogleLoginSuccess}
          onError={this.handleGoogleLoginFailure}
          useOneTap
        />
        <Filter />
        <div className={styles.list}>
          {this.state.contests &&
            this.state.contests.map((contest) => (
              <Contest title={contest.title} link={contest.link} />
            ))}
        </div>
        <Footer />
      </>
    );
  }
}
>>>>>>> Stashed changes

export default ContestList;
