import { NextApiRequest, NextApiResponse } from "next";

export default function asyncHandler(
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<any>
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handler(req, res);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };
}
