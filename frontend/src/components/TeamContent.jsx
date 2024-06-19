import './Content.css'
import TeamDetail from '../components/UI/TeamDetail';
import Notice from './Notice';
function TeamContent(){
    return(
        <div className='Content'>
            <TeamDetail/>
            <Notice/>
        </div>
    )
}
export default TeamContent;