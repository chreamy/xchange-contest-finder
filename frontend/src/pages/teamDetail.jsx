import React, { Component, useState, useEffect } from "react";
///import { useParams } from "react-router-dom";
import axios from "axios";
import { HOST } from "../const";
import Banner from "../components/Banner";
import TicketTeamDetail from "../components/TicketTeamDetail";
import TeamPost from "../components/TeamPost";


class TeamDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamdetails: [
      ],
    };
  }

  fetchData = async () => {
    let teamdetails = [];

    await axios
      .get(`${HOST}/team/664f3dbddb46c21a731b3029`)
      .then((res) => {
        teamdetails = res.data;
        this.setState({ teamdetails });
      })
      .catch((err) => console.log(err));
  };
  componentDidMount() {
    this.fetchData();
  }

  render() {
  return (
    <div className="contestDetail">
      <Banner />
      {this.state.teamdetails &&
            this.state.teamdetails.map((teamdetail) => {
              console.log(teamdetail);
             return (
                <TicketTeamDetail
                 name={teamdetail.name}
                 endDate={teamdetail.contestId}
                 location={teamdetail.id}
                />
             );
            })}
      <TeamPost />
    </div>
  );
};
}

export default TeamDetail;
///class TeamDetail extends Component {
///  constructor(props) {
///    super(props);
///    this.state = {axios.patch(`${HOST}/team/update/:${id}`);
///      contests: [
///        {
///          name: "比賽名稱",
///         date: "2024-01-31",
///          address: "???",
///          media: [""],
///          location:"???",
///         title: "第三屆永豐金控校園商業競賽",
///          link: "https://bhuntr.com/tw/competitions/2j7caw8wuyajnc5wl0",
///        },
///      ],
///   };
///  }
///
///  render() {
///  return (
///    <div className="contestDetail">
///      <Banner />
///      {this.state.contests &&
///            this.state.contests.map((contest) => {
///              console.log(contest);
///             return (
///                <TicketTeamDetail
///                  title={contest.title}
///                  endDate={contest.endDate}
///                 location={contest.location}
///                />
///             );
///            })}
///      <TeamPost />
///    </div>
///  )
///}
///}
///export default TeamDetail;
