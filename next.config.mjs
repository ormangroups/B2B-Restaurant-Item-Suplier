/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
  };
  
  export default nextConfig;
  
  // Sitemap and robots.txt configuration for next-sitemap
  export const siteConfig = {
    siteUrl: 'https://www.ormanindia.com', // Replace with your actual domain
    generateRobotsTxt: true, // Automatically generate robots.txt
    exclude: ['/api/*', '/admin/*', '/login', '/register', '/cart'], // Exclude specific routes
    robotsTxtOptions: {
      policies: [
        { userAgent: '*', allow: '/', disallow: ['/api/', '/admin/', '/login/', '/register/', '/cart/'] },
      ],
    },
  };
  