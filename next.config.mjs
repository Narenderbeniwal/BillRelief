/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ["@azure/storage-blob"],
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;
