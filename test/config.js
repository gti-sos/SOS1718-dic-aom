exports.config = {
    seleniumAddress: "http://localhost:8910", //le decimos en que sitio hay corriendo un proceso que entienda el protocolo de selenium. nosotros vamos a phantomjs entiende ese protocolo y phantomjs lo vamos a desplegar en su puerto por defecto 8910.
    
    specs: ['T01-loadData.js','T02-addAthlete.js','T00-ApiAthletes.js'], //que archivos de test voy a lanzar
    
    capabilities: {
        'browserName' : 'phantomjs' //que tipo de navegador es en este caso phantomjs
    },
    
    params:{
        host: 'localhost',
        port: '8080',
        nombreapi: "/App.html#!/athletes"
    }
    
};

exports.getAppUrl = function(){
    return "http://" + browser.params.host + ":" + browser.params.port + browser.params.nombreapi;
};