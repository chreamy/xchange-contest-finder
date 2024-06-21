import './Notice.css'
import { PostList } from './PostList';
import {Button} from 'react-bootstrap';
import { Link } from "react-router-dom";

const NoticePost = ({ teamdetails,teamposts }) => {
    if (!teamposts) {
        return <div>postLoading...</div>;
    }
    return(
        <div className='Rules'>
            <div className='Rules-button'>
                <Button href="#" size="lg" className="custom-notice">公告</Button>{' '}
                <Link to={`/team-detail-member/${teamdetails._id}`} className="custom-unnotice-link">
                    <Button size="lg" className="custom-unnotice">
                        隊友資訊
                    </Button>
                </Link>
                {/*<Link to={`/team-detail-member/${teamdetails._id}`} className="custom-unnotice">
                    隊友資訊
                </Link>
                <Button href="#" size="lg" className="custom-unnotice">隊友資訊</Button>{' '}*/}
            </div>
            <PostList teamposts={teamposts}/>
        </div> 
    )
}
export default NoticePost;