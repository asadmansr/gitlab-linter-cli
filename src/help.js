import chalk from 'chalk';

const menus = {
    main: `
${chalk.black('GitLab Linter CLI (1.0.0) - a linter to validate GitLab CI pipeline yaml files.')}

${chalk.gray('gitlab-linter [command]')}

    ${chalk.blueBright('config')}        ............... set configuration
    ${chalk.blueBright('file')} <file>   ............... specify file to lint
    ${chalk.blueBright('help')} <option> ............... show help for a command (-h)
    ${chalk.blueBright('version')}       ............... print package version (-v)
    `,

    config: `
${chalk.gray('gitlab-linter config <option>')}

    ${chalk.blueBright('--host')}  ........ set GitLab URL host. [Required]
    ${chalk.blueBright('--print')} ........ print current configuration.
    `,
}

export async function help(args) {
    const subCmd = args._[0] === 'help' ? args._[1] : args._[0]
    console.log(menus[subCmd] || menus.main)
}