import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getPayload } from '../../components/Auth';
import Contest from "../../components/Contest";
import { HOST } from '../../const';
import styles from "./MyCollection.module.css";

const MyCollection = () => {
  const [contests, setContests] = useState([]);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const payload = getPayload(token)
        if (!token) {
          console.log("No token found");
          return; // or handle this scenario appropriately
        }

        const response = await axios.get(`${HOST}/user/profileById/${payload.userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.data) {
          console.log(response.data.user.favorites[0])
          const response2 = await axios.get(`${HOST}/contest/${response.data.user.favorites[0]}`, { 
          headers: { Authorization: `Bearer ${token}` }
          
        });
        console.log(response2.data)
        setContests([response2.data]);
        
        }
        
      } catch (error) {
        console.error('Failed to fetch contest data:', error);
      }
    };

    fetchContests();
  }, []);

  return (
    <div className={styles.list}>
      {contests.length > 0 ? contests.map((contest, index) => (
        <Contest
          key={index}
          title={contest.title}
          link={contest.link}
          coverImg={contest.coverImg}
        />
      )) : <p>No contests found</p>}
    </div>
  );
};

export default MyCollection;
