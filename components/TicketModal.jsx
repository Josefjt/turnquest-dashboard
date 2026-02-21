import React from "react";
import { displayNameOf } from "../lib/utils"; 

const TicketModal = ({
  newTicket,
  setNewTicket,
  createTicket,
  setShowModal,
  users,
  isAdmin,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTicket({
      ...newTicket,
      [name]: name === "points" ? parseInt(value, 10) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTicket();
  };

  return (
    <div className="fixed inset-0 bg-[#000000] bg-opacity-50 flex items-center justify-center z-20">
      <div className="bg-white rounded-[8px] p-6 w-full max-w-[500px] mx-4">
        <h2 className="text-[20px] font-semibold text-[#2d3748] mb-6">
          Create Ticket
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="title"
                className="block text-[14px] text-[#4a5568] mb-2"
              >
                Title
              </label>
              <input
                id="title"
                name="title"
                value={newTicket.title}
                onChange={handleChange}
                type="text"
                className="w-full border border-[#e1e4e8] rounded-[4px] px-3 py-2"
                required
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-[14px] text-[#4a5568] mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={newTicket.description}
                onChange={handleChange}
                className="w-full border border-[#e1e4e8] rounded-[4px] px-3 py-2 min-h-[100px]"
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="points"
                className="block text-[14px] text-[#4a5568] mb-2"
              >
                Points
              </label>
              <select
                id="points"
                name="points"
                value={newTicket.points}
                onChange={handleChange}
                className="w-full border border-[#e1e4e8] rounded-[4px] px-3 py-2"
              >
                {[1, 2, 3, 5, 8, 13].map((point) => (
                  <option key={point} value={point}>
                    {point}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="assignee"
                className="block text-[14px] text-[#4a5568] mb-2"
              >
                Assignee
              </label>
              <select
                id="assignee"
                name="assignee"
                value={newTicket.assignee}
                onChange={handleChange}
                className="w-full border border-[#e1e4e8] rounded-[4px] px-3 py-2"
                required
              >
                <option value="">Select assignee</option>
                {users.map((u) => (
                  <option key={u.id} value={u.email}>
                    {displayNameOf(u)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="status"
                className="block text-[14px] text-[#4a5568] mb-2"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={newTicket.status}
                onChange={handleChange}
                className="w-full border border-[#e1e4e8] rounded-[4px] px-3 py-2"
              >
                <option value="Open">Open</option>
                <option value="In progress">In progress</option>
                <option value="Review / QA">Review / QA</option>
                {isAdmin && <option value="Done">Done</option>}
              </select>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                type="submit"
                className="bg-[#00a3bf] text-white px-4 py-2 rounded-[4px] font-medium"
              >
                Create Ticket
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="border border-[#e1e4e8] px-4 py-2 rounded-[4px] text-[#4a5568]"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketModal;
