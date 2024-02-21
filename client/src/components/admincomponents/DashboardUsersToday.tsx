import { User } from "../../routes/admin routes/Users";

type DashboardUsersTodayProps = {
  user: User;
};

function DashboardUsersToday({ user }: DashboardUsersTodayProps) {
  return (
    <div className="flex items-center gap-2 py-2">
      <p className="w-2/4 sm:w-1/4">{user.firstName}</p>
      <p className="hidden w-1/4 sm:block md:hidden xl:block">
        {user.lastName}
      </p>
      <p className="w-2/4 truncate">{user.email}</p>
    </div>
  );
}

export default DashboardUsersToday;
