/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  htmlLimitedBots: /.*/,
  // Allow opening the dev server from another host on the LAN (e.g. phone / another PC)
  allowedDevOrigins: ["192.168.1.236", "192.168.0.1", "10.0.0.1"],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "eclassify.thewrteam.in",
        port: "", // You can leave this empty if there is no specific port
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
