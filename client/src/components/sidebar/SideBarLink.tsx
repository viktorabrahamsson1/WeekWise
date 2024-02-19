import { Link } from "react-router-dom";

type SideBarLinkProps = {
  name: string;
  path: string;
  activeLink: string;
  handleSetActiveLink: (pathName: string) => void;
  icon: React.ReactNode;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function SideBarLink({
  name,
  path,
  activeLink,
  handleSetActiveLink,
  icon,
  setIsOpen,
}: SideBarLinkProps) {
  return (
    <Link
      to={path}
      onClick={() => {
        setIsOpen(false);
        handleSetActiveLink(path);
      }}
      className={`${activeLink === path && "bg-indigo-300 dark:bg-slate-900"} group flex items-center gap-4 rounded-md px-4 py-2 duration-150  hover:bg-indigo-300 dark:hover:bg-slate-900 `}
    >
      {icon}
      <span className="text-lg font-semibold text-slate-600 duration-150 group-hover:text-white dark:text-gray-300">
        {name}
      </span>
    </Link>
  );
}

export default SideBarLink;
