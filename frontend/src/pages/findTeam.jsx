import React, { Component } from "react";
import axios from "axios";
import { HOST } from "../const";
import TeamFilter from "../components/TeamFilter";
import Team from "../components/Team";
import styles from "./findTeam.module.css";

  class FindTeam extends Component {
    constructor(props) {
      super(props);
      this.state = {
        teams: [
        ],
      };
    }

    fetchData = async () => {
      let teams = [];
  
      await axios
        .get(`${HOST}/team`, {})
        .then((res) => {
          teams = res.data;
          this.setState({ teams });
        })
        .catch((err) => console.log(err));
    };
    componentDidMount() {
      this.fetchData();
    }
  
    render() {
      return (
        <>
          <TeamFilter />
          <div className={styles.list}>
            {this.state.teams &&
              this.state.teams.map((team) => (
                <Team name={team.name}
                ///users={team.users}
                //contest={team.contestId}
                introduction={team.introduction}
                link={team._id} />
              ))}
          </div>
        </>
      );
    }
  }
    

  export default FindTeam;