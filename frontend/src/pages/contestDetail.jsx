import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Banner from "../components/Banner";
import Content from "../components/Content";
import Ticket from "../components/Ticket";
import { HOST } from '../const'; // Ensure this constant is correctly defined
import "./contestDetail.css";

let ContestDetail = () => {
  const { id } = useParams();
  const [contestData, setContestData] = useState(null);

  useEffect(() => {
    const fetchContestData = async () => {
      const response = await fetch(`${HOST}/contest/${id}`);
      const data = await response.json();
      setContestData(data);
    };

    fetchContestData();
  }, [id]);

  return (<>
{contestData && <div className="contestDetail">
      <Banner />
      <Ticket contestData={contestData} />
      <Content contestData={contestData} />
    </div>}</>
    
  );
};

export default ContestDetail;
