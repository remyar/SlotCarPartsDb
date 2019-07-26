// require the library
const _cliProgress = require('cli-progress');
const _readline = require('readline');
const uuidv1 = require('uuid/v1');
var _colors = require('colors');
let _cliProgressTab = [];
let cursor = 0;

module.exports.create = ( size , name ) => {
    if ( name == undefined ){
        name = "downloading"
    }

    // create a new progress bar instance and use shades_classic theme
    let pro = new _cliProgress.Bar({
        format : '' + name + ' |'+ _colors.cyan('{bar}') + '| {percentage}% || {value}/{total}',
        stream : process.stdout
    }, _cliProgress.Presets.shades_classic);
    pro.uuid = uuidv1();
    pro.start(size, 0);
    pro.stream.write('\r\n');
    _cliProgressTab.push(pro);
    cursor++;
    return pro;
}

module.exports.max = (progress , val)=>{
    _cliProgressTab.map((_cli ,idx)=>{
        if ( _cli.uuid == progress.uuid ){
            _cli.setTotal(val);
        }
    })
}

module.exports.update = (progress , val ) => {
    _cliProgressTab.map((_cli ,idx)=>{
        if ( _cli.uuid == progress.uuid ){
            _readline.moveCursor(_cli.stream,0, idx - cursor);
            cursor = idx;
        }
    })
    progress.update(val);
}

module.exports.updatePercent = (progress , val ) => {
    _cliProgressTab.map((_cli ,idx)=>{
        if ( _cli.uuid == progress.uuid ){
            _readline.moveCursor(_cli.stream,0, idx - cursor);
            cursor = idx;
        }
    })
    progress.update(val*100);
}

module.exports.close = (progress) => {
    progress.stop();
}