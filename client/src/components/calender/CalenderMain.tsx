import CalenderBox from "./CalenderBox";
import { format, startOfWeek } from "date-fns";

const weeks = Array.from(Array(52).keys());

function CalenderMain() {
  const getWeek = (date: Date): number => {
    const startOfWeekDate = startOfWeek(date, { weekStartsOn: 1 }); //

    const weekNumber = parseInt(format(startOfWeekDate, "w"), 10);

    return weekNumber;
  };

  const currentDate = new Date();
  const currentWeek = getWeek(currentDate);

  return (
    <div className="flex flex-wrap  gap-4 ">
      {weeks.map((_, index) => (
        <CalenderBox key={index} num={index + 1} currentWeek={currentWeek} />
      ))}
    </div>
  );
}

export default CalenderMain;
