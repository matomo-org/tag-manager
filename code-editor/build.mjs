/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

import { build } from 'esbuild';
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const editorDir = dirname(fileURLToPath(import.meta.url));
const outFile = join(dirname(editorDir), 'vue/lib/code-editor/code-editor.min.js');

const result = await build({
  entryPoints: [join(editorDir, 'index.js')],
  outfile: outFile,
  bundle: true,
  minify: true,
  format: 'iife',
  target: 'es2020',
  legalComments: 'none',
  metafile: true,
  logLevel: 'info',
});

const packageNames = new Set();
Object.keys(result.metafile.inputs).forEach((input) => {
  const match = input.match(/node_modules\/((?:@[^/]+\/)?[^/]+)\//);
  if (match) {
    packageNames.add(match[1]);
  }
});

const licenseSections = [...packageNames].sort().map((packageName) => {
  const packageDir = join(editorDir, 'node_modules', packageName);
  const { version, license } = JSON.parse(readFileSync(join(packageDir, 'package.json'), 'utf8'));
  const licenseFile = readdirSync(packageDir).find((file) => /^licen[cs]e/i.test(file));
  const licenseText = licenseFile && existsSync(join(packageDir, licenseFile))
    ? readFileSync(join(packageDir, licenseFile), 'utf8').trim()
    : `License: ${license}`;
  return `${packageName}@${version} (${license})\n\n${licenseText}`;
});

writeFileSync(
  `${outFile}.LICENSE.txt`,
  `This file bundles the following packages:\n\n${licenseSections.join('\n\n----------------------------------------\n\n')}\n`,
);
