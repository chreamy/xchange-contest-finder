import './Content.css'
import TeamDetail from '../components/UI/TeamDetail';
import NoticePost from './NoticePost';
const TeamPost = () => {
    return(
        <div className='Content'>
            <TeamDetail/>
            <NoticePost/>{/* 将posts数据传递给NoticePost组件 */}
        </div>
    )
}
export default TeamPost;