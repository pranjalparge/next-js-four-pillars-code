import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export const isAuth = (req: any, res: NextApiResponse, next: Function) => {
  const token = req.headers["auth-token"];
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const decoded = jwt.verify(token as string, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch {
    return res.status(400).json({ error: "Invalid token" });
  }
};

export const IsAdmin = (req: any, res: NextApiResponse, next: Function) => {
  if (req.user?.role === "4pii_admin" && req.user?.is_enable === 1) {
    return next();
  }
  return res.status(403).json({ error: "Unauthorized" });
};
