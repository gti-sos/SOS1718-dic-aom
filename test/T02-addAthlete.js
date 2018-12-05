/*global browser*/
/*global element*/
/*global expect*/
/*global by*/

var fs = require("fs");
var path = require("path");
var config = require("./config");

describe('Add athlete', function() {
    it('should add a new athlete', function() {
        browser
            .get(config.getAppUrl())
            .then(function() {
                element.all(by.repeater('athlete in athletes'))
                    .then(function(initialAthletes) {

                        element(by.model('newAthlete.name')).sendKeys('Alvaro');
                        element(by.model('newAthlete.country')).sendKeys('España');
                        element(by.model('newAthlete.year')).sendKeys('2018');
                        element(by.model('newAthlete.salary')).sendKeys('1500');
                        element(by.model('newAthlete.advertisingContracts')).sendKeys('2000');
                        element(by.model('newAthlete.total')).sendKeys('3500');

                        element(by.buttonText('Add')).click().then(function() {
                            element.all(by.repeater('athlete in athletes')).then(function(athletes) {
                                expect(athletes.length).toEqual(initialAthletes.length + 1);
                            });
                        });
                        browser.takeScreenshot()
                            .then(function(png) {
                                var stream = fs.createWriteStream(path.join(process.cwd(), 'test', 'output', 'T02.png'));
                                stream.write(new Buffer(png, 'base64'));
                                stream.end();
                            });

                    });
            });
    });
});
