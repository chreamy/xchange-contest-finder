import React from 'react';
import Detail from '../components/UI/Detail';
import Rules from '../components/UI/Rules';
import './Content.css';

function Content({ contestData }) {
    return (
        <div className='Content'>
            <Detail contestData={contestData}/>
            <Rules contestData={contestData}/>
        </div>
    );
}

export default Content;
