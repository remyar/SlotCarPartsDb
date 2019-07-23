module.exports = {
    'index': {
        url: '/',
        controller: './controller/index',
        view: 'index'
    },
    'categorie' :{
        url : '/categorie/:categorie.html',
        controller: './controller/categorie',
        view: 'index'
    }
}