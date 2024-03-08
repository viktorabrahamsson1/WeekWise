import { Link } from "react-router-dom";

type CalenderBoxProps = {
  num: number;
};

function CalenderBox({ num }: CalenderBoxProps) {
  return (
    <Link
      to={`/calender/${num}`}
      className=" flex size-32 cursor-pointer items-center justify-center rounded-md bg-gray-600 p-10 duration-100 hover:bg-gray-500"
    >
      <span className="text-xl font-semibold">{num}</span>
    </Link>
  );
}

export default CalenderBox;
