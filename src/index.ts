import { platform } from 'os';
import { join } from 'path';
import { promisify } from 'util';
import { execFile as _execFile } from 'child_process';
import { Binary } from '@binary/type';

const execFile = promisify(_execFile);

export const HOME = join(__dirname, '..', 'binary', 'python');

export default <Binary>{
  homeDir: HOME,

  binaryDir: platform() == 'win32' ? HOME : join(HOME, 'bin'),

  async version() {
    const { stdout } = await execFile(join(this.binaryDir, 'python'), ['-m', 'pip', '--version']);
    return stdout.trim();
  }
};
