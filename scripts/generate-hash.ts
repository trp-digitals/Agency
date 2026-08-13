import { hashPassword } from "../lib/crypto";

async function main() {
  const args = process.argv.slice(2);
  const password = args[0];

  if (!password) {
    console.error("Error: Please provide a plaintext password as an argument.");
    console.error("Usage: npx tsx scripts/generate-hash.ts \"your-password\"");
    process.exit(1);
  }

  try {
    const hash = await hashPassword(password);
    console.log("\n==================================================");
    console.log("SUCCESS: Cryptographically secure password hash generated!");
    console.log("==================================================");
    console.log(`Plaintext password:  ${password}`);
    console.log(`Generated hash:      ${hash}`);
    console.log("==================================================");
    console.log("\nCopy and paste the 'Generated hash' value into your .env file under ADMIN_PASSWORD_HASH:\n");
    console.log(`ADMIN_PASSWORD_HASH=${hash}\n`);
  } catch (error) {
    console.error("Failed to generate password hash:", error);
    process.exit(1);
  }
}

main();
