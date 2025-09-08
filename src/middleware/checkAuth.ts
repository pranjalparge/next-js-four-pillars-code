import { NextApiResponse } from "next";
import jwt from "jsonwebtoken";
// import { getMod } from "@/lib/db"; // pratim adnust path :TODO

import {getMod} from "src/lib/db";

export const verify = (req: any, res: NextApiResponse, next: Function) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch {
    return res.status(400).json({ error: "Invalid token" });
  }
};

export const dbMode = async (req: any, res: NextApiResponse, next: Function) => {
  try {
    const mode = await getMod();
    if (mode == 1) return res.status(403).json({ error: "Database readonly" });
    next();
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
