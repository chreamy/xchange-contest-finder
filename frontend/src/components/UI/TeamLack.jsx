import './Period.css'
import contest_detail from './contest_detail_test.json';
function TeamLack(){
    return(
        <div className='Period'>
            <h2 className='title'>團隊缺乏能力</h2>
            <p className='substance'>#{contest_detail[0].tags[1]}</p>
        </div>

    )
}
export default TeamLack;