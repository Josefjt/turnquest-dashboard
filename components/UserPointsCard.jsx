import React from "react";
import { initialsOf, displayNameOf } from "../lib/utils"; 

const UserPointsCard = ({ user }) => {
  const getStatusColor = () => {
    return user.isActive ? "bg-green-500" : "bg-gray-400";
  };

  const points = Number(user.points || 0);

  const getProgressColor = () => {
    if (points >= 80) return "bg-green-500";
    if (points >= 60) return "bg-blue-500";
    if (points >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="border border-[#e1e4e8] rounded-[8px] p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-[40px] h-[40px] bg-[#e2e8f0] rounded-full flex items-center justify-center text-[16px] font-medium text-[#4a5568]">
            {initialsOf(user)}
          </div>
          <div>
            <h3 className="font-medium text-[16px] text-[#2d3748]">
              {displayNameOf(user)}
            </h3>
            <div className="flex items-center gap-2">
              <div
                className={`w-[8px] h-[8px] rounded-full ${getStatusColor()}`}
              ></div>
              <span className="text-[14px] text-[#718096]">
                {user.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        </div>
        <div className="text-[24px] font-bold text-[#2d3748]">
          {points}
        </div>
      </div>
      <div className="w-full bg-[#edf2f7] rounded-full h-[8px] overflow-hidden">
        <div
          className={`h-full rounded-full ${getProgressColor()}`}
          style={{ width: `${Math.min(100, points)}%` }}
        ></div>
      </div>
    </div>
  );
};

export default UserPointsCard;
