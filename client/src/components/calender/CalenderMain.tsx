import CalenderBox from "./CalenderBox";

const test = Array.from(Array(52).keys());
console.log(test);

function CalenderMain() {
  return (
    <div className="flex flex-wrap gap-4">
      {test.map((_, index) => (
        <CalenderBox key={index} num={index + 1} />
      ))}
    </div>
  );
}

export default CalenderMain;
