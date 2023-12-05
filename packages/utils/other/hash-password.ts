import * as bcrypt from 'bcrypt';

export const encodePassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};
export const comparePasswords = (passwordHash: string, password: string): Promise<boolean> => {
  return bcrypt.compare(password, passwordHash);
};
