var seleniumWebdriver = require('selenium-webdriver');
var { defineSupportCode } = require('cucumber');

defineSupportCode(function ({ Given, When, Then }) {

    Given('打开百度首页', function () {

        return this.driver.get('http://www.baidu.com');
    });

    When('input_baidu输入关键字 {stringInDoubleQuotes}', function (stringInDoubleQuotes) {

        xpath = '//*[@id="kw"]';

        return this.driver.findElement({ xpath: xpath }).then(function (element) {
            element.sendKeys(stringInDoubleQuotes);
            return element.sendKeys(seleniumWebdriver.Key.ENTER);
        });
    });

    Then('百度返回结果中包含 {stringInDoubleQuotes}', function (stringInDoubleQuotes) {
        var xpath = '//*[@id="1"]/h3/a/em';
        var condition = seleniumWebdriver.until.elementLocated({ xpath: '//*[@id="1"]/h3/a/em' });
        return this.driver.wait(condition, 5000);
    });
    Given('打开bing首页', function () {
        return this.driver.get('http://cn.bing.com');
    });
    When('input_bing输入关键字 {stringInDoubleQuotes}', function (stringInDoubleQuotes) {

        xpath = '//*[@id="sb_form_q"]';
        return this.driver.findElement({ xpath: xpath }).then(function (element) {
            element.sendKeys(stringInDoubleQuotes);
            return element.sendKeys(seleniumWebdriver.Key.ENTER);
        });
    });

    Then('bing返回结果中包含 {stringInDoubleQuotes}', function (stringInDoubleQuotes) {
        var xpath = '//*[@id="b_results"]/li[2]/div[1]/div/h2/a/i[1]';
         var condition = seleniumWebdriver.until.elementLocated({ xpath:xpath });
        return this.driver.wait(condition, 5000);
    });

});
