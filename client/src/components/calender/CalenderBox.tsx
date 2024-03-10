import { Link } from "react-router-dom";

type CalenderBoxProps = {
  num: number;
  currentWeek: number;
};

function CalenderBox({ num, currentWeek }: CalenderBoxProps) {
  const isPastWeek = num < currentWeek;
  const isCurrentWeek = num === currentWeek;
  const isFutureWeek = num > currentWeek;

  let backgroundColor = "";
  let hoverEffect = "";

  if (isPastWeek) {
    backgroundColor = "dark:bg-gray-600 bg-indigo-200";
    hoverEffect = "dark:hover:bg-gray-500 hover:bg-indigo-300";
  } else if (isCurrentWeek) {
    backgroundColor = "dark:bg-blue-600 bg-blue-500";
    hoverEffect = "dark:hover:bg-blue-500 hover:bg-blue-600";
  } else if (isFutureWeek) {
    backgroundColor = "dark:bg-gray-800 bg-indigo-400";
    hoverEffect = "dark:hover:bg-gray-700 hover:bg-indigo-500";
  }

  return (
    <Link
      to={`/calender/${num}`}
      className={`${backgroundColor} ${hoverEffect} flex size-16 cursor-pointer items-center justify-center rounded-md duration-100  sm:size-32 sm:p-10 `}
    >
      <span className="text-2xl font-semibold">{num}</span>
    </Link>
  );
}

export default CalenderBox;
