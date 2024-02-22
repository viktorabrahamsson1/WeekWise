import { useAppContext } from "../../contexts/AppContext";

function HomePageHeader() {
  const {
    userInfo: { firstName },
  } = useAppContext();

  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-xl font-bold ">Hey, {firstName} 👋</h2>
      <span className="text-sm text-gray-500">
        See what's happening in your workspace
      </span>
    </div>
  );
}

export default HomePageHeader;
