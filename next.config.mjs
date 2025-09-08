// /**
//  * @type {import('next').NextConfig}
//  */

// const isStaticExport = 'false';

// const nextConfig = {
//   trailingSlash: true,
//   env: {
//     BUILD_STATIC_EXPORT: isStaticExport,
//   },
//   modularizeImports: {
//     '@mui/icons-material': {
//       transform: '@mui/icons-material/{{member}}',
//     },
//     '@mui/material': {
//       transform: '@mui/material/{{member}}',
//     },
//     '@mui/lab': {
//       transform: '@mui/lab/{{member}}',
//     },
//   },
//   webpack(config) {
//     config.module.rules.push({
//       test: /\.svg$/,
//       use: ['@svgr/webpack'],
//     });

//     return config;
//   },
//   ...(isStaticExport === 'true' && {
//     output: 'export',
//   }),
// };

// export default nextConfig;






/**
 * @type {import('next').NextConfig}
 */

const isStaticExport = 'false';

const nextConfig = {
  trailingSlash: true,
  env: {
    BUILD_STATIC_EXPORT: isStaticExport,
  },
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
    '@mui/material': {
      transform: '@mui/material/{{member}}',
    },
    '@mui/lab': {
      transform: '@mui/lab/{{member}}',
    },
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },

  // ✅ Add this block
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "4pillarsinfotechindia.com",
        pathname: "/api/uploads/**",
      },
    ],
  },

  ...(isStaticExport === 'true' && {
    output: 'export',
  }),
};

export default nextConfig;
