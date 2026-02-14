/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
        search: "",
        searchParams: "",
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ["@azure/storage-blob"],
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;
