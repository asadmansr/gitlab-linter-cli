import Conf from 'conf';
import { validateHost, formatHost } from './utils';

export const configKey = 'gitlab-linter-cli';

export async function config(args) {
    const config = new Conf();
    let configObj = config.get(configKey);
    configObj = configObj || {}

    if (args.clear) {
        config.clear();
        return;
    }

    if (args.print) {
        console.log("Host: " + configObj.host + "\n");
        return;
    }

    let host = args.host || args['host']

    if (!host) {
        host = configObj.host;
    }

    if (!validateHost(host)) {
        return;
    }

    host = formatHost(host);

    config.set(configKey, { host: host });
}