import { Cell, Pie, PieChart } from "recharts";
import { User } from "../../routes/admin routes/Users";
import useUsers from "../../hooks/useUsers";
import Spinner from "../Spinner";

function DashboardCircle() {
  const { data: users, isLoading } = useUsers();

  if (isLoading) {
    return <Spinner />;
  }

  const isVerified = users.filter((user: User) => user.isVerified === true);
  const notVerified = users.length - isVerified.length;

  const data = [
    { name: "Verified", value: isVerified.length },
    { name: "Not verifed", value: notVerified },
  ];

  const COLORS = ["#9055ee", "#5f9ceb"];

  return (
    <div className="flex w-full flex-1 flex-col gap-2 rounded-md bg-indigo-200 p-5 dark:bg-slate-800 md:size-72 ">
      <h3 className="text-xl font-semibold">Verified users</h3>
      <div className="flex flex-col items-center justify-center gap-2 xs:flex-row">
        <PieChart width={200} height={200}>
          <Pie
            data={data}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-[#9055ee]"></span>
            <span>Verified</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-[#5f9ceb]"></span>
            <span className="text-nowrap">Not verified</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardCircle;
