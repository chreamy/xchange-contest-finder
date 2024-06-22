import './Content.css'
import TeamDetail from '../components/UI/TeamDetail';
import NoticePost from './NoticePost';

const TeamPost = ({ teamdetails,teamposts }) => {
    if (!teamdetails) {
        return <div>Loading...</div>;
      }
    if (!teamposts) {
        return <div>postLoading...</div>;
    }
    return (
        <div className='Content'>
            <TeamDetail teamdetails={teamdetails}/>
            <NoticePost teamdetails={teamdetails} teamposts={teamposts}/>{/* 将posts数据传递给NoticePost组件 */}
        </div>
    );
  };
  
  export default TeamPost;