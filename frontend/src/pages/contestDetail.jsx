import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { HOST } from "../const";
import Banner from "../components/Banner";
import Ticket from "../components/Ticket";
import Content from "../components/Content";
import "./contestDetail.css";

const ContestDetail = () => {
  const { id } = useParams();
  const [contestdetails, setContestDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${HOST}/contest/list/`);
        setContestDetails(response.data);
      } catch (error) {
        console.error('Error fetching team details:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="contestDetail">
      <Banner />
      {contestdetails ? (
        <Ticket
          title={contestdetails.title}
          location={contestdetails.location}
          endDate={contestdetails.teamAdminName}
          maxPrize={contestdetails.maxPrize}
        />
      ) : (
        <div>Loading...</div>
      )}
      <Content />
    </div>
  );
};

export default ContestDetail;
