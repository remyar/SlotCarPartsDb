const fetch = require("node-fetch");
const HtmlParser = require('node-html-parser');
const progress = require('./progress');

let bar2 = progress.create(1 , 'Products  ');

module.exports.fetch = (url) =>{
 
    url = url + "?n=160";
    //console.log(url);
    return fetch(url).then((result)=>{
        if ( result.status != 200 ){
            throw new Error(result.status);
        }
        return result.text();
    }).then(( text )=>{
        let urlTab = [];
        let html = HtmlParser.parse(text).querySelector(".product_list");
        let producList = html.childNodes;
    
        producList.map((productContainer)=>{
            let qs = productContainer.querySelector(".right-block h5 .product-name").attributes;
            urlTab.push({
                title : qs.title,
                url : qs.href,
            })
        });
        progress.max(bar2 , urlTab.length)
        progress.update(bar2 , 0); 
        return urlTab;
    }).then((urlProducts) => {
        
        function _getProductDescription(id){
            
            progress.update(bar2 , id );
            //console.log(urlProducts[id].url);
            return fetch(urlProducts[id].url).then((result)=>{
    
                if ( result.status != 200 ){
                    throw new Error(result.status);
                }
            
                return result.text();
            }).then((text)=>{
    
                let li = HtmlParser.parse(text).querySelector("#technique .table-data-sheet");
    
                li.childNodes.map((lic)=>{
                    urlProducts[id][lic.childNodes[0].text.replace(/ /g,'_').replace(/"/g, "").replace(/'/g, "").replace(/\(|\)/g, "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()] = lic.childNodes[1].text;
                })
    
                let span = HtmlParser.parse(text).querySelector("#product_reference .editable");
                urlProducts[id]['product_reference'] = span.text;
                urlProducts[id].title = urlProducts[id].title.replace(span.text.replace(/-/g,' '),'').trim();
    
            }).then(()=>{
    
                if (id >= urlProducts.length - 1) {
                    progress.update(bar2 , urlProducts.length); 
                    return urlProducts;
                }
                else {
                    return _getProductDescription(id + 1);
                }
            })
        }
    
        return _getProductDescription(0);
    
    })
}