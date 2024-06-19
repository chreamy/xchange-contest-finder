import './Period.css'
import contest_detail from './contest_detail_test.json';
function TeamType(){
    return(
        <div className='Period'>
            <h2 className='title'>期望隊友類型</h2>
            <p className='substance'>#{contest_detail[0].tags[0]}</p>
        </div>

    )
}
export default TeamType;