/**
 * Created by Gaben on 24/03/2016.
 */
var scoreboardXML;

function setup(){
    scoreboardXML = (loadXMLDoc("scoreboard.xml"));
    addTable();
}

function loadXMLDoc(name) {
    var xmlDoc;

    try {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('GET', name, false);
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        xmlhttp.send('');
        xmlDoc = xmlhttp.responseXML;
    } catch (e) {
        try {
            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        } catch (e) {
            console.error(e.message);
        }
    }
    return xmlDoc;
}

function addTable(){
    var $table = $("table");

    for(var i = 0; i < scoreboardXML.getElementsByTagName("score").length; i++){
        var childNode = scoreboardXML.getElementsByTagName("score")[i];
        var $tr = $("tr");
        var $td = $("td");
        $tr.append($td.html(childNode.getElementsByTagName("speler")[0].childNodes[0].nodeValue));
        $table.append($tr);
    }
    $(document.body).append($table);
}

$(window).load(setup);