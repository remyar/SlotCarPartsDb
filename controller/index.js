var db = require('../db');

module.exports.get = (req, res, next , render) => {     //--> Create http GET Method
    let objRet = {};
 
    objRet.categories = [];

    render(objRet);
}