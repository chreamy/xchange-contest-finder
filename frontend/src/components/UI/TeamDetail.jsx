import './Detail.css';
import TeamIntro from './TeamIntro';
///import TeamType from './TeamType';
///import TeamLack from './TeamLack';

const TeamDetail = ({ teamdetails }) => {
    if (!teamdetails) {
        return <div>Loading...</div>;
      }
    return (
        <div className='Detail'>
            <TeamIntro teamdetails={teamdetails}/>
            {/*<TeamType/>
            <TeamLack/>*/}
        </div>
    );
  };
  export default TeamDetail;