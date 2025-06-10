import crypto from "crypto";

// const secretKey = crypto.randomBytes(32);
// const iv = crypto.randomBytes(16);
// TODO: Replace hardcoded secretKey and IV with secure values loaded from environment variables.

const secretKey = Buffer.from([
  17, 86, 34, 218, 171, 61, 59, 113, 252, 108, 200, 161, 214, 240, 217, 230, 137, 79, 144, 43, 47, 90, 128, 16, 90, 128,
  27, 182, 24, 234, 17, 24,
]);
const iv = Buffer.from([223, 119, 160, 210, 230, 34, 208, 117, 39, 71, 79, 250, 73, 107, 97, 240]);

export const encrypt = (text: string): string => {
  const cipher = crypto.createCipheriv("aes-256-cbc", secretKey, iv);
  let encrypted = cipher.update(text, "utf8", "base64");
  encrypted += cipher.final("base64");
  return encrypted;
};

export const decrypt = (encryptedText: string): string => {
  const decipher = crypto.createDecipheriv("aes-256-cbc", secretKey, iv);
  let decrypted = decipher.update(encryptedText, "base64", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

// Usage:
// const message = 'Hello, secret world';
// const encryptedText = encrypt(message);
// const decryptedText = decrypt(encryptedText);
