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
};

export default nextConfig;
