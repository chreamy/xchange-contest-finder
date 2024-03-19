import React, { Component, useState } from "react";
import Nav from "../components/UI/Nav";
import Footer from "../components/UI/Footer";
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
        <Nav/>
        <Banner/>
        <Ticket/>
        <Content/>
        <Footer/>
    </div>
  );
}

export default ContestDetail;
