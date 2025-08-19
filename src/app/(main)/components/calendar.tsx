"use client";

import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { Calendar } from "@/components/ui/calendar";

export default function DiaryCalendar() {
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  const [entries, setEntries] = React.useState([
    { date: "2025-08-18", text: "Өнөөдөр их бүтээлтэй өдөр байлаа" },
    { date: "2025-08-19", text: "Ядарсан өдөр, бага зэрэг стресстэй" },
  ]);
  const [currentText, setCurrentText] = React.useState("");

  React.useEffect(() => {
    const dateStr = selectedDate.toISOString().split("T")[0];
    const entry = entries.find((e) => e.date === dateStr);
    setCurrentText(entry?.text || "");
  }, [selectedDate, entries]);

  const handleSave = (text: string) => {
    const dateStr = selectedDate.toISOString().split("T")[0];
    const existing = entries.find((e) => e.date === dateStr);
    if (existing) {
      setEntries(
        entries.map((e) =>
          e.date === dateStr ? { ...e, text: currentText } : e
        )
      );
    } else {
      setEntries([...entries, { date: dateStr, text }]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="p-4 shadow-lg rounded-2xl">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => {
            if (date) setSelectedDate(date);
          }}
          required={false}
          className="rounded-md border shadow-sm"
        />
      </Card>

      <Card className="p-4 shadow-lg rounded-2xl">
        <h2 className="text-lg font-semibold mb-2">
          Diary for {selectedDate.toDateString()}
        </h2>
        <Textarea
          value={currentText}
          onChange={(e) => handleSave(e.target.value)}
          placeholder="Өнөөдрийн сэтгэгдлээ бичээрэй..."
        />
      </Card>
    </div>
  );
}
