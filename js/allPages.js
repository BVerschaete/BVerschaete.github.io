/**
 * Created by Bastien on 18/03/2016.
 */
//javascript nodig bij alle pages

function setup(){
    scroll();
    loadNavBar();
}

//speciale scroll/click-functionaliteit voor welkom-pagina, gebruikt van https://css-tricks.com/
function scroll() {
    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
}

//loads navbar code to HTML page, removes repeated navbar code
function loadNavBar(){
    $('<div/>').attr("id", "navbar").prependTo("body");
    $('#navbar').load("repeatedHTML/navbar.html");
}

$(window).load(setup);