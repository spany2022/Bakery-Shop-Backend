import jwt, { SignOptions } from 'jsonwebtoken';

export const generateToken = (id: string): string => {
  const secret = process.env.JWT_SECRET || 'secret';
  const options: SignOptions = {
  expiresIn: parseInt(process.env.JWT_EXPIRE || "7") * 24 * 60 * 60 // 7 days in seconds
};
  return jwt.sign({ id }, secret, options);
};

export const verifyToken = (token: string): any => {
  const secret = process.env.JWT_SECRET || 'secret';
  return jwt.verify(token, secret);
};

