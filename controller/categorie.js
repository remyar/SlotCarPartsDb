var db = require('../db');

module.exports.get = (req, res, next , render) => {     //--> Create http GET Method
    let objRet = {};
 
    objRet.categories = db.getCategories();


    objRet.parts = db.getCategorie(req.params.categorie);


    //-- listing des filtres
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



module.exports.post = (req, res, next , render) => { //--> Create http POST Method

    let objRet = {};
    objRet.parts = db.getCategorie(req.params.categorie);

    let filters = {};
    
    if ( req.body.filters != undefined ){
        filters = JSON.parse(req.body.filters);
    }

    //-- netoyage des filtres
    for ( let key in filters ){
        let isEmpty = true;
        filters[key].map((k)=>{
            if ( k != "" ){
                isEmpty = false;
            }
        });
        if ( isEmpty == true ){
            delete filters[key];
        }
    }

    function _filterParts(_tabParts , key ){
        let returnParts = [];
        _tabParts.map((p) => {
            let validParts = false;
            filters[key].map((k) => {
                if ( p[key] == k ){
                    validParts = true;
                }
            });
            if ( validParts == true ){
                returnParts.push(p);
            }
        });
        return returnParts;
    }

    for ( let key in filters ){
        objRet.parts = _filterParts(objRet.parts , key);
    }


    res.send(JSON.stringify(objRet));
}