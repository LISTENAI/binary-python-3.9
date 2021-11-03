import download from '@xingrz/download2';
import { rm } from 'fs/promises';
import { join } from 'path';
import { symlink } from 'fs/promises';
import binary, { HOME } from './index';

const PACKAGE = 'python3';
const VERSION = '3.10.0';

const NAME = `${PACKAGE}-${VERSION}-${process.platform}_${process.arch}.tar.zst`;

const URL = `https://cdn.iflyos.cn/public/lisa-binary/${PACKAGE}/${NAME}`;

(async () => {

  try {
    await rm(HOME, { recursive: true });
  } catch (e) {
  }

  await download(URL, HOME, {
    extract: true,
  });

  if (process.platform != 'win32') {
    await symlink('python3', join(binary.binaryDir, 'python'));
  }

})();
