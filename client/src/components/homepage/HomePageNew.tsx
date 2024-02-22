function HomePageNew() {
  return (
    <div className="flex flex-col gap-2 rounded-md bg-indigo-100 p-2 dark:bg-slate-800 sm:p-4">
      <div className="flex items-center gap-2">
        <span className="rounded-sm bg-indigo-200 px-[6px] text-[14px] font-bold text-indigo-500  dark:bg-slate-600 dark:text-slate-200">
          New
        </span>
        <h2 className="text-[14px] text-lg font-semibold">
          Workflows & Design
        </h2>
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
  );
}

export default HomePageNew;
