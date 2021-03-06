/**
 * Created by user on 12.03.2017.
 */

var path = require('path'),
    fs = require('fs');

var dbCredentials = {
    dbName: 'my_sample_db_test'
};

var cloudant;

var db;

function getDBCredentialsUrl(jsonData) {
    var vcapServices = JSON.parse(jsonData);
    // Pattern match to find the first instance of a Cloudant service in
    // VCAP_SERVICES. If you know your service key, you can access the
    // service credentials directly by using the vcapServices object.
    for (var vcapService in vcapServices) {
        if (vcapService.match(/cloudant/i)) {
            return vcapServices[vcapService][0].credentials.url;
        }
    }
}

function initDBConnection() {
    //When running on Bluemix, this variable will be set to a json object
    //containing all the service credentials of all the bound services
    if (process.env.VCAP_SERVICES) {
        dbCredentials.url = getDBCredentialsUrl(process.env.VCAP_SERVICES);
    } else { //When running locally, the VCAP_SERVICES will not be set

        // When running this app locally you can get your Cloudant credentials
        // from Bluemix (VCAP_SERVICES in "cf env" output or the Environment
        // Variables section for an app in the Bluemix console dashboard).
        // Once you have the credentials, paste them into a file called vcap-local.json.
        // Alternately you could point to a local database here instead of a
        // Bluemix service.
        // url will be in this format: https://username:password@xxxxxxxxx-bluemix.cloudant.com
        dbCredentials.url = getDBCredentialsUrl(fs.readFileSync("vcap-local.json", "utf-8"));
    }

    cloudant = require('cloudant')(dbCredentials.url);
}

function use( dbName ){
    if( !dbName ){
        dbName = dbCredentials.dbName;
    }
    // check if DB exists if not create
    cloudant.db.create(dbName, function(err, res) {
        if (err) {
            if( process.env.NODE_ENV !== 'test'){
                console.log('Could not create new db: ' + dbName + ', it might already exist.');
            }
        }
    });

    db = cloudant.use(dbName);

    return db;
}

initDBConnection();

module.exports = use;