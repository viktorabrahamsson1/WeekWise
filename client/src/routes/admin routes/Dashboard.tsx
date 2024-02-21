import DashboardCircle from "../../components/admincomponents/DashboardCircle";
import DashboardGraph from "../../components/admincomponents/DashboardGraph";
import DashboardToday from "../../components/admincomponents/DashboardToday";

function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <div className="flex flex-col items-center gap-6 md:flex-row">
        <DashboardToday />
        <DashboardCircle />
      </div>
      <DashboardGraph />
    </div>
  );
}

export default Dashboard;
