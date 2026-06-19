import dotenv from "dotenv";

dotenv.config();

function required(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(
      `Missing environment variable: ${name}`
    );
  }

  return value;
}

export const env = {
  PORT: Number(process.env.PORT) || 5000,

  NODE_ENV:
    process.env.NODE_ENV ||
    "development",

  MONGODB_URI: required(
    "MONGODB_URI"
  ),

  LOG_LEVEL:
    process.env.LOG_LEVEL ||
    "info",
};