# cucumber-selenium Demo

> 使用cucumber，selenium 技术 创建一个简单的demo。

- ## 安装node.js
    https://nodejs.org/zh-cn/  直接下载安装即可。  
    检验是否安装成功 打开命令行 输入 node -v  
    ```
    zackdeMacBook-Pro:~ zack-zhao$ node -v 
    v6.10.3
    ```
    有对应的版本号显示出来,即表示安装成功。
- ## 安装Chrome 浏览器
    本程序使用的是chrome 浏览器运行的。请在本机安装好chrome 浏览器
- ## 安装依赖文件
    在命令行下， 定位到本程序的目录下，运行 npm install  
    ```
    cd  /Users/zack-zhao/Desktop/cucumber-selenium-demo/
    npm install
    ```
    安装完成后，在cucumber-selenium-demo 会有一个node_moudules的目录
- ## 运行
    在cucumber-selenium-demo下运行命令 npm run script 会自动打开浏览器进行运行，运行完成后自动关闭浏览器，并打印出运行结果。
    ```
    Feature: Example feature

        测试百度搜索是否能够正常运行

    Scenario: 百度搜索自动化
    ✔ Given 打开百度首页
    ✔ When 输入关键字 "cucumber.io"
    ✔ Then 百度返回结果中包含 "Cucumber"

    1 scenario (1 passed)
    3 steps (3 passed)
    0m03.707s
    ```

- ## 运行流程

1.在命令行模式下运行 npm run script,自动在当前目录下找 package.json 文件（所以一定要在package.json同级目录下运行此命令）  
2.找到package.json中 scripts 部分，如下:
```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "script":"cucumber-js"
  },
```
再在scripts找script
```
"script":"cucumber-js"
```
取到script的值cucumber-js, 所以真正运行的是cucumber-js.  
3.在同级 node_modules 目录中一次遍历文件寻找cucumber-js.首先在 node_moudles/.bin目录下去找，找到
```
-node_modules
    -.bin
        -cucumber-js
        -cucumber-js.cmd
```
如果为linux 或者 unix 系统，会执行cucumber-js，windows系统则执行cucumber-js.cmd  
4.执行cucumber-js,cucumber-js会根据自己的内部的方法遍历 features 目录，找到.feature结尾的文件，我们有1个documentation.feature文件，cucumber-js会读取这个文件内容，找到里面定义的scenario
```
  Scenario: 百度搜索自动化
    Given 打开百度首页
    When 输入关键字 "cucumber.io"
    Then 百度返回结果中包含 "Cucumber"
```
5.依次读取 Scenario 中的每个步骤，首先找到`Given 打开百度首页` ,然后去step_definatitons目录下遍历所有的以js结尾文件进行匹配，在browser_step.js中匹配到
```
    Given('打开百度首页', function () {

        return this.driver.get('http://www.baidu.com');
    });
```
如果匹配成功，则运行自动化代码，如果没有匹配成功，就会输出undefined 的warning信息 。  
6.cucumber-js 会依次安照步骤5的方式运行下去，一直到遍历完Scenario和js文件。