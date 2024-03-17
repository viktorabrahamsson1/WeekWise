import useProgress from "../../hooks/useProgress";

function Score() {
  const { allTasks, allCompletedTasks } = useProgress();
  return (
    <div className="hidden items-center gap-2 dark:text-gray-300 md:flex">
      <p>
        {allCompletedTasks} / {allTasks}
      </p>
      <p>Completed tasks 🚀</p>
    </div>
  );
}

export default Score;
