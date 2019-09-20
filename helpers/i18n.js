const path = require('path');
const fs = require('fs');

const fileList = fs.readdirSync(path.resolve(__dirname,'../i18n'));

var langues = {};

fileList.map((filename) => {
    let l = filename.replace('.json','');
    langues[l] = {};

    let langFile = fs.readFileSync(path.resolve(__dirname , '../i18n' , './' , filename) , 'utf8');

    langues[l] = JSON.parse(langFile);
});


module.exports = function (prop, options) {
    let locale = options.data.root.locale || 'en' ;

    return langues[locale][prop] || prop;
};