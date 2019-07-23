var db = require('../db');

module.exports.get = (req, res, next , render) => {     //--> Create http GET Method
    let objRet = {};
 
    objRet.categories = db.getCategories();


    let allParts = db.getCategorie(req.params.categorie);

    let queryLength = 0;
    for ( let key in req.query){
        queryLength++;
    }
    if ( queryLength == 0 ){
        objRet.parts = allParts;
    } else{
        objRet.parts = [];

        if ( req.query.filters != undefined){
            let filters = JSON.parse(req.query.filters);
            allParts.map((part) => {
                objRet.parts.push(part);
            });
        }

    }
    

    objRet.filters = {};

    objRet.parts.map((part) => {
        for ( let key in part){

            if ( key == "title" || key == "url" || key == "product_reference"){
                continue;
            }

            if ( objRet.filters[key] == undefined ){
                objRet.filters[key] = [];
            }

            var found = objRet.filters[key].find(function(element) {
                return element == part[key];
            });

            if ( found == undefined || found == false ){
                objRet.filters[key].push(part[key]);
            }
        }
    })

    render(objRet);
}