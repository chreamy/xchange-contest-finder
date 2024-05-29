import './Period.css'
import contest_detail_test from './contest_detail_test.json';

function Organizer(){
    return(
        <div className='Period'>
            <h2 className='title'>主辦單位</h2>
            <p className='substance'>{contest_detail_test[0].organizer}</p>
        </div>

    )
}
export default Organizer;