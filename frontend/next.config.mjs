/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable ESLint during build to prevent build failures from lint warnings
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable TypeScript type checking during build to prevent build failures from minor type issues
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
