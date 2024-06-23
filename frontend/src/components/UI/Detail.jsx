import React from 'react';
import './Detail.css';
import Organizer from './Organizer';
import Period from './Period';
import Type from './Type';

// Accept detailData as a prop in Detail
function Detail({ contestData }) {
    return (
        <div className='Detail'>
            <Period contestData={contestData} />
            <Organizer contestData={contestData} />
            <Type contestData={contestData} />
        </div>
    );
}

export default Detail;
