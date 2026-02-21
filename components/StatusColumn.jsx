import React from "react";
import TicketCard from "./TicketCard";

const StatusColumn = ({
  status,
  tickets,
  handleDragStart,
  handleDrop,
  handleView 
}) => {
  const getStatusColor = () => {
    switch (status) {
      case "Open":
        return "bg-blue-100 text-blue-800";
      case "In progress":
        return "bg-yellow-100 text-yellow-800";
      case "Review / QA":
        return "bg-purple-100 text-purple-800";
      case "Done":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleOnDrop = (e) => {
    e.preventDefault();
    handleDrop(status);
  };

  return (
    <div
      className="flex-1 bg-white rounded-[8px] shadow-sm overflow-hidden"
      onDragOver={handleDragOver}
      onDrop={handleOnDrop}
    >
      <div className="p-4 border-b border-[#e1e4e8]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-1 rounded-[4px] text-[14px] font-medium ${getStatusColor()}`}
            >
              {status}
            </span>
            <span className="text-[14px] text-[#718096]">
              {tickets.length} {tickets.length === 1 ? "ticket" : "tickets"}
            </span>
          </div>
        </div>
      </div>
      <div className="p-4 h-[calc(100vh-200px)] overflow-y-auto">
        <div className="flex flex-col gap-4">
          {tickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              handleDragStart={handleDragStart}
              onView={handleView} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatusColumn;
