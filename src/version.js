export async function version() {
    const packageFile = require('../package.json');
    const packageVersion = new String(packageFile.version);
    const space = '  '

    console.log(
        "Version:" + space + packageVersion + "\n"
    );
}