import './Content.css'
import TeamDetail from '../components/UI/TeamDetail';
import NoticeMember from './NoticeMember';

const TeamContent = ({ teamdetails }) => {    ///members
    if (!teamdetails) {
        return <div>Loading...</div>;
      }
///    if (!members) {
///        return <div>postLoading...</div>;
///    }
    return (
        <div className='Content'>
            <TeamDetail teamdetails={teamdetails}/>
            <NoticeMember teamdetails={teamdetails}/>{/* 将posts数据传递给NoticePost组件 teamposts={members}*/}
        </div>
    );
  };
  
  export default TeamContent;