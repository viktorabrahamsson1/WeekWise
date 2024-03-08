import Day from "./Day";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function Week() {
  return (
    <div className="flex flex-wrap gap-4">
      {days.map((day) => (
        <Day day={day} />
      ))}
    </div>
  );
}

export default Week;
