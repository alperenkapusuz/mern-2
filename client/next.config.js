/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
    ENV_VALUE: process.env.ENV_VALUE,
  },
};

module.exports = nextConfig;
