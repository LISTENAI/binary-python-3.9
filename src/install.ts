import download from 'download';
import { rm } from 'fs/promises';
import decompress from '@xingrz/decompress';
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

  const archive = await download(URL);
  await decompress(archive, HOME);

  if (process.platform != 'win32') {
    await symlink('python3', join(binary.binaryDir, 'python'));
  }

})();
