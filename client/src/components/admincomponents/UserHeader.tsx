function UserHeader() {
  return (
    <header className="flex gap-10 rounded-sm bg-indigo-200 py-2 pl-4 pr-10 font-semibold text-gray-700 dark:bg-slate-800 dark:text-gray-200 xs:justify-between">
      <h2 className="w-1/4 text-nowrap">First name</h2>
      <h2 className="hidden w-1/4 md:block">Verified</h2>
      <h2 className="hidden w-1/4 xs:block">User Role</h2>
      <h2 className="w-1/4">Email</h2>
    </header>
  );
}

export default UserHeader;
