import './Period.css'
import contest_detail_test from './contest_detail_test.json';
function Type(){
    return(
        <div className='Period'>
            <h2 className='title'>比賽類別</h2>
            <p className='substance'>#{contest_detail_test[0].tags[0]}</p>
            <p className='substance'>#{contest_detail_test[0].tags[1]}</p>
        </div>

    )
}
export default Type;