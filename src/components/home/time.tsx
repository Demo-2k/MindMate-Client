import { useEffect, useState } from "react";

export default function Clock() {
  const [timeString, setTimeString] = useState("");
  const [dateString, setDateString] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      // цаг
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      const pad = (num: number) => num.toString().padStart(2, "0");
      const time = `${hours}:${pad(minutes)}:${pad(seconds)} ${ampm}`;
      setTimeString(time);

      // өдөр
      const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
      const day = weekdays[now.getDay()];
      const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      const date = now.getDate();
      const month = months[now.getMonth()];
      const year = now.getFullYear().toString().slice(-2);
      setDateString(`${day} | ${date} ${month} '${year}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-2 right-0 md:top-4 md:right-4 z-50 flex flex-col items-center text-white md:gap-1">
      <div className="text-md md:text-3xl font-medium">{timeString}</div>
      <div className="text-[12px] md:text-sm">{dateString}</div>
    </div>
  );
}
