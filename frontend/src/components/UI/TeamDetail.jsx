import './Detail.css';
import TeamIntro from './TeamIntro';
import TeamType from './TeamType';
import TeamLack from './TeamLack';



function TeamDetail(){
    return(
        <div className='Detail'>
            <TeamIntro/>
            <TeamType/>
            <TeamLack/>
            
        </div>
    )
}
export default TeamDetail;