import crypto from "crypto";

// length: 32
const secretKey = process.env.BASE64_ENCRYPTION_SECRET_KEY ?? "BASE64_ENCRYPTION_SECRET_KEY";
// length: 16
const encryptionIv = process.env.BASE64_ENCRYPTION_IV ?? "abcdef1234567890";
const iv = Buffer.from(encryptionIv, "utf8");

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
