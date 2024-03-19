import './Detail.css';
import Period from './Period';
import Organizer from './Organizer';
import Type from './Type';


function Detail(){
    return(
        <div className='Detail'>
            <Period/>
            <Organizer/>
            <Type/>
            
        </div>
    )
}
export default Detail;