// const crypto = require("crypto");
// const { promisify } = require("util");

// const scryptAsync = promisify(crypto.scrypt);

// class Password {
//   static async toHash(password) {
//     const salt = crypto.randomBytes(12).toString("hex");
//     const buffer = await scryptAsync(password.trim(), salt.trim(), 64);
//     return `${buffer.toString("hex")}.${salt.trim()}`;
//   }
//   static async toHashForgotPassword(password1, salt1) {
//     const buffer1 = await scryptAsync(password1.trim(), salt1.trim(), 64);
//     return `${buffer1.toString("hex")}.${salt1.trim()}`;
//   }

//   static async passwordMatched(storedPassword, salt, suppliedPassword) {
//     const buffer = await scryptAsync(suppliedPassword.trim(), salt.trim(), 64);
//     return buffer.toString("hex") === storedPassword.trim();
//   }

//   static async encryptOgPassword(password, key) {
//     let encrypted = "";
//     for (let i = 0; i < password.length; i++) {
//       encrypted += String.fromCharCode(
//         password.charCodeAt(i) ^ key.charCodeAt(i % key.length)
//       );
//     }
//     return Buffer.from(encrypted).toString("base64");
//   }

//   static async decryptOgPassword(encryptedPassword, key) {
//     const decrypted = Buffer.from(encryptedPassword, "base64").toString();
//     let decryptedPassword = "";
//     for (let i = 0; i < decrypted.length; i++) {
//       decryptedPassword += String.fromCharCode(
//         decrypted.charCodeAt(i) ^ key.charCodeAt(i % key.length)
//       );
//     }
//     return decryptedPassword;
//   }
// }

// module.exports = Password;

// src/utils/security/Password.ts
import crypto from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(crypto.scrypt);

export class Password {
  // Hash a password with a generated salt
  static async toHash(password: string): Promise<string> {
    const salt = crypto.randomBytes(12).toString("hex");
    const buffer = (await scryptAsync(password.trim(), salt.trim(), 64)) as Buffer;
    return `${buffer.toString("hex")}.${salt.trim()}`;
  }

  // Hash a password using a provided salt (for forgot/reset password flows)
  static async toHashForgotPassword(password: string, salt: string): Promise<string> {
    const buffer = (await scryptAsync(password.trim(), salt.trim(), 64)) as Buffer;
    return `${buffer.toString("hex")}.${salt.trim()}`;
  }

  // Compare supplied password with stored hash
  static async passwordMatched(
    storedPassword: string,
    salt: string,
    suppliedPassword: string
  ): Promise<boolean> {
    const buffer = (await scryptAsync(suppliedPassword.trim(), salt.trim(), 64)) as Buffer;
    return buffer.toString("hex") === storedPassword.trim();
  }

  // Simple XOR-based reversible "encryption" (not secure, just obfuscation)
  static async encryptOgPassword(password: string, key: string): Promise<string> {
    let encrypted = "";
    for (let i = 0; i < password.length; i++) {
      encrypted += String.fromCharCode(
        password.charCodeAt(i) ^ key.charCodeAt(i % key.length)
      );
    }
    return Buffer.from(encrypted).toString("base64");
  }

  // Decrypt XOR-obfuscated password
  static async decryptOgPassword(encryptedPassword: string, key: string): Promise<string> {
    const decrypted = Buffer.from(encryptedPassword, "base64").toString();
    let decryptedPassword = "";
    for (let i = 0; i < decrypted.length; i++) {
      decryptedPassword += String.fromCharCode(
        decrypted.charCodeAt(i) ^ key.charCodeAt(i % key.length)
      );
    }
    return decryptedPassword;
  }
}

