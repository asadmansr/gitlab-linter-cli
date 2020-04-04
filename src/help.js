import chalk from 'chalk';

const menus = {
    main: `
${chalk.black('GitLab Linter CLI (1.0.0) - a linter to validate GitLab CI pipeline yaml files.')}

${chalk.gray('gitlab-linter [command]')}

    ${chalk.blueBright('help (-h)')} ............... show help
    ${chalk.blueBright('version (-v)')} ............ print package version
    
    `
}

export async function help(args) {
    const subCmd = args._[0] === 'help' ? args._[1] : args._[0]
    console.log(menus[subCmd] || menus.main)
}