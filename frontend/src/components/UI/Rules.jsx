import './Rules.css';
function Rules({contestData}){
    return(
        <div className='Rules'>
            <h2 className='title-Rules'>比賽辦法</h2>
            <p className='content-Rules'>{contestData.detail}</p>
        </div>
    )
}
export default Rules;