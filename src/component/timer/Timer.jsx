import React, { useEffect, useState } from 'react';

const Timer = ({ aktuator }) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const updatedTime = new Date(aktuator.updated_at).getTime();
      const difference = currentTime - updatedTime;
      setElapsedTime(difference);
    }, 1000);

    return () => clearInterval(interval);
  }, [aktuator.updated_at]);

  const formatTime = (time) => {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  return <div>Waktu menyala: {formatTime(elapsedTime)}</div>;
};

export default Timer;
