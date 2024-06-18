import './Notice.css'
import { PostList } from './PostList';
import {Button} from 'react-bootstrap';

const NoticePost = () => {
    return(
        <div className='Rules'>
            <div className='Rules-button'>
                <Button href="#" size="lg" className="custom-notice">公告</Button>{' '}
                <Button href="#" size="lg" className="custom-unnotice">隊友資訊</Button>{' '}
            </div>
            <PostList/>
        </div>
    )
}
export default NoticePost;