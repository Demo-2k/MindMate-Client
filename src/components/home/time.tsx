import { useEffect, useState } from "react";

export default function Clock() {
  const [timeString, setTimeString] = useState("");
  const [dateString, setDateString] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      const pad = (num: number) => num.toString().padStart(2, "0");
      setTimeString(`${hours}:${pad(minutes)}:${pad(seconds)} ${ampm}`);

      const weekdays = [
        "Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"
      ];
      const months = [
        "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"
      ];
      const day = weekdays[now.getDay()];
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
    <div className="flex flex-col items-center text-white gap-1">
      <div className="md:text-3xl font-medium">{timeString}</div>
      <div className="text-[13px] md:text-sm">{dateString}</div>
    </div>
  );
}
