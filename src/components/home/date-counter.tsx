'use client';
import { useState, useEffect } from 'react';

const Clock = () => {
  const [time, setTime] = useState(null);

  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  if (!time) {
    return null; // Render nothing on the server
  }

  return (
    <div className="text-xs mr-4 font-semibold  text-slate-600">
      {time.toLocaleTimeString()}
    </div>
  );
};

export default Clock;
