"use server";
// passwordHandler.ts
import argon2 from "@node-rs/argon2";

/**
 * Hashes a plain text password using Argon2.
 * @param password - The plain text password to hash.
 * @returns The hashed password.
 */
export const hashPassword = async (password: string): Promise<string> => {
  try {
    const hashedPassword = await argon2.hash(password);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error hashing password");
  }
};

/**
 * Verifies a plain text password against a hashed password.
 * @param password - The plain text password to verify.
 * @param hash - The hashed password.
 * @returns True if the password matches, false otherwise.
 */
export const verifyPassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  try {
    const isMatch = await argon2.verify(hash, password);
    return isMatch;
  } catch (error) {
    throw new Error("Error verifying password");
  }
};
