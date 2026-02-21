import {
  STORAGE_KEYS,
  readJson,
  writeJson,
  updateJson,
  subscribeKey,
  makeId,
  nowIso,
} from "./localDb";

const toList = () =>
  readJson(STORAGE_KEYS.tickets, []).sort((a, b) =>
    String(b.createdAt || "").localeCompare(String(a.createdAt || ""))
  );

const writeList = (tickets) => writeJson(STORAGE_KEYS.tickets, tickets);

export const listenTickets = (cb) => {
  const emit = () => cb(toList());
  emit();
  return subscribeKey(STORAGE_KEYS.tickets, emit);
};

export const createTicket = async (data) => {
  const ticket = {
    id: makeId(),
    title: data.title || "",
    description: data.description || "",
    points: Number(data.points || 0),
    status: data.status || "Open",
    assigneeUid: data.assigneeUid || "",
    assigneeName: data.assigneeName || "",
    pointsAwarded: Boolean(data.pointsAwarded),
    createdAt: nowIso(),
    updatedAt: nowIso(),
  };

  updateJson(STORAGE_KEYS.tickets, [], (tickets) => [ticket, ...tickets]);
  return ticket;
};

export const updateTicket = async (id, partial) => {
  const updatedAt = nowIso();
  let updated = null;

  updateJson(STORAGE_KEYS.tickets, [], (tickets) =>
    tickets.map((ticket) => {
      if (ticket.id !== id) return ticket;
      updated = { ...ticket, ...partial, updatedAt };
      return updated;
    })
  );

  if (!updated) throw new Error("Ticket not found");
  return updated;
};

export const deleteTicket = async (id) => {
  const before = toList();
  const after = before.filter((ticket) => ticket.id !== id);
  if (after.length === before.length) throw new Error("Ticket not found");
  writeList(after);
};

