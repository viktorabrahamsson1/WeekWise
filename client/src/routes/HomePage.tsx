import { useAppContext } from "../contexts/AppContext";

//todo On light mode, change color theme to white + something

function HomePage() {
  const {
    userInfo: { firstName },
  } = useAppContext();
  return (
    <div className="flex flex-col gap-6 text-gray-700 dark:text-gray-200">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold ">Hey, {firstName} 👋</h2>
        <span className="text-sm text-gray-500">
          See what's happening in your workspace
        </span>
      </div>

      <div className="flex flex-col gap-2 rounded-md bg-indigo-100 p-4 dark:bg-slate-800">
        <div className="flex items-center gap-2">
          <span className="rounded-sm bg-indigo-200 px-[6px] text-[14px] font-bold text-indigo-500  dark:bg-slate-600 dark:text-slate-200">
            New
          </span>
          <h2 className="font-semibold">Workflows & Design</h2>
        </div>
        <p className="text-[15px]">
          New calender design, multiple user experience and customizeasion for
          each document
        </p>
        <div className="flex items-center gap-4 pt-2">
          <button className="rounded-md bg-indigo-500 px-3 py-[2px] text-gray-200 duration-150 hover:bg-indigo-400 dark:bg-slate-700 dark:hover:bg-slate-600">
            Explore
          </button>
          <button className="rounded-md px-2 py-[2px] text-indigo-500 duration-150 hover:text-indigo-400 dark:text-gray-200 dark:hover:text-slate-100">
            Learn More
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-md bg-white p-4 shadow-sm dark:bg-slate-800">
        <h2 className="font-semibold">Quick actions</h2>
        <div className="flex items-center gap-4">
          <button className="rounded-md bg-indigo-200 px-3 py-[2px] font-semibold text-indigo-600 duration-150  hover:bg-indigo-300 dark:bg-slate-700 dark:text-gray-200 dark:hover:bg-slate-600">
            📄 Add note
          </button>
          <button className="rounded-md bg-indigo-200 px-3 py-[2px] font-semibold text-indigo-600 duration-150 hover:bg-indigo-300 dark:bg-slate-700 dark:text-gray-200 dark:hover:bg-slate-600">
            💬 new Feedback
          </button>
          <button className="rounded-md bg-indigo-200 px-3 py-[2px] font-semibold text-indigo-600 duration-150 hover:bg-indigo-300 dark:bg-slate-700 dark:text-gray-200 dark:hover:bg-slate-600">
            🔨 Start building
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-md bg-white p-4 shadow-sm dark:bg-slate-800">
        <h2 className="font-semibold"> Notes</h2>
        <div className="flex items-center gap-4 rounded-md bg-indigo-100 px-4 py-2 dark:bg-slate-700">
          Notes...
        </div>
      </div>
    </div>
  );
}

export default HomePage;
