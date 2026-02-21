const STORAGE_PREFIX = "turnquest";

export const STORAGE_KEYS = {
  users: `${STORAGE_PREFIX}.users`,
  tickets: `${STORAGE_PREFIX}.tickets`,
  messages: `${STORAGE_PREFIX}.messages`,
  session: `${STORAGE_PREFIX}.session`,
  seeded: `${STORAGE_PREFIX}.seeded`,
};

const listeners = new Map();

const clone = (value) =>
  typeof structuredClone === "function"
    ? structuredClone(value)
    : JSON.parse(JSON.stringify(value));

const parse = (raw, fallback) => {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
};

const setListeners = (key) => {
  if (!listeners.has(key)) listeners.set(key, new Set());
  return listeners.get(key);
};

const notify = (key) => {
  const subs = listeners.get(key);
  if (!subs) return;
  for (const cb of subs) cb();
};

if (typeof window !== "undefined") {
  window.addEventListener("storage", (event) => {
    if (!event.key) return;
    notify(event.key);
  });
}

export const nowIso = () => new Date().toISOString();

export const makeId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
};

export const readJson = (key, fallback) => {
  if (typeof localStorage === "undefined") return clone(fallback);
  return parse(localStorage.getItem(key), clone(fallback));
};

export const writeJson = (key, value) => {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
  notify(key);
};

export const updateJson = (key, fallback, updater) => {
  const current = readJson(key, fallback);
  const next = updater(current);
  writeJson(key, next);
  return next;
};

export const subscribeKey = (key, callback) => {
  const subs = setListeners(key);
  subs.add(callback);
  return () => subs.delete(callback);
};

