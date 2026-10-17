// Shared Chromium launcher. Playwright is not a dependency of this repo:
// point PW_DIR at any directory whose node_modules contains `playwright`,
// and CHROMIUM at a browser binary if Playwright's bundled one is not installed.
import { createRequire } from 'node:module';

const require = createRequire(`${process.env.PW_DIR ?? process.cwd()}/`);
const { chromium } = require('playwright');

export const launch = () =>
  chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});
