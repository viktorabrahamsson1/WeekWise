import { Link } from "react-router-dom";
import { useActiveLink } from "../../hooks/useActiveLink";

function HomePageActions() {
  const { handleSetActiveLink } = useActiveLink();

  return (
    <div className="flex flex-col gap-3 rounded-md bg-white p-2 shadow-sm dark:bg-slate-800 sm:p-4">
      <h2 className="text-lg font-semibold">Quick actions</h2>
      <div className="flex flex-col flex-wrap items-center gap-4 xs:flex-row">
        <button className="rounded-md bg-indigo-200 px-3 py-[2px] font-semibold text-indigo-600 duration-150  hover:bg-indigo-300 dark:bg-slate-700 dark:text-gray-200 dark:hover:bg-slate-600">
          📄 Add note
        </button>
        <button className="rounded-md bg-indigo-200 px-3 py-[2px] font-semibold text-indigo-600 duration-150 hover:bg-indigo-300 dark:bg-slate-700 dark:text-gray-200 dark:hover:bg-slate-600">
          💬 new Feedback
        </button>
        <Link
          to="/calender"
          onClick={() => handleSetActiveLink("/calender")}
          className="rounded-md bg-indigo-200 px-3 py-[2px] font-semibold text-indigo-600 duration-150 hover:bg-indigo-300 dark:bg-slate-700 dark:text-gray-200 dark:hover:bg-slate-600"
        >
          🔨 Start building
        </Link>
      </div>
    </div>
  );
}

export default HomePageActions;
