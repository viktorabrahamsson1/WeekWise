import KanbanBoard from "../components/KanbanBoard/KanbanBoard";
import HomePageActions from "../components/homepage/HomePageActions";
import HomePageHeader from "../components/homepage/HomePageHeader";
import HomePageNew from "../components/homepage/HomePageNew";
import HomePageNotes from "../components/homepage/HomePageNotes";

function HomePage() {
  return (
    <div className="flex flex-col gap-6 text-gray-700 dark:text-gray-200">
      <HomePageHeader />
      <HomePageNew />
      <HomePageActions />
      <HomePageNotes>
        <KanbanBoard />
      </HomePageNotes>
    </div>
  );
}

export default HomePage;
