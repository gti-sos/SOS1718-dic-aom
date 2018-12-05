/*global browser*/
/*global element*/
/*global expect*/
/*global by*/
 
var fs = require("fs");
var path = require("path");
var config = require("./config");

describe('Data is loaded', function() {
    it('should show some athletes', function() {
        browser
            .get(config.getAppUrl())
            .then(function() {
                element.all(by.repeater('athlete in athletes'))
                    .then(function(athletes) {
                        browser.takeScreenshot()
                            .then(function(png) {
                                var stream = fs.createWriteStream(path.join(process.cwd(), 'test', 'output', 'T01.png'));
                                stream.write(new Buffer(png, 'base64'));
                                stream.end();
                            });

                        expect(athletes.length).toBeGreaterThan(0);
                    });
            });
    });
});
