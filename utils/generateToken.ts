import jwt from 'jsonwebtoken';

interface Payload {
  id: string;
}

const generateToken = (id: string): string => {
  // Ensure JWT_SECRET is present in the environment variables
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is missing');
  }

  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

export default generateToken;
