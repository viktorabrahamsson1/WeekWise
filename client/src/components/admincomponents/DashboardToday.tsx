import { useEffect, useState } from "react";
import { User } from "../../routes/admin routes/Users";

import DashboardUsersToday from "./DashboardUsersToday";
import * as apiClient from "../../api/api-admin";

function DashboardToday() {
  const [usersToday, setUsersToday] = useState<User[]>([]);
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiClient.adminGetUsersToday(today);
        setUsersToday(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [today]);

  return (
    <div className="flex w-full flex-1 flex-col gap-2 overflow-y-auto rounded-md bg-indigo-200 p-5 dark:bg-slate-800 md:size-72 ">
      <h3 className="text-xl font-semibold">New users today</h3>
      <div className="flex flex-col divide-y-[1px] divide-gray-600">
        {usersToday &&
          usersToday.map((user) => (
            <DashboardUsersToday key={user.email} user={user} />
          ))}
        {!usersToday && <p>No new users</p>}
      </div>
    </div>
  );
}

export default DashboardToday;
