const db = require('./parts.json');

module.exports.getCategories = () => {
    let categories = [];

    for ( let key in db ){
        categories.push({ name : key , count : db[key].length});
    }

    return categories;
}

module.exports.getCategorie = ( cat ) => {

    let parts = db[cat];

    if ( parts == undefined){
        parts = [];
    }
    
    return parts;
}