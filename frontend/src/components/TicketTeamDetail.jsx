import './Ticket.css';
///import contest_detail_test from '../components/UI/contest_detail_test.json';
import {Button} from 'react-bootstrap';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox'; 
import Favorite from '@mui/icons-material/Favorite'; 
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'; 

const TicketTeamDetail = (props) =>{
    return(
        <div className='Ticket'>
            <div className='ticket-img'></div>
            {/*<img src={logo} className="App-logo" alt="logo" />*/}
            <div className='ticket-main'>
                <p className='ticket-name'>{props.name}</p>
                <p className='ticket-detail'>比賽類別:</p>
                <p className='ticket-detail'>截止時間:{props.endDate}</p>
                <p className='ticket-detail'>比賽地區:{props.location}</p>
                <p className='ticket-detail'>最高獎金:</p>
                <div className='switchButton'>
                    <Button href="#" size="lg" className="custom-bg-color">前往比賽網站</Button>{' '}
                    <Button href="#" size="lg" className="custom-bg-color">前往隊伍</Button>{' '}
                    <Button href="#" size="lg" className="custom-bg-color">找隊友</Button>{' '}
                </div>
            </div>
            <div className='ticket-end'>
            <FormControlLabel 
                    control={<Checkbox icon={<FavoriteBorder className="heart"/>} 
                        checkedIcon={<Favorite className="heart"/>} 
                    name="checkedH" />} 
        /> 
            </div>
        </div>
    )
}
export default TicketTeamDetail;