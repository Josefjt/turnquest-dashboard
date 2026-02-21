import {
  STORAGE_KEYS,
  readJson,
  updateJson,
  subscribeKey,
  makeId,
  nowIso,
} from "./localDb";

const MAX_MESSAGES = 50;

const getMessages = () =>
  readJson(STORAGE_KEYS.messages, []).sort((a, b) =>
    String(a.createdAt || "").localeCompare(String(b.createdAt || ""))
  );

export const listenMessages = (cb) => {
  const emit = () => cb(getMessages().slice(-MAX_MESSAGES));
  emit();
  return subscribeKey(STORAGE_KEYS.messages, emit);
};

export const sendMessage = async (text, { uid, name }) => {
  const msg = {
    id: makeId(),
    text,
    uid,
    name,
    createdAt: nowIso(),
  };

  updateJson(STORAGE_KEYS.messages, [], (messages) => {
    const next = [...messages, msg].sort((a, b) =>
      String(a.createdAt || "").localeCompare(String(b.createdAt || ""))
    );
    return next.slice(-MAX_MESSAGES);
  });
};

