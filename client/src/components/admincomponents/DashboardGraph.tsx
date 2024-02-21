import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { User } from "../../routes/admin routes/Users";
import useUsers from "../../hooks/useUsers";
import Spinner from "../Spinner";

function DashboardGraph() {
  const { data: users, isLoading } = useUsers();
  const months = [
    "Januari",
    "Febuari",
    "Mars",
    "April",
    "May",
    "June",
    "Juli",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (isLoading) {
    return <Spinner />;
  }

  const filter = (i: number) => {
    const s = users.filter(
      (user: User) => +user.createdAt.split("-")[1] === i + 1,
    ).length;
    return s;
  };

  const data = months.map((_: string, i: number) => {
    return {
      name: months[i],
      users: filter(i),
    };
  });
  console.log(data);

  return (
    <div className="flex flex-1 flex-col gap-6 rounded-md bg-indigo-200 p-5 dark:bg-slate-800">
      <h2 className="text-xl font-semibold">New users </h2>
      <div className="flex w-full items-center justify-center">
        <ResponsiveContainer height={300} width="100%">
          <LineChart
            width={600}
            height={300}
            className="flex items-center justify-center text-gray-700"
            data={data}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend className="mx-auto " />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#5a56af"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default DashboardGraph;
