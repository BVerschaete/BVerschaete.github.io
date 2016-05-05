/**
 * Created by Bastien on 18/03/2016.
 */

/**
 * javascript nodig bij alle pages
 */
function setup(){
    loadNavBar();
}

/**
 * Zorgt dat op iedere pagina de navbar geladen wordt
 * Op deze manier wordt de herhaalde HTML code van de navbar.html uit de paginas verwijderd
 */
function loadNavBar(){
    $('<div/>').attr("id", "navbar").prependTo("body");
    $('#navbar').load("repeatedHTML/navbar.html");
}

$(window).load(setup);