/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'www.nongsaro.go.kr',
        port: '',
        pathname: '/**/**/*',
      },
    ],
  },
  rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://133.186.217.69:30000/api/:path*',
      },
    ];
  },
  redirects() {
    return [
      {
        source: '/',
        destination: '/main',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
