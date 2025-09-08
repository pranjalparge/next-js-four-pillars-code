// src/utils/security/Password.ts
/* eslint-disable no-bitwise */
import crypto from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(crypto.scrypt);

export class Password {
  /**
   * Hash a password with a generated salt
   */
  static async toHash(password: string): Promise<string> {
    const salt = crypto.randomBytes(12).toString("hex");
    const buffer = (await scryptAsync(password.trim(), salt, 64)) as Buffer;
    return `${buffer.toString("hex")}.${salt}`;
  }

  /**
   * Hash a password using a provided salt (for forgot/reset password flows)
   */
  static async toHashForgotPassword(password: string, salt: string): Promise<string> {
    const buffer = (await scryptAsync(password.trim(), salt, 64)) as Buffer;
    return `${buffer.toString("hex")}.${salt}`;
  }

  /**
   * Compare supplied password with stored hash
   */
  static async passwordMatched(
    storedPassword: string,
    salt: string,
    suppliedPassword: string
  ): Promise<boolean> {
    const buffer = (await scryptAsync(suppliedPassword.trim(), salt, 64)) as Buffer;
    return buffer.toString("hex") === storedPassword.trim();
  }

  /**
   * Simple XOR-based reversible "encryption" (⚠️ Not secure — just obfuscation)
   */
  static async encryptOgPassword(password: string, key: string): Promise<string> {
    const encryptedChars = Array.from(password).map((ch, i) =>
      String.fromCharCode(ch.charCodeAt(0) ^ key.charCodeAt(i % key.length))
    );
    return Buffer.from(encryptedChars.join("")).toString("base64");
  }

  /**
   * Decrypt XOR-obfuscated password
   */
  static async decryptOgPassword(encryptedPassword: string, key: string): Promise<string> {
    const decrypted = Buffer.from(encryptedPassword, "base64").toString();
    const decryptedChars = Array.from(decrypted).map((ch, i) =>
      String.fromCharCode(ch.charCodeAt(0) ^ key.charCodeAt(i % key.length))
    );
    return decryptedChars.join("");
  }
}
