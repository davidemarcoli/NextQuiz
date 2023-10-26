const { version } = require("./package.json");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com",
      "vercel.com",
    ],
  },
  publicRuntimeConfig: {
    version,
  },
  async redirects() {
    return [
      {
        source: "/github",
        destination: "https://github.com/davidemarcoli/next-quiz",
        permanent: false,
      },
    ];
  },
};

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  register: true,
  skipWaiting: true,
});

module.exports = withPWA(nextConfig);
