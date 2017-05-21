Feature: Example feature
  测试百度搜索是否能够正常运行

  Scenario: 百度搜索自动化
    Given 打开百度首页
    When 输入关键字 "cucumber.io"
    Then 百度返回结果中包含 "Cucumber"