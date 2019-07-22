var sq = require('sqlite3');
var path = require('path');

sq.verbose(); // pour obtenir des informations sur l'exécution des
              // requêtes SQL (utile pour le débug)

var db = new sq.Database(path.resolve(__dirname , './database.db3'));