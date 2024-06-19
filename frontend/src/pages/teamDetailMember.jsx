import React, { Component, useState } from "react";
import Banner from "../components/Banner";
import Ticket from "../components/Ticket";
import TeamContent from "../components/TeamContent";
import "./contestDetail.css";

//create-react-app
//class ContestList extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }
//   componentDidMount() {}
//   render() {
//     return <h1>Hello World</h1>;
//   }
// }

let  TeamDetailMember= () => {
  return (
    <div className="contestDetail">
      <Banner />
      <Ticket />
      <TeamContent />
    </div>
  );
};

export default TeamDetailMember;
