import './Period.css';

function Organizer({contestData}){
    return(
        <div className='Period'>
            <h2 className='title'>主辦單位</h2>
            <p className='substance'>{contestData.organizer}</p>
        </div>

    )
}
export default Organizer;