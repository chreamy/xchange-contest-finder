import './Notice.css'
import { MemberList } from './MemberList';
import {Button} from 'react-bootstrap';

function Notice(){
    return(
        <div className='Rules'>
            <div className='Rules-button'>
                <Button href="#" size="lg" className="custom-unnotice">公告</Button>{' '}
                <Button href="#" size="lg" className="custom-notice">隊友資訊</Button>{' '}
            </div>
            <div className='Rules-post'>
                <MemberList/>
            </div>
        </div>
    )
}
export default Notice;