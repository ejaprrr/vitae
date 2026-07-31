"use client";

import { useEffect, useState } from "react";

export function LocalTime() {
  const [time, setTime] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const pragueTime = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/Prague",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date());
      setTime(`${pragueTime} (cet)`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // update every minute
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return <span className="opacity-0 tabular-nums">00:00 (cet)</span>;
  }

  return <span className="tabular-nums lowercase">{time}</span>;
}
