import React from "react";
import { displayNameOf, initialsOf } from "../lib/utils"; 

const UserTableRow = ({ user, editUser, toggleUserStatus, awardPoints }) => {
  return (
    <tr className="border-b border-[#e1e4e8]">
      <td className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-[40px] h-[40px] bg-[#e2e8f0] rounded-full flex items-center justify-center text-[16px] font-medium text-[#4a5568]">
            {initialsOf(user)}
          </div>
          <span className="font-medium text-[#2d3748]">{displayNameOf(user)}</span>
        </div>
      </td>
      <td className="p-4 text-[#4a5568]">{user.email}</td>
      <td className="p-4">
        <span
          className={`px-2 py-1 rounded-[4px] text-[14px] font-medium ${
            user.role === "admin"
              ? "bg-purple-100 text-purple-800"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          {user.role}
        </span>
      </td>
      <td className="p-4 text-[#4a5568]">{user.points}</td>
      <td className="p-4">
        <span
          className={`px-2 py-1 rounded-[4px] text-[14px] font-medium ${
            user.isActive
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {user.isActive ? "Active" : "Inactive"}
        </span>
      </td>
      <td className="p-4">
        <div className="flex gap-2">
          <button
            onClick={() => editUser(user)}
            className="bg-[#edf2f7] text-[#4a5568] px-3 py-1 rounded-[4px] text-[14px]"
          >
            Edit
          </button>
          <button
            onClick={() => toggleUserStatus(user)}
            className={`px-3 py-1 rounded-[4px] text-[14px] ${
              user.isActive
                ? "bg-red-100 text-red-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {user.isActive ? "Deactivate" : "Activate"}
          </button>
          <button
            onClick={() => awardPoints(user, 5)}
            className="bg-[#ebf8ff] text-[#3182ce] px-3 py-1 rounded-[4px] text-[14px]"
          >
            +5 Points
          </button>
        </div>
      </td>
    </tr>
  );
};

export default UserTableRow;
