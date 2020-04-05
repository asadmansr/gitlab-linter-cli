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
            `${chalk.redBright(`Error: URL is not valid`)}
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

    const isGitLabURL = validateGitLabURL(host);

    if (!isGitLabURL) {
        console.error(
            `${chalk.redBright(`Error: URL specified does not contain gitlab.com`)}
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

function validateURL(url) {
    var pattern = new RegExp('^(https?:\\/\\/)?' +
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
        '((\\d{1,3}\\.){3}\\d{1,3}))' +
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
        '(\\?[;&a-z\\d%_.~+=-]*)?' +
        '(\\#[-a-z\\d_]*)?$', 'i');
    return !!pattern.test(url);
}

function validateGitLabURL(url) {
    return url.includes("gitlab");
}
