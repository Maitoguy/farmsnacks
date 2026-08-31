/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
    // Placehold.co sometimes routes to SVGs. This prevents Next.js errors for external SVGs.
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
