import { useSignOut } from "../hooks/useSignOut";

function SignOutButton() {
  const { handleClick } = useSignOut();

  return (
    <button
      onClick={handleClick}
      className="cursor-pointer rounded-sm bg-white px-2 py-1 font-bold text-blue-600 duration-150 hover:bg-gray-100"
    >
      Sign Out
    </button>
  );
}

export default SignOutButton;
