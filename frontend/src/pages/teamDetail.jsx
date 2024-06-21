import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { HOST } from "../const";
import Banner from "../components/Banner";
import TicketTeamDetail from "../components/TicketTeamDetail";
import TeamPost from "../components/TeamPost";
 

const TeamDetail = () => {
  const { id } = useParams();
  const [teamdetails, setTeamDetails] = useState(null);
  const [teamposts, setTeamPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${HOST}/team/${id}`);
        console.log('Team details:', response.data);
        setTeamDetails(response.data);
      } catch (error) {
        console.error('Error fetching team details:', error);
      }
    };

    fetchData();
  }, [id]);


  useEffect(() => {
    const fetchPosts = async () => {
      try{
        const response = await axios.get(`${HOST}/team/getNotice/${id}`);
        console.log('Team posts:', response.posts); 
        setTeamPosts(response.posts);
      }catch(error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [id]);

  return (
    <div className="contestDetail">
      <Banner />
      {teamdetails ? (
        <TicketTeamDetail
          name={teamdetails.name}
          contestTitle={teamdetails.contestTitle}
          teamAdminName={teamdetails.teamAdminName}
          numberOfUsers={teamdetails.numberOfUsers}
        />
      ) : (
        <div>Loading...</div>
      )}
      <TeamPost teamdetails={teamdetails} teamposts={teamposts} /> {/* 将teamdetails数据传递给TeamPost组件*/}
    </div>
  );
};

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
