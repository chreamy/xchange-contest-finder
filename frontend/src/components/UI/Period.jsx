import './Period.css';

function Period({contestData}){
    return(
        <div className='Period'>
            <h2 className='title'>比賽期間</h2>
            <p className='substance'>{new Date(contestData.startDate).toLocaleString()} ~ {new Date(contestData.endDate).toLocaleString()}</p>
        </div>

    )
}
export default Period;