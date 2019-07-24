var filtersTab = {};
$(function() {
    filtersTab = {};    



});

function navigationGoTo(url){
    window.location.href = url;
}

function filterChange(filters){

    filtersTab[filters] = [];

    $('#' + filters).val().map(function (data) {
        filtersTab[filters].push(data)
    });

    $.post( window.location.href, { filters : JSON.stringify(filtersTab)} ).done(function(result){
        var obj = $.parseHTML($('#partsTabHeader').html());
        var keyOrder = [];
        obj.map((p) => {
            if ( p.childNodes.length > 0 ){
                keyOrder.push(p.childNodes[0].textContent);
            }
            
        })
        var parts = JSON.parse(result).parts;
        var html = "";
        parts.map((p)=>{
            html += "<tr>";
            keyOrder.map((k)=>{
                
                if ( k == "#" ){
                    html += "<th>";
                    html += p.product_reference.toString();
                    html += "</th>";
                } else if ( k == "Designation" ){
                    html += "<td>";
                    html += p.title.toString();
                    html += "</td>";
                } else {
                    html += "<td>";
                    html += ((p[k] == undefined || p[k].length == 0 ) ? "" : p[k].toString());
                    html += "</td>";
                }

                
            });
            html += "</tr>";
        })
        $('#partsTabBody').html(html);
        console.log();
    }).fail(function(){
        alert("failed")
    })
}