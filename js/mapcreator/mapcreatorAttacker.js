/**
 * Created by Gaben on 28/04/2016.
 */

/**
 * Idem aan attacker van gewone game
 */
var attackers = [];

function Attacker() {
    this.posX = level.startX;
    this.posY = level.startY;
    this.locX = (this.posX * map.tileSize) + map.tileSize / 2;
    this.locY = (this.posY * map.tileSize) + map.tileSize / 2;
    this.oldNow = Date.now();
    this.image = "dragon.png";
    this.scale = 0.8;
    this.direction = level.startDirection;
    this.hasChangedDirection = false;
}

Attacker.prototype.speed = map.tileSize * (map.tileSize / 40);

Attacker.prototype.changeDirection = function () {
    var board = level.board;
    var tile = tiles[board[this.posY][this.posX]];
    this.hasChangedDirection = true;
    tile.changeDirection(this);
};

Attacker.prototype.updatePosOnBoard = function () {
    var newPosX = Math.floor(this.locX / map.tileSize);
    var newPosY = Math.floor(this.locY / map.tileSize);
    if (newPosX != this.posX || newPosY != this.posY) {
        this.hasChangedDirection = false;
        this.posX = newPosX;
        this.posY = newPosY;
    }
};

Attacker.prototype.updatePosition = function () {
    this.updatePosOnBoard(); // dit moet zeker gebeuren !!!!
    var now = Date.now();
    var timeDelta = now - this.oldNow;
    this.oldNow = now;

    var speed = this.speed * timeDelta / 1000;

    if (getValueFromPos(this.locX, this.locY) == null || getValueFromPos(this.locX, this.locY) == 0) {
        deleteAttacker(this);
    } else {
        if (isInMiddleOfSquare(this)) {
            if (!this.hasChangedDirection) {
                this.changeDirection();
            }
        }
        this.move(speed);
    }
};

Attacker.prototype.move = function (speed) {
    if (this.direction === directions.up) {
        this.locY -= speed;
    } else if (this.direction === directions.right) {
        this.locX += speed;
    } else if (this.direction === directions.down) {
        this.locY += speed;
    } else if (this.direction === directions.left) {
        this.locX -= speed;
    }
};

Attacker.prototype.drawImage = function () {
    var sprite = new Image();
    sprite.src = "img/attackers/" + this.image;
    map.context.drawImage(sprite, (this.locX - map.tileSize / 2 + map.tileSize * (1 - this.scale) / 2), (this.locY - map.tileSize / 2 + map.tileSize * (1 - this.scale) / 2), (map.tileSize * this.scale), (map.tileSize * this.scale));
};

function drawAttackers() {
    for (var i = 0; i < attackers.length; i++) {
        attackers[i].drawImage();
    }
}

function addAttacker() {
    attackers.push(new Attacker());
}

function deleteAttacker(attacker) {
    var index = attackers.indexOf(attacker);
    attackers.splice(index, 1);
}