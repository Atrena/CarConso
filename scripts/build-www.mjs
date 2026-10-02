// Copies the website files to www/, the folder bundled in the Android app
// (Capacitor). The GitHub Pages site itself is served straight from the repo root.
import { cpSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const root = join(import.meta.dirname, '..');
const out = join(root, 'www');
const files = readdirSync(root).filter(f => /\.(html|css|js|webmanifest)$/.test(f) && f !== 'sw.js');

rmSync(out, { recursive: true, force: true });
mkdirSync(out);
for (const f of files) cpSync(join(root, f), join(out, f));
for (const dir of ['icons', 'vendor']) cpSync(join(root, dir), join(out, dir), { recursive: true });
console.log(`www/: ${files.length} files + icons/ + vendor/`);
