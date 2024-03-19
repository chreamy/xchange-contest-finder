import './Rules.css'
import contest_detail_test from './contest_detail_test.json';
function Rules(){
    return(
        <div className='Rules'>
            <h2 className='title-Rules'>比賽辦法</h2>
            <p className='content-Rules'>{contest_detail_test[0].detail}</p>
        </div>
    )
}
export default Rules;