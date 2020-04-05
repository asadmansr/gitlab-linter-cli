import minimist from 'minimist';
import { config } from './config';
import { file } from './file';
import { help } from './help';
import { version } from './version';

export async function cli(argsArray) {
    const args = minimist(argsArray.slice(2));
    let cmd = args._[0] || 'help';

    if (args.version || args.v) {
        cmd = 'version';
    }

    if (args.help || args.h) {
        cmd = 'help';
    }

    switch (cmd) {
        case 'config':
            config(args);
            break;

        case 'file':
            file(args);
            break;

        case 'help':
            help(args);
            break;

        case 'version':
            version(args);
            break;

        default:
            console.error(`"${cmd}" is not a valid command!`);
            break;
    }
}