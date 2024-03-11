/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
const { env } = await import("./src/env.js");
import dotenvExpand from "dotenv-expand"

dotenvExpand.expand({ parsed: { ...env } });

/** @type {import("next").NextConfig} */
const config = {};

export default config;
