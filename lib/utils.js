export const nameFromEmail   = (email = '') => email.split('@')[0];
export const displayNameOf   = u => u?.name || nameFromEmail(u?.email);
export const initialsOf      = u => displayNameOf(u).charAt(0).toUpperCase();
