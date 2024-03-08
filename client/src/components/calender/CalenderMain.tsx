import CalenderBox from "./CalenderBox";

const weeks = Array.from(Array(52).keys());

function CalenderMain() {
  return (
    <div className="flex flex-wrap gap-4 self-center">
      {weeks.map((_, index) => (
        <CalenderBox key={index} num={index + 1} />
      ))}
    </div>
  );
}

export default CalenderMain;
