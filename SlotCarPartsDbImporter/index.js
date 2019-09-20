
var dumpList = require('./dump_list.json').list;

const fs = require ('fs');
const path = require('path');
const progress = require('./progress');

const SlotCarUniondump = require('./SlotCarUniondump');

const TableParser = [
    { str : "https://www.slotcar-union.com" , parser : SlotCarUniondump},
];

let tabToDump=[];
//-- récupération de la longueur totale
for ( let key in dumpList ){
    let marque = dumpList[key];

    for ( let k in marque) {

        marque[k].map((m)=>{
            tabToDump.push({ url : m.url , marque : key , table : k });
        })
        
    }
}

let allProduct = {};
let bar1 = progress.create(tabToDump.length , 'Categories');

function _launchDump(idx){
    progress.update(bar1 , idx );

    for ( let key in TableParser ){
        let tp = TableParser[key];

        if ( tabToDump[idx].url.includes(tp.str) == true ){
            return tp.parser.fetch(tabToDump[idx].url).then((products)=>{

                let cat = tabToDump[idx].table;
                if ( allProduct[cat] == undefined ){
                    allProduct[cat] = [];
                }
                products.map((p)=>{
                    p.marque = tabToDump[idx].marque;
                    allProduct[cat].push(p);
                })
        
                if (idx >= tabToDump.length - 1) {
                    return allProduct;
                }
                else {
                    return _launchDump(idx + 1);
                }
            });
        } 
    }
}

_launchDump(0).then((allProduct) => {
    progress.update(bar1 , tabToDump.length );
    fs.writeFileSync(path.resolve(__dirname , './parts.json') , JSON.stringify(allProduct));
    progress.close(bar1);
})

