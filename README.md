# gw-commit-lint
简单可配置的commit约束工具。

#### Usage:
安装`npm install gw-commit-lint`。
在`package.json`中配置，建议结合[husky](https://github.com/typicode/husky)使用。
```json
"husky": {
    "hooks": {
      "commit-msg": "gw-commit-lint HUSKY_GIT_PARAMS"
    }
  },
```
gw-commit-lint默认集成了一套规则：

> /^(feat|fix|polish|docs|style|refactor|perf|test|workflow|ci|chore|types|build|misc)(\(.+\))?: .+/
type(scope?): subject  #scope is optional

规则参考自：[https://www.conventionalcommits.org/zh/v1.0.0-beta.2/](https://www.conventionalcommits.org/zh/v1.0.0-beta.2/)。

#### Config:
如果你不满足于默认配置，也可以通过在package.json中添加配置项来扩展规则。

`exclude`[Array]：如果你希望gw-commit-lint忽略某些格式的校验，可以配置在`exclude`下面，默认跳过Merge Request的commit。

`types`[Array]：如果你想增加自定义commit types，可以配置在`types`下面，默认的types：`feat|fix|polish|docs|style|refactor|perf|test|workflow|ci|chore|types|build|misc`。

`formats`[Array]：如果你不想用默认的规则，想自定义自己的规则，可以在此配置。

#### Example:
```json
 "gw-commit-lint" : {
    "exclude": [
      "/foo/g",
      "bar"
    ],
    "types": [
      "misc",
      "lalala"
    ],
    "formats": [
      "/a complex regExp formats here/img",
      "string is also ok"
    ]
  },
```
#### TODO: 
test should be add
