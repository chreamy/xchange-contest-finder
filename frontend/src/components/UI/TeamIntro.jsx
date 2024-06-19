import './Period.css'
import contest_detail from './contest_detail_test.json';

function TeamIntro(){
    return(
        <div className='Period'>
            <h2 className='title'>隊伍簡介</h2>
            <p className='substance'>{contest_detail[0].startDate}</p>
        </div>
    )
}
export default TeamIntro;