/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites: async () => {
      return [
        {
          source: '/api/:path*',
        //   destination:
        //     process.env.NODE_ENV === 'development'
        //       ? 'http://0.0.0.0:5328/api/:path*'
        //       : '/api/',
        },
      ]
    },
  }
  
  module.exports = nextConfig