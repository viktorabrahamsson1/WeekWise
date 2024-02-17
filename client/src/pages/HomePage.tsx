import { useAppContext } from "../contexts/AppContext";

//todo On light mode, change color theme to white + something

function HomePage() {
  const {
    userInfo: { firstName },
  } = useAppContext();
  return (
    <div className="flex flex-col gap-6 text-gray-700 dark:text-gray-200">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold">Hey, {firstName} 👋</h2>
        <span className="text-sm text-gray-400">
          See what's happening in your workspace
        </span>
      </div>
      <div className="flex flex-col gap-2 rounded-md bg-blue-600 p-4 dark:bg-slate-800">
        <div className="flex items-center gap-2">
          <span className="rounded-sm bg-slate-600 px-[6px] text-[14px]  font-bold text-slate-200">
            New
          </span>
          <h2 className="font-semibold">Workflows & Design</h2>
        </div>
        <p className="text-[15px]">
          New calender design, multiple user experience and customizeasion for
          each document
        </p>
        <div className="flex items-center gap-4 py-2">
          <button className="rounded-md bg-slate-700 px-3 py-[2px] duration-150 hover:bg-slate-600">
            Explore
          </button>
          <button className="rounded-md px-2 py-[2px] text-slate-200 duration-150 hover:text-slate-100">
            Learn More
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-3 rounded-md bg-slate-800 p-4">
        <h2 className="font-semibold">Quick actions</h2>
        <div className="flex items-center gap-4">
          <button className="rounded-md bg-slate-700 px-3 py-[2px] duration-150 hover:bg-slate-600">
            📄 Add note
          </button>
          <button className="rounded-md bg-slate-700 px-3 py-[2px] duration-150 hover:bg-slate-600">
            💬 new Feedback
          </button>
          <button className="rounded-md bg-slate-700 px-3 py-[2px] duration-150 hover:bg-slate-600">
            🔨 Start building
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-3 rounded-md bg-slate-800 p-4">
        <h2 className="font-semibold"> Notes</h2>
        <div className="flex items-center gap-4 rounded-md bg-slate-700 px-4 py-2">
          Notes...
        </div>
      </div>
    </div>
  );
}

export default HomePage;
