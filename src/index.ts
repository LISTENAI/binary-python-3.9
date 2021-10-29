import { platform } from 'os';
import { join } from 'path';
import { promisify } from 'util';
import { execFile as _execFile } from 'child_process';
import { Binary } from '@binary/type';

const HOME = join(__dirname, '..', 'binary', 'python');
const execFile = promisify(_execFile);

export default <Binary>{
  homeDir: HOME,

  binaryDir: platform() == 'win32' ? HOME : join(HOME, 'bin'),

  env: {},

  async version() {
    const { stdout } = await execFile(join(this.binaryDir, 'python'), ['--version']);
    return stdout.split('\n')[0].trim();
  }
};
