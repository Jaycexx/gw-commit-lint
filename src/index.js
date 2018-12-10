const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const readPkg = require('read-pkg');
let findUp = require('find-up');
let appRoot = require('app-root-path').path;
const msgPath = process.env.HUSKY_GIT_PARAMS ? rocess.env.HUSKY_GIT_PARAMS :  process.env.GIT_PARAMS;
const pkgConifg = readPkg.sync()['gw-commit-lint'];
const { exclude, types, formats } = pkgConifg || {};

// 配置检测
//【msgPath】.git/COMMIT_EDITMSG
// console.log('[root]', appRoot);
// console.log('[msgPath]', msgPath);
// console.log('[pkg.json]', pkgConifg);

const regExpParser = (str) => {
    let left = str.indexOf('/');
    let right = str.lastIndexOf('/');
    let result;
    if(left !== -1 && right !== -1 && right !== left) {
        result = new RegExp(str.slice(left + 1, right), str.slice(right + 1));
    } else {
        result = new RegExp(str);
    }
    return result;
};

module.exports = function gwCommitLint(msg) {

    if(!msgPath && !msg) {
        console.error(chalk.red(`[gw-commit-lint]: HUSKY_GIT_PARAMS/GIT_PARAMS is needed. But got ${msgPath}`));
        process.exit(1);
    }
    
    
    // 配置格式验证
    let gitRoot = findUp.sync('.git');
    const gitMsg = fs.readFileSync(path.resolve(gitRoot, '../', msgPath), 'utf-8').trim();
    msg = msg ? msg : gitMsg;
    // 可以放过的格式，默认过滤Merge branch
    let excludeExps = exclude || ['/^Merge branch/'];
    if(excludeExps) {
        if(!Array.isArray(excludeExps)) {
            console.error(chalk.red(`[gw-commit-lint][error-config-type]: exclude is expected to be Array. Got ${excludeExps}`));
            process.exit(1);
        }
        excludeExps.forEach(str => {
            const reg = regExpParser(str);
            if(reg.test(msg)) {
                process.exit(0);
            }
        });
    }

    // 限定的格式，如果配置了formats，就不验证默认的规则
    if(formats) {
        if(!Array.isArray(formats)) {
            console.error(chalk.red(`[gw-commit-lint][error-config-type]: formats is expected to be Array. Got ${formats}`));
            process.exit(1);
        }
        formats.forEach(str => {
            const reg = regExpParser(str);
            if(reg.test(msg)) {
                process.exit(0);
            } else {
                process.exit(1);
            }
        });
    }

    let newTypes = '';
    if(types) {
        if(!Array.isArray(types)) {
            console.error(chalk.red(`[gw-commit-lint][error-config-type]: types is expected to be Array. Got ${formats}`));
            process.exit(1);
        }
        newTypes = types.join('|') ? `|${types.join('|')}` : '';
    }
    
    // console.log('[msg]', msg);
    let commitRE = regExpParser(`/^(feat|fix|polish|docs|style|refactor|perf|test|workflow|ci|chore|types|build|misc${newTypes})(\(.+\))?: .+/`);

    if (!commitRE.test(msg)) {
        console.error(
            `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(`invalid commit message format.`)}\n\n` +
            chalk.red(`  Proper commit message format is required for automated changelog generation. Examples:\n\n`) +
            `    ${chalk.green(`feat(compiler): add 'comments' here(#KJDS-12222)`)}\n` +
            `    ${chalk.green(`fix(v-model): handle events on blur(#kjds-13333)`)}\n\n` +
            chalk.red(`  See .github/COMMIT_CONVENTION.md for more details.\n`) +
            chalk.red(`  About the rules: https://github.com/329530588/gw-commit-lint \n`)
        )
        process.exit(1)
    }
    process.exit(0);
}