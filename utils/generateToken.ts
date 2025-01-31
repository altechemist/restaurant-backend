import jwt from 'jsonwebtoken';

interface Payload {
  id: string;
}

const generateToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: '30d' });
};

export default generateToken;
