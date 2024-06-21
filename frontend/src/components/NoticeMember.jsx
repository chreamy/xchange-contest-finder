import './Notice.css'
import { MemberList } from './MemberList';
import {Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NoticeMember = ({ teamdetails }) =>{
    return(
        <div className='Rules'>
            <div className='Rules-button'>
                <Link to={`/team-detail/${teamdetails._id}`} className="custom-unnotice-link">
                    <Button size="lg" className="custom-unnotice">
                        公告
                    </Button>
                </Link>
                <Button href="#" size="lg" className="custom-notice">隊友資訊</Button>{' '}
            </div>
            <div className='Rules-post'>
                <MemberList/>
            </div>
        </div>
    )
}
export default NoticeMember;