let userConfig;
try {
  userConfig = (await import('./v0-user-next.config')).default;
} catch (e) {
  userConfig = undefined; // Ignore error
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
};

mergeConfig(nextConfig, userConfig);

function mergeConfig(baseConfig, customConfig) {
  if (!customConfig) {
    return;
  }

  for (const key in customConfig) {
    if (
      typeof baseConfig[key] === 'object' &&
      !Array.isArray(baseConfig[key]) &&
      baseConfig[key] !== null
    ) {
      baseConfig[key] = {
        ...baseConfig[key],
        ...customConfig[key],
      };
    } else {
      baseConfig[key] = customConfig[key];
    }
  }
}

export default nextConfig;
