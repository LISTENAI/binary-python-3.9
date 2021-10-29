import * as download from 'download';
import { rm } from 'fs/promises';
import { platform } from 'os';
import { join } from 'path';

const PREFIX = 'https://cdn.iflyos.cn/public/lisa-binary/python3/';

const SUFFIX = (() => {
  switch (platform()) {
    case 'win32': return 'pc-windows-msvc-shared';
    case 'darwin': return 'apple-darwin';
    default: return 'unknown-linux-gnu';
  }
})();

const NAME = `cpython-3.10.0-x86_64-${SUFFIX}-install_only-20211017T1616.tar.gz`;
const HOME = join(__dirname, '..', 'binary');

(async () => {

  try {
    await rm(HOME, { recursive: true });
  } catch (e) {
  }

  await download(`${PREFIX}${NAME}`, HOME, {
    extract: true,
  });

})();
