/**
 * Created by Bastien on 18/03/2016.
 */
//javascript nodig bij alle pages

function setup(){
    loadNavBar();
}

//loads navbar code to HTML page, removes repeated navbar code
function loadNavBar(){
    $('<div/>').attr("id", "navbar").prependTo("body");
    $('#navbar').load("repeatedHTML/navbar.html");
}

$(window).load(setup);