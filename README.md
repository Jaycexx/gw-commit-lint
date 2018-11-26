# gw-commit-lint
`exclude`：[Array]配置可以跳过验证的格式，默认跳过Merge Request的commit

`types`：[Array]增加自定义commit types，默认的types：`feat|fix|polish|docs|style|refactor|perf|test|workflow|ci|chore|types|build|misc`

`formats`：[Array]：自定义规则，如果配置了该项，默认的规则将不生效。默认的规则：`/^(feat|fix|polish|docs|style|refactor|perf|test|workflow|ci|chore|types|build|misc)(\(.+\))?: .+/`，参照[https://www.conventionalcommits.org/zh/v1.0.0-beta.2/](https://www.conventionalcommits.org/zh/v1.0.0-beta.2/)


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
      "/a complex regExp formats here/img"
    ]
  },
```
TODO: test should be add
