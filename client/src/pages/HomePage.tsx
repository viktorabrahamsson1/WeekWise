import { useAppContext } from "../contexts/AppContext";

function HomePage() {
  const { isLoggedIn } = useAppContext();

  return (
    <div>
      {!isLoggedIn ? (
        <p>Please log in to access this application</p>
      ) : (
        <p>Home Page</p>
      )}
    </div>
  );
}

export default HomePage;
