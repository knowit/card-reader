
const config = {
    websocketDomain: 'ws://localhost',
    websocketPort: 33333,
}


export function getUniversalConfig() {
  if (typeof window === 'undefined') {
    return config;
  }

  return process.env.BUILD_TARGET === 'server' ||
    process.env.NODE_ENV === 'unittest'
    ? config
    : window.config;
}

export default getUniversalConfig();