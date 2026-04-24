import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export interface JwtPayload {
  userID: number;
  iat: number;
  exp: number;
}

export class JwtError extends Error {
  constructor(message?: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "JwtError";
    Object.setPrototypeOf(this, JwtError.prototype);
  }
}

export function createAccessToken(userID: number) {
  return jwt.sign({ userID }, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: "10m",
  });
}

export function createRefreshToken(userID: number) {
  return jwt.sign({ userID }, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: "7d",
  });
}

export function verifyToken(
  token: string,
  type: "ACCESS" | "REFRESH"
): JwtPayload {
  const secret =
    type === "ACCESS"
      ? process.env.JWT_ACCESS_SECRET!
      : process.env.JWT_REFRESH_SECRET!;

  try {
    const decoded = jwt.verify(token, secret);

    if (
      typeof decoded === "object" &&
      decoded !== null &&
      typeof (decoded as JwtPayload).userID === "number" &&
      typeof (decoded as JwtPayload).iat === "number" &&
      typeof (decoded as JwtPayload).exp === "number"
    ) {
      return decoded as JwtPayload;
    }

    throw new JwtError("Malformed token payload");
  } catch (err) {
    if (err instanceof Error && err.name === "TokenExpiredError") {
      throw new JwtError("TokenExpired");
    }
    if (err instanceof Error && err.name === "JsonWebTokenError") {
      throw new JwtError("InvalidToken");
    }
    throw new JwtError("TokenVerificationFailed");
  }
}

export function getAccessToken(req: NextRequest) {
  const header = req.headers.get("authorization");
  if (!header) {
    throw new JwtError("Authorization header not found");
  }
  if (!header.startsWith("Bearer ")) {
    throw new JwtError("Authorization header must start with 'Bearer '");
  }
  const token = header.substring(7).trim();
  if (!token) {
    throw new JwtError("Bearer token is empty");
  }
  return verifyToken(token, "ACCESS");
}
