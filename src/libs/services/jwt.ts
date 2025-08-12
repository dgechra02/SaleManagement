import jwt from "jsonwebtoken";

type Payload = {
  id: string;
};

export function generateToken(data: Payload) {
  const token = jwt.sign(data, process.env.JWT_SECRET as string);
  return token;
}

export function verifyToken(token: string) {
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET as string);
    console.log("data in verify ",data)
    return data as Payload;
  } catch {
    return null;
  }
}

// process.env.JWT_SECRET > type of process, env we don't know but overall as combination we know that this will be a string that why's we wrote 'as string'
