var db = require('./dbConnection');

function getAll(){
    return new Promise( function( resolve, reject ){
        db.list(function(err, body) {
            if (!err) {
                var promises = [];
                body.rows.forEach(function(document) {
                    promises.push(get(document));
                });

                Promise.all(promises)
                    .then(function(data){
                        resolve(data);
                    });
            } else {
                reject(err);
            }
        })
    })
}

function get( document ){
    return new Promise(function(resolve, reject){
        db.get(document.id, {
            revs_info: true
        }, function(err, doc) {
            if( !err ){
                resolve(doc);
            } else {
                reject(err);
            }
        });
    });
}

//Exports the UsersSchema for use elsewhere.
module.exports.getAll = getAll;
module.exports.get = get;