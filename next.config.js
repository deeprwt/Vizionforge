/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "*.supabase.co" }],
  },
  experimental: {
    // Blog posts are sent to Server Actions as HTML; images are uploaded
    // directly to Supabase Storage, so this only needs to fit long articles.
    serverActions: { bodySizeLimit: "4mb" },
  },
};

module.exports = nextConfig;
