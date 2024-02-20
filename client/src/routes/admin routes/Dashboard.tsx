function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <div className="flex items-center gap-8">
        <div className="flex flex-1 flex-col gap-2 p-6 dark:bg-slate-800">
          <h3 className="text-xl font-semibold">Today</h3>
          <div className="flex flex-col divide-y-[1px] divide-gray-600">
            <p>1</p>
            <p>1</p>
            <p>1</p>
            <p>1</p>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-2 p-6 dark:bg-slate-800">
          <h3 className="text-xl font-semibold">Today</h3>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
