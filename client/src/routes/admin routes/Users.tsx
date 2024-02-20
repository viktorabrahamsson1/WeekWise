import { useLoaderData } from "react-router";
import { useState } from "react";

import UserHeader from "../../components/admincomponents/UserHeader";
import UserRow from "../../components/admincomponents/UserRow";
import EditUser from "../../components/admincomponents/EditUser";
import * as apiClient from "../../api-client";
import DeleteUser from "../../components/admincomponents/DeleteUser";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  isVerified: boolean;
  verificationToken: string;
};

function Users() {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [openOptionsUserId, setOpenOptionsUserId] = useState<string | null>(
    null,
  );
  const users = useLoaderData() as User[];

  const toggleEdit = () => {
    setEditOpen((open) => !open);
  };

  const toggleDelete = () => {
    setDeleteOpen((open) => !open);
  };

  const toggleOptions = (userId: string) => {
    if (openOptionsUserId === userId) {
      setOpenOptionsUserId(null);
    } else {
      setOpenOptionsUserId(userId);
    }
  };

  return (
    <div className="relative flex flex-col gap-4">
      <div className="flex items-center justify-between pb-1">
        <h2 className="text-2xl font-semibold">Users</h2>
        <input
          placeholder="Search for users"
          className="w-36 rounded-md border border-gray-500 px-2 py-1 dark:border-none dark:bg-slate-700 xs:w-auto "
        />
      </div>
      <UserHeader />
      <div className="flex max-h-[500px] flex-col divide-y-[1px] divide-gray-200 overflow-y-scroll  dark:divide-gray-800 ">
        {users.map((user: User) => (
          <UserRow
            user={user}
            key={user.email}
            isOpen={openOptionsUserId === user.email}
            onToggleOptions={toggleOptions}
            toggleEdit={toggleEdit}
            setCurrentUser={setCurrentUser}
            toggleDelete={toggleDelete}
          />
        ))}
      </div>
      <EditUser
        toggleEdit={toggleEdit}
        editOpen={editOpen}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        setEditOpen={setEditOpen}
      />
      <DeleteUser
        currentUser={currentUser}
        toggleDelete={toggleDelete}
        deleteOpen={deleteOpen}
      />
    </div>
  );
}

export const loader = (): Promise<User> => {
  const data = apiClient.getUsers();
  return data;
};

export default Users;
