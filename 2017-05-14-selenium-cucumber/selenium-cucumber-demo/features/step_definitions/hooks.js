var {defineSupportCode} = require('cucumber');

defineSupportCode(function({After}) {
    // Before(function(){
    //     return this.driver.manage().window().maxsize();
    // });
    After(function() {
        return this.driver.quit();
    });
});