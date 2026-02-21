import {
  STORAGE_KEYS,
  readJson,
  writeJson,
  subscribeKey,
  makeId,
  nowIso,
} from "./localDb";
import { nameFromEmail } from "./utils";

const DEFAULT_ADMIN = {
  id: "seed-admin",
  email: "admin@turnquest.local",
  password: "admin123",
  role: "admin",
  name: "Admin",
  points: 0,
  isActive: true,
  createdAt: nowIso(),
};

const normalizeUser = (user) => ({
  points: 0,
  role: "user",
  isActive: true,
  name: nameFromEmail(user?.email || ""),
  ...user,
});

export const getUsers = () =>
  readJson(STORAGE_KEYS.users, []).map((user) => normalizeUser(user));

export const writeUsers = (users) => {
  writeJson(
    STORAGE_KEYS.users,
    users.map((user) => normalizeUser(user))
  );
};

export const ensureSeedData = () => {
  const seeded = readJson(STORAGE_KEYS.seeded, false);
  const users = getUsers();
  const hasAdmin = users.some((u) => u.role === "admin");

  if (!seeded || !hasAdmin || users.length === 0) {
    const withAdmin = hasAdmin ? users : [DEFAULT_ADMIN, ...users];
    writeUsers(withAdmin);
    writeJson(STORAGE_KEYS.seeded, true);
    return withAdmin;
  }

  return users;
};

export const listenUsers = (callback) => {
  const emit = () => callback(getUsers());
  emit();
  return subscribeKey(STORAGE_KEYS.users, emit);
};

export const createUser = ({ email, password, role = "user" }) => {
  const nextEmail = String(email || "").trim().toLowerCase();
  if (!nextEmail || !password) throw new Error("Email and password are required");

  const users = getUsers();
  if (users.some((u) => u.email.toLowerCase() === nextEmail)) {
    throw new Error("An account with this email already exists");
  }

  const user = normalizeUser({
    id: makeId(),
    email: nextEmail,
    password,
    role,
    name: nameFromEmail(nextEmail),
    points: 0,
    isActive: true,
    createdAt: nowIso(),
  });

  writeUsers([...users, user]);
  return user;
};

export const updateUser = (id, partial) => {
  const users = getUsers();
  const idx = users.findIndex((u) => u.id === id);
  if (idx < 0) throw new Error("User not found");

  const incoming = { ...partial };
  delete incoming.password;
  if (incoming.email) {
    const normalizedEmail = String(incoming.email).trim().toLowerCase();
    const duplicate = users.some((u) => u.id !== id && u.email.toLowerCase() === normalizedEmail);
    if (duplicate) throw new Error("Email is already in use");
    incoming.email = normalizedEmail;
  }

  users[idx] = normalizeUser({ ...users[idx], ...incoming });
  writeUsers(users);
  return users[idx];
};

export const setUserActive = (id, isActive) => updateUser(id, { isActive });

export const adjustUserPoints = (id, delta) => {
  const users = getUsers();
  const idx = users.findIndex((u) => u.id === id);
  if (idx < 0) throw new Error("User not found");

  const nextPoints = Math.max(0, Number(users[idx].points || 0) + Number(delta || 0));
  users[idx] = normalizeUser({ ...users[idx], points: nextPoints });
  writeUsers(users);
  return users[idx];
};

export const getUserById = (id) => getUsers().find((u) => u.id === id) || null;

export const findUserByEmail = (email) => {
  const target = String(email || "").trim().toLowerCase();
  return getUsers().find((u) => u.email.toLowerCase() === target) || null;
};

export const loginUser = (email, password) => {
  const user = findUserByEmail(email);
  if (!user || user.password !== password) {
    throw new Error("Invalid email or password");
  }
  if (user.isActive === false) {
    throw new Error("This account is inactive");
  }

  writeJson(STORAGE_KEYS.session, { uid: user.id });
  return user;
};

export const logoutUser = () => writeJson(STORAGE_KEYS.session, null);

export const getSession = () => readJson(STORAGE_KEYS.session, null);
