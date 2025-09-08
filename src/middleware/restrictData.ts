import { NextRequest, NextResponse } from "next/server";

type RateRecord = {
  count: number;
  lastRequest: number;
};

const requests = new Map<string, RateRecord>();

/**
 * OTP rate limiter middleware for Next.js
 * Limits requests to 2 per 5 minutes per IP.
 */
export function withOtpLimiter(
  handler: (req: NextRequest) => Promise<NextResponse>
) {
  const WINDOW_MS = 5 * 60 * 1000; // 5 minutes
  const MAX = 2; // Max 2 OTP requests per window
  const MESSAGE = "Too many OTP attempts, try again later.";

  return async (req: NextRequest): Promise<NextResponse> => {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const now = Date.now();
    const record = requests.get(ip) || { count: 0, lastRequest: now };

    if (now - record.lastRequest > WINDOW_MS) {
      record.count = 1;
      record.lastRequest = now;
    } else {
      record.count++;
    }

    requests.set(ip, record);

    if (record.count > MAX) {
      return NextResponse.json({ error: MESSAGE }, { status: 429 });
    }

    return handler(req);
  };
}
