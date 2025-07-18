/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  serverExternalPackages: ["@node-rs/argon2"],
  output: "standalone",
  images: {
    domains: ["images.unsplash.com"], // Tambahkan domain di sini
  },
};

export default config;
