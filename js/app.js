// Enemies our player must avoid
var Enemy = function([speed, lane]) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;
    this.x = -101;
    this.y = 58 + lane * 82;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt * 100;
    if(this.x > 505)
    {
        allEnemies[allEnemies.indexOf(this)] = new Enemy(getEnemyParameters());
    }
    if(this.checkCollisions()) {
        player = new Player();
        document.getElementById('score').innerText = '0';
    }
};

//This function checks collision
//When Enemy and Player are close to each other it returns true
Enemy.prototype.checkCollisions = function() {
    if(Math.abs(this.x - player.x) < 80 && Math.abs(this.y - player.y) < 20) return true;
    return false;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
function Player() {
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 380;
    this.score = 0;

    this.update = function () {
        this.checkIfWon();    
    };

    this.render = function () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    this.handleInput = function (key) {
        if(key === 'left')
        {
            this.x -= this.x < 101 ? 0 : 101;
        }
        else if(key === 'up')
        {
            this.y -= this.y < 10 ? 0 : 82;
        }
        else if(key === 'right')
        {
            this.x += this.x > 303 ? 0 : 101;
        }
        else if(key === 'down')
        {
            this.y += this.y > 360 ? 0 : 82;
        }
    };

    this.checkIfWon = function () {
        if(this.y < 10) {
            this.score++;
            document.getElementById('score').innerText = this.score;
            this.x = 202;
            this.y = 380;
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
for(let i = 0; i < 3; i++)
{
    allEnemies[i] = new Enemy(getEnemyParameters());
}
let player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    
    player.handleInput(allowedKeys[e.keyCode]);
});

//This function returns random Enemy parameters
//First parameter is Enemy speed factor
//Second parameter is Enemy lane
function getEnemyParameters() {
    let parameters = [Math.pow((2 - Math.random()), 2), Math.floor(Math.random() * 3)];
    return parameters;
}