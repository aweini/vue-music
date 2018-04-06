'use strict'
// chalk 控制台打印字体标记颜色
const chalk = require('chalk')
// semver 版本控制
// 检测npm版本 如果小于package.json里的npm node 版本报错
// 我们的电脑服务器安装了nodejs环境，我们就可以在本电脑服务器中使用node命令执行文件，nodejs环境一直有效
// 在服务器中运行node的启动程序，就进入了我们代码的执行环境，比如监听接口，处理数据，就像java
// 而node又有一个功能是开启服务器就想tomcat，服务器监听请求(如http请求)然后给node处理程序，就像tomcat让java处理程序
// nodejs环境就像一个容器，在这里面用它的规范接口写程序运行，它可以用它的底层实现我们的要求
// nodejs环境就像浏览器window环境 提供了变量globle、process 就像我们浏览器的window document Math等
// 我们用它的时候用很多模块有的它自身就有，有的要外部引入，如这个chalk模块，就像我们引入jquery
const semver = require('semver')
const packageConfig = require('../package.json')
const shell = require('shelljs')
function exec (cmd) {
  return require('child_process').execSync(cmd).toString().trim()
}

const versionRequirements = [
  {
    name: 'node',
    currentVersion: semver.clean(process.version),
    versionRequirement: packageConfig.engines.node
  }
]

if (shell.which('npm')) {
  versionRequirements.push({
    name: 'npm',
    currentVersion: exec('npm --version'),
    versionRequirement: packageConfig.engines.npm
  })
}

module.exports = function () {
  const warnings = []
  for (let i = 0; i < versionRequirements.length; i++) {
    const mod = versionRequirements[i]
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      )
    }
  }

  if (warnings.length) {
    console.log('')
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()
    for (let i = 0; i < warnings.length; i++) {
      const warning = warnings[i]
      console.log('  ' + warning)
    }
    console.log()
    process.exit(1)
  }
}
