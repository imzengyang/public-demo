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

