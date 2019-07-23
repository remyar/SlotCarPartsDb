var filtersTab = {};
$(function() {
    filtersTab = {};    



});

function navigationGoTo(url){
    window.location.href = url;
}

function filterChange(filters){
    filtersTab[filters] = $('#' + filters).val(); 

    let href = window.location.href.split('?')[0];
    navigationGoTo(window.location.href + "?filters=" + JSON.stringify(filtersTab));
}