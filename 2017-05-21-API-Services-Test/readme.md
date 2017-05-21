## 快速创建一个接口自动化 demo

> 环境清单:
> 1. 支持操作系统： windows, Mac, Linux  
> 2. Node.js: v6.10.3以及以上版本均可
> 3. Json-mock: https://github.com/therebelbeta/json-mock
> 4. cucumber-js: https://github.com/cucumber/cucumber-js
> 5. got: https://github.com/sindresorhus/got
> 6. 开发工具使用 Vscode  
> 所用代码：[2017-05-21-API-Services-Test](https://github.com/imzengyang/public-demo/tree/master/2017-05-21-API-Services-Test)

### 使用json-mock模拟数据
  1.打开项目[mock-server](https://github.com/imzengyang/public-demo/tree/master/2017-05-21-API-Services-Test/mock_server) ，命令行切换到根目录下，执行 npm install 安装依赖包
  ```{r, engine='bash', count_lines}
  D:\public-demo\2017-05-21-API-Services-Test\mock_server> npm install
  ```
  2.命令行模式下 执行 npm run dbjson，mock_server 启动 输出提示信息
  ```
   D:\node-cucumber-selenium\public-demo\2017-05-21-API-Services-Test\mock_server> npm run userjson

> mocke-data@1.0.0 userjson D:\node-cucumber-selenium\public-demo\2017-05-21-API-Services-Test\mock_server
> json-mock user.json

{^_^} Hi!

Loading database from user.json
  http://localhost:3000/users
  http://localhost:3000/posts
  http://localhost:3000/comments

You can now go to http://localhost:3000/

Enter `s` at any time to create a snapshot of the db
  ```
打开浏览器，访问 http://localhost:3000/users 浏览器返回所有用户信息
```
[
  {
    "id": 1,
    "name": "therebelrobot",
    "location": "USA"
  },
  {
    "id": 2,
    "name": "visiting-user",
    "location": "UK"
  }
]
```
至此，一个简单的api接口服务器创建成功。
现在有如下接口说明文档  


### Normal Slash Routing

 Method  | Path | Description 
--|--|--
 `GET` | `/users` | Return list of users 
 `GET` | `/users/1` | Return user with id === 1 
 `GET` | `/users/2` | Return user with id === 2 
 `GET` | `/users/1/posts` | Return list of any posts with userId === 1 
 `GET` | `/users/1/posts/1` | Return post with userId === 1 && id === 1 
 `GET` | `/users/1/posts/1/comments` | Return list of any comments with postId === 1 
 `GET` | `/users/1/posts/1/comments/1` | Return comment with postId === 1 && id === 1 
 `GET` | `/users/1/posts/1/comments/2` | Return comment with postId === 1 && id === 2 
 `GET` | `/users/1/comments` | Return list of any comments with userId === 1 
 `GET` | `/users/2/comments` | Return list of any comments with userId === 2 
 `GET` | `/users/1/comments/1` | Return comment with userId === 1 && id === 1 
 `GET` | `/users/2/comments/2` | Return comment with userId === 2 && id === 2 
 `GET` | `/posts` | Return list of all posts 
 `GET` | `/posts/1` | Return post with id === 1 
 `GET` | `/posts/1/comments` | Return list of all comments with postId === 1 
 `GET` | `/posts/1/comments/1` | Return comment with postId === 1 && id === 1 
 `GET` | `/posts/1/comments/2` | Return comment with postId === 1 && id === 2 
 `GET` | `/comments` | Return list of all comments 
 `GET` | `/comments/1` | Return comment with id === 1 
 `GET` | `/comments/2` | Return comment with id === 2
 `POST` | `/users` | Create new user 
 `POST` | `/posts` | Create new post 
 `POST` | `/comments` | Create new comment 
 `PUT` | `/users/1` | Replace user by id 
 `PUT` | `/posts/1` | Replace post by id 
 `PUT` | `/comments/1` | Replace comment by id 
 `PATCH` | `/users/1` | Update user by id 
 `PATCH` | `/posts/1` | Update post by id 
 `PATCH` | `/comments/1` | Update comment by id 
 `DELETE` | `/users/1` | Remove user by id (could cause orphaned posts/comments. Refer to Roadmap below.) 
 `DELETE` | `/posts/1` | Remove post by id (could cause orphaned comments. Refer to Roadmap below.) 
 `DELETE` | `/comments/1` | Remove comment by id 





### 创建接口自动化测试
### *前言*
现在提供如下接口测试用例  

请求方法|请求路径|发送数据|预期结果|说明
     --|--|--|--|--
Get|http://localhost:3000/users/2 |  | {"id": 1,"name": "therebelrobot","location": "USA"} | 返回用户id为2的用户信息
Post|http://localhost:3000/users/1 | {"id": 4,"name": "JackMa","location": "China"} | {"id": 3,"name": "JackMa","location": "China"} |添加一位新的用户，服务器创建成功返回新用户信息


### 1.配置项目
打开项目[service_scripts](https://github.com/imzengyang/public-demo/tree/master/2017-05-21-API-Services-Test/service_scripts)
命令行模式切换到项目根目录下 运行 npm install 
```
D:\public-demo\2017-05-21-API-Services-Test\service_scripts> npm install
```

### 2.修改feature 文件
打开 features/services.feature ,根据文档要求，书写测试用例。
添加如下内容
```
Scenario: 测试get请求
    
   When 发送get请求到 "http://localhost:3000/users/2" 预期结果为
    """
    {
    "id": 2,
    "name": "visiting-user",
    "location": "UK"
    }
      """

 Scenario: 测试post请求

   When 使用post方法添加一个新的用户user,服务器添加成功后预期结果为
      """
      {
        "id": 4,
        "name": "JackMa",
        "location": "China"
      }
      """
```
### 3. 让cucumber-js 自动帮我们生成测试代码模型  
在命令行模式下 运行 npm run services,未实现的方法将会在输出栏自动显示出来

```javascript

     Undefined. Implement with the following snippet:

       When('发送get请求到 {stringInDoubleQuotes} 预期结果为', function (stringInDoubleQuotes, string, callback) {
         // Write code here that turns the phrase above into concrete actions
         callback(null, 'pending');
       });

2) Scenario: 测试post请求 - features\services.feature:40
   Step: When 使用post方法添加一个新的用户user,服务器添加成功后预期结果为 - features\services.feature:42
   Message:
     Undefined. Implement with the following snippet:

       When('使用post方法添加一个新的用户user,服务器添加成功后预期结果为', function (string, callback) {
         // Write code here that turns the phrase above into concrete actions
         callback(null, 'pending');
       });
       
```
根据提示，将提示的代码复制到step_definitions/services_step.js 文件中
此时， services_step.js
```javascript
var Cucumber = require('cucumber');
var got = require('got');
var assert = require('assert');

Cucumber.defineSupportCode(function (context) {
    var setWorldConstructor = context.setWorldConstructor;
    var Given = context.Given
    var When = context.When
    var Then = context.Then

    var jsonFarmot = {
        headers: {
            'Content-Type': 'application/json'
        },
        json: true
    }

    When('发送get请求到 {stringInDoubleQuotes} 应该得到用户{int}的相关信息', function (stringInDoubleQuotes, int, string) {
        return got.get(stringInDoubleQuotes, jsonFarmot).then(function (jsonresult) {
            // console.log("jsonresult", jsonresult.body)
            // console.log("string", JSON.parse(string))
            var data = jsonresult.body
            var assertdata = JSON.parse(string);

            return assert.deepEqual(data, assertdata);
        })

    });


    When('使用post方法添加一个user应该添加成功', function (string) {
        var user = { id: 3, name: "helloworld", location: "china" }
        var options = {
            headers: {
                'Content-Type': 'application/json'
            },
            json: true,
            body: JSON.stringify(user)
        }
        return got.post("http://localhost:3000/users", options).then(function (response) {
            var data = response.body
            var assertdata = JSON.parse(string);
            return assert.deepEqual(data, assertdata);
        })
    });

    When('发送get请求到 {stringInDoubleQuotes} 预期结果为', function (stringInDoubleQuotes, string, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback(null, 'pending');
    });

    When('使用post方法添加一个新的用户user,服务器添加成功后预期结果为', function (string, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback(null, 'pending');
    });

})
```
### 4.实现自动化方法
修改刚才复制的两个方法为
```javascript
When('发送get请求到 {stringInDoubleQuotes} 预期结果为', function (stringInDoubleQuotes, string) {
       return got.get(stringInDoubleQuotes, jsonFarmot).then(function (jsonresult) { //发送get请求 得到服务器返回结果

            var data = jsonresult.body  // 服务器返回数据
            var assertdata = JSON.parse(string); //预期结果

            return assert.deepEqual(data, assertdata); //对比
        })
    });

    When('使用post方法添加一个新的用户user,服务器添加成功后预期结果为', function (string) {
        
        var options = {
            headers: {
                'Content-Type': 'application/json'   //设置发送数据格式为 json
            },
            json: true,
            body: JSON.stringify(JSON.parse(string))     //将字符串格式化为json对象
        }
        return got.post("http://localhost:3000/users", options).then(function (response) { //post 方法提交数据
            var data = response.body    // 服务器返回数据
            var assertdata = JSON.parse(string);  //预期结果
            return assert.deepEqual(data, assertdata); //对比
        })
    });
```

再次运行 npm run services。 查看结果
