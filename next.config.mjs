/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
 images: {
        remotePatterns: [
            { hostname: 'img.drz.lazcdn.com' },
            { hostname: 'www.dreamskinnepal.com' },
            { hostname: 'www.arkshgroup.com' },
            { hostname: 'localhost' },
        ],
    }
};

export default nextConfig;
