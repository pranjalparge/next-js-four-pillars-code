import crypto, { CipherKey } from "crypto";

export function encrypt(text: string, secretKey: string): string {
  const key = crypto.createHash("sha256").update(secretKey).digest() as CipherKey;

  // explicitly cast Buffer → Node accepts it as BinaryLike
  const iv = Buffer.from(secretKey).subarray(0, 16) as unknown as crypto.BinaryLike;

  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

export function decrypt(encryptedText: string, secretKey: string): string {
  const key = crypto.createHash("sha256").update(secretKey).digest() as CipherKey;

  const iv = Buffer.from(secretKey).subarray(0, 16) as unknown as crypto.BinaryLike;

  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

export const secretKey: string = crypto
  .createHash("sha256")
  .update("DFRSEFGTHNJGFTHGFRIOPLMZAQWSCDERFVGGTdiusaidu")
  .digest("hex")
  .slice(0, 32);
