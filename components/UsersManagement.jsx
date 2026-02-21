import React from "react";
import UserTableRow from "./UserTableRow";

const UsersManagement = ({
  users,
  editUser,
  toggleUserStatus,
  awardPoints,
}) => {
  return (
    <section className="max-w-[1400px] mx-auto p-6">
      <div className="bg-white rounded-[8px] shadow-sm p-6">
        <h2 className="text-[20px] font-semibold text-[#2d3748] mb-6">
          Manage Users
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e1e4e8]">
                <th className="text-left p-4 text-[#4a5568]">Name</th>
                <th className="text-left p-4 text-[#4a5568]">Email</th>
                <th className="text-left p-4 text-[#4a5568]">Role</th>
                <th className="text-left p-4 text-[#4a5568]">Points</th>
                <th className="text-left p-4 text-[#4a5568]">Status</th>
                <th className="text-left p-4 text-[#4a5568]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <UserTableRow
                  key={user.id}
                  user={user}
                  editUser={editUser}
                  toggleUserStatus={toggleUserStatus}
                  awardPoints={awardPoints}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default UsersManagement;
