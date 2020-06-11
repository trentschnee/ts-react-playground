import { configureToMatchImageSnapshot } from 'jest-image-snapshot';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { version } from '../package.json';
import 'expect-puppeteer';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const jestPuppeteerConfig = require('../jest-puppeteer.config.js');

export const timeout = 10000;
export const url = `http://127.0.0.1:${jestPuppeteerConfig.server.port}`;

export const customSnapshotsDir = join('e2e', 'screenshots', version);
export const customDiffDir = join(customSnapshotsDir, 'diff');

const customConfig = { threshold: 0 };
const toMatchImageSnapshot = configureToMatchImageSnapshot({
  // blur: 1,
  customDiffConfig: customConfig,
  customSnapshotsDir,
  customDiffDir,
  failureThreshold: 0.2,
  failureThresholdType: 'percent',
});

expect.extend({ toMatchImageSnapshot });

export const mkdir = (path: string): void => {
  if (!existsSync(path)) mkdirSync(path);
};
