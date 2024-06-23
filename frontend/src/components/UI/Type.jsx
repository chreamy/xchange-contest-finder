import './Period.css';
function Type({contestData}){
    return(
        <div className='Period'>
            <h2 className='title'>比賽類別</h2>
            {contestData.tags?.map((tag)=>{
                return <p className='substance'>#{tag}</p>
            })}
            
        </div>

    )
}
export default Type;