/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "188.127.227.168",
        port: "5010",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "files.dilpur.tj",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
