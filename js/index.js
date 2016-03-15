/**
 * Created by Bastien on 3/12/2015.
 */

var disqus_config = function () {
    this.page.url = "http://bverschaete.github.io/";  // Replace PAGE_URL with your page's canonical URL variable
    this.page.identifier = ""; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
};

function setup() {
    makeAnimation();
    useDisqus();
}

function makeAnimation(){
    var stage = new createjs.Stage("demoCanvas");
    var health = new createjs.Shape();
    health.graphics.beginFill("Green").drawRect(0, 20, 100, 10);
    var monster = new createjs.Bitmap("/WebStormGame/img/monsterSprite.png");
    monster.x = 0;
    monster.y = 50;
    stage.addChild(monster);
    stage.addChild(health);
    createjs.Tween.get(monster, {loop: true})
        .to({x: 400}, 1000)
        .to({y: 450}, 1250)
        .to({x: 0}, 1000);
    createjs.Tween.get(health, {loop: true})
        .to({x: 400}, 1000)
        .to({y: 400}, 1250)
        .to({x: 0}, 1000);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", stage);
}

function useDisqus() {  // REQUIRED CONFIGURATION VARIABLE: EDIT THE SHORTNAME BELOW
    var d = document, s = d.createElement('script');

    s.src = '//webdesigngame.disqus.com/embed.js';  // IMPORTANT: Replace EXAMPLE with your forum shortname!

    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
}


window.addEventListener("load", setup);