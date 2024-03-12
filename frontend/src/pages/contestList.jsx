import React, { Component, useState } from "react";
import Nav from "../components/UI/Nav";
import Filter from "../components/Filter";
import Contest from "../components/Contest";
import Footer from "../components/UI/Footer";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import styles from "./contestList.module.css";

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

export default ContestList;
