import { useState, useEffect, memo } from "react";

type TimeProps = {
  hours: number,
  minutes: number,
  seconds: number,
};

type DataProps = {
  paused: boolean,
  over: boolean,
};

const CountDown = (props: TimeProps) => {
  const [data, setData] = useState<DataProps>({
    paused: false,
    over: false,
  });

  const [[h, m, s], setTime] = useState([props.hours, props.minutes, props.seconds]);

  const tick = () => {
    if (data.paused || data.over) return;

    if (h === 0 && m === 0 && s === 0) {
      setData({ ...data, over: true });
    } else if (m === 0 && s === 0) {
      setTime([h - 1, 59, 59]);
    } else if (s === 0) {
      setTime([h, m - 1, 59]);
    } else {
      setTime([h, m, s - 1]);
    }
  };

  const reset = () => {
    setTime([props.hours, props.minutes, props.seconds]);
    setData({ ...data, paused: false, over: false });
  };

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  });

  return (
    <div>
      <p>{`${h.toString().padStart(2, '0')}:${m
        .toString()
        .padStart(2, '0')}:${s.toString().padStart(2, '0')}`}</p>
      <div>{data.over ? "Time's up!" : ''}</div>
      <button onClick={() => setData({ ...data, paused: !data.paused })}>
        {data.paused ? 'Resume' : 'Pause'}
      </button>
      <button onClick={() => reset()}>Restart</button>
    </div>
  );
};

export default memo(CountDown);