import './Period.css'
//import contest_detail from './contest_detail_test.json';

const TeamIntro = ({ teamdetails }) => {
    if (!teamdetails) {
        return <div>Loading...</div>;
      }
    return(
        <div className='Period'>
            <h2 className='title'>隊伍簡介</h2>
            <p className='substance'>{teamdetails.introduction}</p>
        </div>
    )
}
export default TeamIntro;