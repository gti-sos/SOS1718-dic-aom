var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var request = require("request");

var MongoClient = require("mongodb").MongoClient;
var port = (process.env.PORT || 1607);
var BASE_API_PATH = "/api/v1";
var mdbURL = "mongodb://aom:rb1907@ds125680.mlab.com:25680/sos1718-dic-aom";
var app = express();
var path = require("path");

app.use("/", express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(cors());

var initialAthletes = [{
        "name": "Floyd Mayweather",
        "country": "Estados Unidos",
        "year": 2018,
        "salary": 275000000,
        "advertisingContracts": 10000000,
        "total": 285000000

    },
    {
        "name": "Lionel Messi",
        "country": "Argentina",
        "year": 2018,
        "salary": 84000000,
        "advertisingContracts": 27000000,
        "total": 111000000

    },
    {
        "name": "Cristiano Ronaldo",
        "country": "Portugal",
        "year": 2018,
        "salary": 61000000,
        "advertisingContracts": 47000000,
        "total": 108000000

    },
    {
        "name": "Conor McGregor",
        "country": "Irlanda",
        "year": 2018,
        "salary": 85000000,
        "advertisingContracts": 14000000,
        "total": 99000000

    },
    {
        "name": "Neymar",
        "country": "Brasil",
        "year": 2018,
        "salary": 73000000,
        "advertisingContracts": 17000000,
        "total": 90000000

    },
    {
        "name": "LeBron James",
        "country": "Estados Unidos",
        "year": 2018,
        "salary": 33500000,
        "advertisingContracts": 52000000,
        "total": 85500000

    },
    {
        "name": "Roger Federer",
        "country": "Suiza",
        "year": 2018,
        "salary": 12200000,
        "advertisingContracts": 65000000,
        "total": 77200000

    },
    {
        "name": "Stephen Curry",
        "country": "Estados Unidos",
        "year": 2018,
        "salary": 34900000,
        "advertisingContracts": 42000000,
        "total": 76900000

    },
    {
        "name": "Matt Ryan",
        "country": "Estados Unidos",
        "year": 2018,
        "salary": 62300000,
        "advertisingContracts": 5000000,
        "total": 67300000

    },
    {
        "name": "Matthew Stafford",
        "country": "Estados Unidos",
        "year": 2018,
        "salary": 57500000,
        "advertisingContracts": 2000000,
        "total": 59500000

    }
];

//integración
var apiServerHost = "https://sos1718-01.herokuapp.com";

app.use("/proxyALVARO", function(req,res){
    var url = apiServerHost + req.url;
    console.log('piped: ' + req.baseUrl + req.url);
    req.pipe(request(url)).pipe(res);
});

MongoClient.connect(mdbURL, { useNewUrlParser: true }, (err, mlabs) => {
    if (err) {
        console.error("Erro accesing DB:" + err);
        process.exit(1);
    }
    console.log("connected to DB in mlabs");
    var database = mlabs.db("sos1718-dic-aom");
    var db = database.collection("athletes");

    // load initial data
    app.get(BASE_API_PATH + "/highest-paid-athletes/loadInitialData", (req, res) => {
        db.find({}).toArray((err, athletes) => {
            if (err) {
                console.error("Error accesing DB");
                process.exit(1);
                return;
            }
            else {
                if (athletes.length == 0) {
                    console.log("Empty DB");
                    db.insertMany(initialAthletes);
                    res.send(athletes.map((a) => {
                        delete a._id;
                        return a;
                    }));
                }
            }
        });
    });

    // collection postman
    app.get(BASE_API_PATH + "/highest-paid-athletes/docs", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/3889720/RWaDWB8B");
    });

    //operaciones generales del recurso

    app.get(BASE_API_PATH + "/highest-paid-athletes", (req, res) => {
        console.log("**" + Date() + " - GET /hpAthletes");

        db.find({}).toArray((err, athletes) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            console.log("DB initialized with" + athletes.length + "athletes");
            res.send(athletes.map((a) => {
                delete a._id;
                return a;
            }));
        });
    });

    app.post(BASE_API_PATH + "/highest-paid-athletes", (req, res) => {
        console.log(Date() + " - POST /hpAthletes");
        var athlete = req.body;

        db.find({ "name": athlete.name }).toArray((err, athletes) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
            }
            if (athletes.length > 0) {
                console.log("warning");
                res.sendStatus(409);
                return;
            }
            if (!athlete.name || !athlete.country || !athlete.year || !athlete.salary || !athlete.advertisingContracts || !athlete.total || Object.keys(athlete).length != 6) {
                console.warn(Date() + "warning new GET");
                res.sendStatus(400);
                return;
            }
            else {
                db.insert(athlete);
                res.sendStatus(201);
            }
        });
    });

    app.put(BASE_API_PATH + "/highest-paid-athletes", (req, res) => {
        console.log(Date() + " - PUT /hpAthletes");
        res.sendStatus(405);
    });

    app.delete(BASE_API_PATH + "/highest-paid-athletes", (req, res) => {
        console.log("**" + Date() + " - DELETE /hpAthletes");
        db.find({}).toArray((err, athletes) => {
            if (err) {
                console.error("Error delete DB");
                res.sendStatus(500);
            }
            else {
                db.deleteMany({});
                res.sendStatus(200);
            }
        });
    });

    //operaciones sobre un recurso concreto

    app.get(BASE_API_PATH + "/highest-paid-athletes/:name", (req, res) => {
        console.log(Date() + " - GET /hpAthletes/" + name);
        var name = req.params.name;

        db.find({ "name": name }).toArray((err, athletes) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
            }
            else {
                if (athletes.length > 0) {
                    res.send(athletes.map((a) => {
                        delete a._id;
                        return a;
                    })[0]);
                }
                else {
                    console.log("warning");
                    res.sendStatus(404);
                }
            }
        });

    });

    app.post(BASE_API_PATH + "/highest-paid-athletes/:name", (req, res) => {
        console.log(Date() + " - POST /hpAthletes/" + name);
        var name = req.params.name;
        res.sendStatus(405);
    });

    app.put(BASE_API_PATH + "/highest-paid-athletes/:name", (req, res) => {
        console.log(Date() + " - PUT /hpAthletes/" + name);
        var name = req.params.name;
        var athlete = req.body;

        if (name != athlete.name) {
            res.sendStatus(400);
            console.warn(Date() + " - Hacking attempt!");
            return;
        }
        db.update({ "name": athlete.name }, athlete, (err, numUpdated) => { //update devuelve el numero de elementos que se han actualizado
            if (err) {
                console.error("Error update DB");
                res.sendStatus(500);
            }
            else {
                console.log("Updated:" + numUpdated);
                res.sendStatus(200);
            }
        });
    });

    app.delete(BASE_API_PATH + "/highest-paid-athletes/:name", (req, res) => {
        console.log(Date() + " - DELETE /hpAthletes/" + name);
        var name = req.params.name;

        db.remove({ "name": name });
        res.sendStatus(200);
    });

    app.listen(port, () => {
        console.log("Server ready on port:" + port + "!");
    }).on("error", (e) => {
        console.log("Server NOT READY:" + e);
    });

    console.log("Server setting up...");

});
