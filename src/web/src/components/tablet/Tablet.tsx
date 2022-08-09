import { useEffect, useState } from "react";
import moment from 'moment';
import Moment from 'react-moment';

type Props = {
    isAdmin: boolean,
}

const Tablet = () => {
    const [data, setData] = useState<Props>({
        isAdmin: false,
    });

    const [uiTime, setUiTime] = useState({
        time: '',
    });

    useEffect(() => {
        setInterval(() => {
            setUiTime({
                time: moment().format('HH:mm'),
            });
        }, 1000);
    });

    return (
        <div className='tablet'>
            <div className='container'>
                <div className='border'>
                    <nav className='navbar'>
                        <span className='time'>{uiTime.time}</span>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Tablet;