var db = require('../db');

module.exports.get = (req, res, next , render) => {     //--> Create http GET Method
    let objRet = {};
 
    objRet.categories = db.getCategories();

    render(objRet);
}

module.exports.post = (req, res, next , render) => { //--> Create http POST Method

}