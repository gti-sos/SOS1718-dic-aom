/*global element*/
/*global by*/

var newman = require('newman');
var path = require('path');

describe('API should works', function() {
    newman.run({
        collection: require(path.join(process.cwd(), "test", "SOS1718-dic-aom-highest-paid-athletes.postman_collection.json")),
        reporters: "cli"
    }, function(err) {
        if (err)
            throw err;
        else
            console.log(" collection run complete!");


    })


});
