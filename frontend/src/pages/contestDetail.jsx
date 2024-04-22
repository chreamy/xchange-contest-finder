import React, { Component, useState } from "react";
import Banner from "../components/Banner";
import Ticket from "../components/Ticket";
import Content from "../components/Content";
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

let ContestDetail = () => {
  return (
    <div className="contestDetail">
      <Banner />
      <Ticket />
      <Content />
    </div>
  );
};

export default ContestDetail;
