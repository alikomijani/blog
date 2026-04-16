import jwt from "jsonwebtoken";

export interface JwtPayload {
  userId: number;
  iat: number;
  exp: number;
}

export function createToken(userId: number) {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    return decoded;
  } catch (err) {
    return null;
  }
}
