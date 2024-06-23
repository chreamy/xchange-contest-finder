import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import React from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './Ticket.css';

function Ticket({ contestData }) {
  const { id } = useParams();

  const handleFavorite = () => {
    console.log("Favorite toggled for contest ID:", id);
  };

  return (
    <div className='Ticket'>
      <div className='ticket-img' style={{display:"flex"}}>
        <img src={contestData ? contestData.coverImg : ''} alt="Contest Cover" style={{margin:"auto", width: '100%'}}/>
      </div>
      <div className='ticket-main'>
        {contestData ? (
          <>
            <p className='ticket-name'>{contestData.title}</p>
            <p className='ticket-detail'>比賽類別:</p>
            <p className='ticket-detail'>截止時間:{new Date(contestData.endDate).toLocaleString()}</p>
            <p className='ticket-detail'>比賽地區:{contestData.location}</p>
            <p className='ticket-detail'>最高獎金:</p>
          </>
        ) : (
          <p>Loading contest details...</p>
        )}
        <div className='switchButton'>
          <Button href="#" size="lg" className="custom-bg-color">前往比賽網站</Button>{' '}
          <Button href="#" size="lg" className="custom-bg-color">前往隊伍</Button>{' '}
          <Button href="#" size="lg" className="custom-bg-color">找隊友</Button>{' '}
        </div>
      </div>
      <div className='ticket-end'>
        <FormControlLabel 
          control={
            <Checkbox 
              icon={<FavoriteBorder className="heart"/>}
              checkedIcon={<Favorite className="heart"/>}
              onChange={handleFavorite} // Use onChange for Checkbox
              name="checkedH" 
            />
          } 
        /> 
      </div>
    </div>
  );
}

export default Ticket;
