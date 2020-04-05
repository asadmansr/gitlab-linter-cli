import Conf from 'conf';
import chalk from 'chalk';
import { configKey } from './config';
import { queryGitLabLint } from './query';

export async function file(args) {
    const fileName = args._[1];
    const fs = require('fs');
    const yaml = require('js-yaml');

    try {
        if (!(fs.existsSync(fileName))) {
            console.error(
                `${chalk.redBright(`Error: File specified to lint cannot be found.`)}`
            );
            console.warn(
                `Ensure the file exist in the correct path and run ${chalk.green('gitlab-linter file <file-name>')}.
                `
            );
            return;
        }
    } catch (err) {
        console.error(err);
    }

    const ymlObj = yaml.load(fs.readFileSync(fileName, { encoding: 'utf-8' }));
    const jsonObj = JSON.stringify(ymlObj);

    const config = new Conf();
    let configObj = config.get(configKey);

    if (!configObj) {
        console.error(
            `${chalk.redBright(`Error: GitLab url has not been configured.`)}
            `
        );
        console.warn(
            `Please use the command ${chalk.green('gitlab-linter config --host=https://gitlab.com')} to get started.`
        );
        console.log(
            `${chalk.gray('If your GitLab instance has a different URL, configure the host parameter as --host=https://gitlab.example.com')}
            `
        );
        return;
    }

    const { data } = await queryGitLabLint(configObj.host, jsonObj);
    const status = data.status;
    console.log("Validate GitLab CI for " + fileName + ":" + "\n");

    if (status === 'valid') {
        console.log("Successfully scanned and found no issues.");
        console.log("");

    } else if (status === 'invalid') {
        console.log("Status:  " + data.status);
        console.log("Errors:  " + data.errors);
        console.log("");
    }
}