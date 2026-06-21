/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // three / drei ship modern ESM; let Next transpile them cleanly.
  transpilePackages: ["three"],
};

export default nextConfig;
