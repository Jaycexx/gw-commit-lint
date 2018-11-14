const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const readPkg = require('read-pkg');
let findUp = require('find-up');
let appRoot = require('app-root-path').path;
const msgPath = process.env.HUSKY_GIT_PARAMS;
const pkgConifg = readPkg.sync()['gw-commit-lint'];
const { exclude, types, formats } = pkgConifg;

// 配置检测
//【msgPath】.git/COMMIT_EDITMSG
console.log('[root]', appRoot);
console.log('[msgPath]', msgPath);
console.log('[pkg.json]', pkgConifg);

module.exports = function gwCommitLint() {
    if(!msgPath) {
        console.error(chalk.red('[gw-commit-lint]: GIT_PARAMS is undefined.'));
        process.exit(1);
    }
    
    // find git path
    let gitRoot = findUp.sync('.git');
    const msg = fs.readFileSync(path.resolve(gitRoot, '../', msgPath), 'utf-8').trim();
    console.log('[msg]', msg);
    const commitRE = /^(revert: )?(feat|fix|polish|docs|style|refactor|perf|test|workflow|ci|chore|types|build|misc)(\(.+\))?: .{0,50}/;
    const mergeRE = /^Merge branch/;

    exclude.forEach()

    if (!commitRE.test(msg) && !mergeRE.test(msg)) {
        console.error(
            `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(`invalid commit message format.`)}\n\n` +
            chalk.red(`  Proper commit message format is required for automated changelog generation. Examples:\n\n`) +
            `    ${chalk.green(`feat(compiler): add 'comments' here(#KJDS-12222)`)}\n` +
            `    ${chalk.green(`fix(v-model): handle events on blur(#kjds-13333)`)}\n\n` +
            chalk.red(`  See .github/COMMIT_CONVENTION.md for more details.\n`) +
            chalk.red(`  About the rules: https://www.conventionalcommits.org/zh/v1.0.0-beta.2/ \n`)
        )
        console.log(chalk.red('failed'));
        process.exit(1)
    }
    console.log(chalk.green('pass'));
    process.exit(1) // debug用：无论如何都不通过
}