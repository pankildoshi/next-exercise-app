import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";

const Timer = (props, ref) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  const hours = Math.floor(time / 360000);

  const minutes = Math.floor((time % 360000) / 6000);

  const seconds = Math.floor((time % 6000) / 100);

  const startAndStop = () => {
    setIsRunning(!isRunning);
  };
  const reset = () => {
    setTime(0);
  };
  const getTime = () => {
    return time;
  };

  useImperativeHandle(ref, () => ({
    startAndStop,
    reset,
    getTime,
  }));

  return (
    <div className="">
      <p className="text-2xl font-semibold">
        {hours}:{minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </p>
    </div>
  );
};

export default forwardRef(Timer);
