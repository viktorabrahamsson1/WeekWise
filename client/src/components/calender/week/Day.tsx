import DeleteIcon from "../../icons/DeleteIcon";
import PlusIcon from "../../icons/PlusIcon";

type WeekProps = {
  day: string;
};

function Week({ day }: WeekProps) {
  return (
    <div>
      <div className="flex h-[500px] max-h-[500px] w-[250px] flex-col rounded-md bg-indigo-100 dark:bg-slate-600">
        <div className="flex h-[60px] items-center justify-between rounded-md rounded-b-none border-2 border-indigo-100 bg-indigo-200 p-3 text-lg font-bold dark:border-slate-600 dark:bg-slate-700">
          <span>{day}</span>
          <button className="rounded px-1 py-2">
            <DeleteIcon />
          </button>
        </div>
        <div className="flex flex-grow flex-col gap-4 overflow-y-auto overflow-x-hidden p-2"></div>
        <button className="flex items-center border-t-2 border-indigo-200 p-4 hover:bg-indigo-200 hover:text-gray-900 active:bg-slate-600 dark:border-slate-800 dark:hover:bg-slate-700 dark:hover:text-indigo-300">
          <PlusIcon />
          <span>Add task</span>
        </button>
      </div>
    </div>
  );
}

export default Week;
