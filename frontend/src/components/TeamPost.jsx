import './Content.css'
import TeamDetail from '../components/UI/TeamDetail';
import NoticePost from './NoticePost';
function TeamPost(){
    return(
        <div className='Content'>
            <TeamDetail/>
            <NoticePost/>
        </div>
    )
}
export default TeamPost;