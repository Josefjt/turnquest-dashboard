export default function TicketDetails({ ticket, isAdmin, onClose, onDelete }) {
  if (!ticket) return null;

  const createdDate = ticket.createdAt ? new Date(ticket.createdAt) : null;
  const createdLabel =
    createdDate && !Number.isNaN(createdDate.valueOf())
      ? createdDate.toLocaleString()
      : "N/A";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-30">
      <div className="bg-white rounded-lg w-full max-w-md p-6 space-y-5">
        <h2 className="text-xl font-semibold">{ticket.title}</h2>

        {ticket.description && <p className="text-sm text-slate-700">{ticket.description}</p>}

        <ul className="text-sm text-slate-600 space-y-1">
          <li>
            <span className="font-medium">Status:</span> {ticket.status}
          </li>
          <li>
            <span className="font-medium">Points:</span> {ticket.points}
          </li>
          <li>
            <span className="font-medium">Assignee:</span> {ticket.assigneeName}
          </li>
          <li>
            <span className="font-medium">Created:</span> {createdLabel}
          </li>
        </ul>

        <div className="flex gap-3 justify-end">
          {isAdmin && (
            <button
              onClick={() => {
                if (confirm("Delete this ticket?")) onDelete(ticket.id);
              }}
              className="bg-red-100 text-red-600 px-4 py-2 rounded-md text-sm"
            >
              Delete
            </button>
          )}
          <button onClick={onClose} className="px-4 py-2 border rounded-md text-sm">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
