import chalk from 'chalk';

export function validateHost(host) {
    if (!host) {
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
        return false;
    }

    const isURLValid = validateURL(host);

    if (!isURLValid) {
        console.error(
            `${chalk.redBright(`Error: URL is not valid or does not contain gitlab domain name.`)}
            `
        );
        console.warn(
            `Please use the command ${chalk.green('gitlab-linter config --host=https://gitlab.com')} to get started.`
        );
        console.log(
            `${chalk.gray('If your GitLab instance has a different URL, configure the host parameter as --host=https://gitlab.example.com')}
            `
        );
        return false;
    }

    return true;
}

export function formatHost(host) {
    return host.replace(/\/+$/, "");
}

function validateURL(url) {
    var pattern = new RegExp('https:\/\/gitlab\.?.*\.[a-z]{2,3}', 'i');
    return !!pattern.test(url);
}