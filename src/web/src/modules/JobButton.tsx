import { memo } from 'react';

interface Props {
    text: string;
    clickFunction: () => void;
}

const JobButton = (props: Props) => {
    return <button className='job_button' onClick={props?.clickFunction}>{props?.text}</button>
}

export default memo(JobButton);