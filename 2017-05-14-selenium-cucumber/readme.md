# 2017年-05-14 分享内容

## *前言*  
通过讲解一个selenium cucumber 的实例，能够快速上手去做一些功能相对简单的web自动化测试

## 环境配置
- 操作系统： windows,linux,mac os 均可
- 开发语言： node.js https://nodejs.org/zh-cn/
- 开发工具： vscode  https://code.visualstudio.com/


## 目录结构
```
-selenium-cucumber-demo   项目名称  
  -features               定义自动化测试用例描述文件和脚本运行文件目录
    -step_definitions     存放所有自动化脚本目录
      -browser-step.js    编写的自动化脚本文件
      -hooks.js           定义测试用例执行之前和之后的操作
    -support              selenium运行配置目录
      -world.js           全局配置（设置使用浏览器类型，默认最大等待时间）
    documentation.feature 描述测试功能 与step_definitions/browser-step.js中方法对应
  -packge.json            定义项目描述文件
```

## 项目运行
项目运行参考 https://github.com/imzengyang/public-demo/tree/master/2017-05-14-selenium-cucumber/selenium-cucumber-demo  上面的操作步骤