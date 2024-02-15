import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center font-bold text-gray-700">
      <span>We cant find the page you are looking for</span>
      <Link to="/" className="font-medium underline hover:text-gray-900">
        Go to HomePage
      </Link>
    </div>
  );
}

export default PageNotFound;
