import React from "react";
import { Eye } from "lucide-react"; 

const TicketCard = ({ ticket, handleDragStart, onView }) => {
  return (
    <article
      className="relative bg-white border border-[#e1e4e8] rounded-[8px] p-4 cursor-move shadow-sm hover:shadow-md transition-shadow"
      draggable
      onDragStart={() => handleDragStart(ticket)}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onView(ticket);
        }}
        className="absolute top-2 right-2 text-slate-400 hover:text-slate-600"
      >
        <Eye size={16} />
      </button>

      <h3 className="font-medium text-[16px] text-[#2d3748] mb-2">
        {ticket.title}
      </h3>

      {ticket.description && (
        <p className="text-[14px] text-[#718096] mb-4">{ticket.description}</p>
      )}

      <div className="flex items-center justify-between">
        <span className="text-sm text-[#4a5568]">{ticket.assigneeName}</span>
        <span className="bg-[#ebf8ff] text-[#3182ce] px-2 py-1 rounded-[4px] text-[12px] font-medium">
          {ticket.points} {ticket.points === 1 ? "point" : "points"}
        </span>
      </div>
    </article>
  );
};

export default TicketCard;
