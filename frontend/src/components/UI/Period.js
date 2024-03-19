import './Period.css'
import contest_detail_test from './contest_detail_test.json';

function Period(){
    return(
        <div className='Period'>
            <h2 className='title'>比賽期間</h2>
            <p className='substance'>{contest_detail_test[0].startDate} ~ {contest_detail_test[0].endDate}</p>
        </div>

    )
}
export default Period;