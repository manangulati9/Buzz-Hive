/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
const dotenvExpand = require("dotenv-expand");
const { env } = await import("./src/env.js");

dotenvExpand.expand({ parsed: { ...env } });

/** @type {import("next").NextConfig} */
const config = {};

export default config;
