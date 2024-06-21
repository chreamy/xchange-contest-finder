import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { HOST } from "../const";
import Banner from "../components/Banner";
import TicketTeamDetail from "../components/TicketTeamDetail";
import TeamContent from "../components/TeamContent";
import "./contestDetail.css";

const TeamDetailMember = () => {
  const { id } = useParams();
  const [teamdetails, setTeamDetails] = useState(null);
///  const [teamposts, setTeamPosts] = useState([]);

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

/*
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
*/
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
      <TeamContent teamdetails={teamdetails} /> {/* 将teamdetails数据传递给TeamPost组件 members={members}*/}
    </div>
  );
};

export default TeamDetailMember;