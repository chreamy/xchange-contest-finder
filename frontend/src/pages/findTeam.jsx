import React, { Component } from "react";
import TeamFilter from "../components/TeamFilter";
import Team from "../components/Team";
import styles from "./findTeam.module.css";

  class FindTeam extends Component {
    constructor(props) {
      super(props);
      this.state = {
        teams: [
          {
            "name": "O'Conner Inc",
            "contest": "66026",
            "users": "1/5",
            "description":"jfioihugh",
          },
          {
            "name": "O'Conner Inc",
            "contest": "66",
            "users": "1/5",
            "description":"jfioihugh",
          },
          {
            "name": "O'Conner Inc",
            "contest": "66026",
            "users": "1/5",
            "description":"jfioihugh",
          },
          {
            "name": "O'Conner Inc",
            "contest": "66026",
            "users": "1/5",
            "description":"jfioihugh",
          },
          {
            "name": "O'Conner Inc",
            "contest": "66026",
            "users": "1/5",
            "description":"jfioihugh",
          },
          {
            "name": "O'Conner Inc",
            "contest": "66026",
            "users": "1/5",
            "description":"jfioihugh",
          },
          {
            "name": "O'Conner Inc",
            "contest": "66026",
            "users": "1/5",
            "description":"jfioihugh",
          },
          {
            "name": "O'Conner Inc",
            "contest": "66026",
            "users": "1/5",
            "description":"jfioihugh",
          },
        ],
      };
    }
    // fetchData = async () => {
    //   const teams = (
    //     await axios.post("http://localhost:3001/team/", {})
    //   ).data;
    //   this.setState({ teams });
    // };

    // componentDidMount() {
    //   this.fetchData();
    // }
    render() {
      return (
        <>
          <TeamFilter />
          <div className={styles.list}>
            {this.state.teams &&
              this.state.teams.map((team) => (
                <Team title={team.name}
                users={team.users}
                contest={team.contest}
                description={team.description}
                link={team.users} />
              ))}
          </div>
        </>
      );
    }
  }
    

  export default FindTeam;