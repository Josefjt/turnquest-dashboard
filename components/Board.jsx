import React from "react";
import StatusColumn from "./StatusColumn";

const Board = ({
  handleDragStart,
  handleDrop,
  getStatusTickets,
  openTicket 
}) => {
  const statuses = ["Open", "In progress", "Review / QA", "Done"];

  return (
    <section className="max-w-[1400px] mx-auto p-6">
      <div className="flex gap-6 max-lg:flex-col">
        {statuses.map((status) => (
          <StatusColumn
            key={status}
            status={status}
            tickets={getStatusTickets(status)}
            handleDragStart={handleDragStart}
            handleDrop={handleDrop}
            handleView={openTicket}
          />
        ))}
      </div>
    </section>
  );
};

export default Board;
