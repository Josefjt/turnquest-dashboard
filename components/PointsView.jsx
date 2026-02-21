import React from "react";
import UserPointsCard from "./UserPointsCard";

const PointsView = ({ users }) => {
  return (
    <section className="max-w-[1400px] mx-auto p-6">
      <div className="bg-white rounded-[8px] shadow-sm p-6">
        <h2 className="text-[20px] font-semibold text-[#2d3748] mb-6">
          Team Points
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {users
            .slice() 
            .sort((a, b) => b.points - a.points)
            .map((user) => (
              <UserPointsCard key={user.id} user={user} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default PointsView;
