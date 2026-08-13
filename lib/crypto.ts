import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

/**
 * Hash a plaintext password using Node's native scrypt memory-hard hashing function.
 * Returns salt:hash format.
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${salt}:${derivedKey.toString("hex")}`;
}

/**
 * Verifies a password against a hash in salt:hash format using timingSafeEqual to avoid timing attacks.
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  try {
    const [salt, key] = hash.split(":");
    if (!salt || !key) return false;
    
    const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;
    const keyBuffer = Buffer.from(key, "hex");
    
    // Avoid timing attacks by using constant-time comparison
    return timingSafeEqual(derivedKey, keyBuffer);
  } catch (error) {
    console.error("Password verification error:", error);
    return false;
  }
}

// Helper utilities for hex conversion compatible with Edge runtime (no Node Buffer required)
function toHex(arrayBuffer: ArrayBuffer): string {
  return Array.prototype.map.call(
    new Uint8Array(arrayBuffer),
    (x: number) => ("00" + x.toString(16)).slice(-2)
  ).join("");
}

function fromHex(hex: string): Uint8Array {
  const pairs = hex.match(/.{1,2}/g) || [];
  const array = new Uint8Array(pairs.length);
  for (let i = 0; i < pairs.length; i++) {
    array[i] = parseInt(pairs[i], 16);
  }
  return array;
}

/**
 * Encrypt a JSON-serializable session payload using Web Crypto AES-256-GCM.
 * Works in both standard Node.js and Next.js Edge Middleware.
 */
export async function encryptSession(payload: any, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const rawKey = await crypto.subtle.digest("SHA-256", encoder.encode(secret));
  
  const key = await crypto.subtle.importKey(
    "raw",
    rawKey,
    { name: "AES-GCM" },
    false,
    ["encrypt"]
  );
  
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encoder.encode(JSON.stringify(payload))
  );
  
  return `${toHex(iv.buffer)}:${toHex(ciphertext)}`;
}

/**
 * Decrypts an AES-256-GCM session token using Web Crypto.
 * Returns decrypted JSON payload, or null if decryption fails/tampered.
 */
export async function decryptSession(token: string, secret: string): Promise<any> {
  try {
    const [ivHex, ciphertextHex] = token.split(":");
    if (!ivHex || !ciphertextHex) return null;
    
    const encoder = new TextEncoder();
    const rawKey = await crypto.subtle.digest("SHA-256", encoder.encode(secret));
    
    const key = await crypto.subtle.importKey(
      "raw",
      rawKey,
      { name: "AES-GCM" },
      false,
      ["decrypt"]
    );
    
    const iv = fromHex(ivHex);
    const ciphertext = fromHex(ciphertextHex);
    
    const decrypted = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: iv as any },
      key,
      ciphertext as any
    );
    
    return JSON.parse(new TextDecoder().decode(decrypted));
  } catch (error) {
    return null;
  }
}
