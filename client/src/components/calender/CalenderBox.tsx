type CalenderBoxProps = {
  num: number;
};

function CalenderBox({ num }: CalenderBoxProps) {
  return (
    <div className=" flex h-32 w-32 cursor-pointer items-center justify-center rounded-sm bg-gray-600 p-10 duration-100 hover:bg-gray-500">
      <span className="text-xl font-semibold">{num}</span>
    </div>
  );
}

export default CalenderBox;
