import { test, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

test('l7ot package.json integrity', () => {
  const pkgPath = path.resolve(process.cwd(), 'package.json');
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    expect(pkg.name || pkg.version).toBeTruthy();
  }
});
