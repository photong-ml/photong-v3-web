/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        // runtime: 'experimental-edge',
        optimizeCss: true,
    },
    i18n: {
        locales: ['en'],
        defaultLocale: 'en',
    },
};

module.exports = nextConfig;
