/* eslint-disable @typescript-eslint/no-var-requires */
const portfinder = require('portfinder-sync');
const packageJson = require('./package.json');

const port = portfinder.getPort(packageJson.baseport);
const command = `cross-env NODE_PORT=${port} NODE_ENV=production npm run ${process.env.NODE_E2E === 'esm' ? 'serve' : 'e2e:serve'}`;

module.exports = {
  browser: 'chromium',
  browserContext: 'default',
  launch: {
    dumpio: true,
    headless: process.env.HEADLESS !== 'false',
    args: ['--enable-experimental-web-platform-features']
  },
  server: {
    command,
    port,
    launchTimeout: 10000,
    debug: true,
  },
};
