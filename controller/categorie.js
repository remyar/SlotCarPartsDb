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
    let parts = db.getCategorie(req.params.categorie);

    let filters = {};
    
    if ( req.body.filters != undefined ){
        filters = JSON.parse(req.body.filters);
    }

    objRet.parts = [];

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

    let filterredParts = {};
    for ( let key in filters ){
        filters[key].map((k) => {
            parts.map((p) => {
                if ( p[key] == k ){
                    if ( filterredParts[p.product_reference] == undefined) {
                        filterredParts[p.product_reference] = p;
                    }
                }
            })
        });
    }

    for ( let key in filterredParts ){
        objRet.parts.push(filterredParts[key]);
    }
 

    /*
    parts.map((p , idx)=>{
        for ( let key in filters ){
            if ( p[key] != undefined ){
                if ( filters[key].length == 0){
                    objRet.parts.push(p);
                } else {
                    filters[key].map((k)=> {
                        if ( k == "" || k == p[key] ){
                            objRet.parts.push(p);
                        }
                    });
                }

            }
        }
    });
*/
    res.((send(JSON.stringify(objRet));
}