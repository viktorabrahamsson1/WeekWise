import { useState } from "react";

import UserHeader from "../../components/admincomponents/UserHeader";
import UserRow from "../../components/admincomponents/UserRow";
import EditUser from "../../components/admincomponents/EditUser";
import DeleteUser from "../../components/admincomponents/DeleteUser";
import useUsers from "../../hooks/useUsers";
import Spinner from "../../components/Spinner";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  isVerified: boolean;
  verificationToken: string;
  createdAt: string;
};

function Users() {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [openOptionsUserId, setOpenOptionsUserId] = useState<string | null>(
    null,
  );

  const { data: users, isLoading } = useUsers();

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

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="relative flex flex-col gap-4">
      <h2 className="pb-1 text-2xl font-semibold">Users</h2>
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

export default Users;
