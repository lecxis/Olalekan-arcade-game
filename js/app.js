
var gameTime;
var checkTime=0;
let gameOverCount=1;
var score=0;
let scoreCount= document.querySelector('.score');

function updateTime(){
    checkTime++;
    if(checkTime<3){
        gameTime=0;
      }
    else{
      gameTime++;
    }
    document.querySelector('.seconds').innerText=gameTime;
  }

var timerInterval=null;// for storing the setInterval return value

// function to run the updates on the web page
function updateTimer(){
    if(gameOverCount<8){
        timerInterval=setInterval(updateTime,1000);
      }
}

updateTimer();

// function to update score
function updateScore(){
    scoreCount.innerText=score;
}

// function to increase score by 10 and upodate score
function addTenScore(){
    score+=10;
    updateScore();
}

// function to increase score by 2 and upodate score
function addTwoScore(){
    score+=2;
    updateScore();
}

// function to reset time and score
function reset(){
    score=0;
    gameTime=0;
    updateScore();
}

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x;
    this.y;
	  this.speed=2;
	  this.position=[this.x,this.y];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x<=510){
        this.x=this.x+(this.speed);
      }
    else{
        this.x=0;
    }
	  this.position=[this.x,this.y];
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // Variables applied to each of our instances go here,

    this.sprite = 'images/char-boy.png';
	// initial position of player is taken and stored
    this.x=200;
    this.y=440;
	  this.position=[this.x,this.y];
};

// keeps player in position for a while after reaching the top
function delayPlayer(obj){
    obj.y--;
    //console.log("player yx-" +obj.y);
}

// funtion to update player position
Player.prototype.update = function() {
// if players reaches the top delay player for a while
    if(this.y<=-60){
        var timerInterval =setInterval(delayPlayer(this),400);
        if (this.y==-64){
            alert("nice one");
            addTenScore();
            clearInterval(timerInterval);
// reset game and place player back at the starting position
            this.x=200;
            this.y=440;
          }
      }
    if (this.y>=40&&this.y<=240){
          addTwoScore();
        }
// ensure player does not cross the screen
    if(this.y>440){
          this.y=440;
        }
    if (this.x>400)
        this.x=400;
    if (this.x<0)
        this.x=0;
    this.position=[this.x,this.y];
};
// sends player to the beginning of the game
Player.prototype.dropped=function(){
    this.x=200;
    this.y=440;
}

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	  checkCollision();

};

// handles moves by the player
Player.prototype.handleInput = function(move) {

    switch (move){
        case 'left':
          this.x-=100;
        break;

        case 'right':
          this.x+=100;
        break;

        case 'up':
          this.y-=100;
        break;

        case 'down':
          this.y+=100;
        break;
      }
}

// Now instantiate your objects.
// instantiate enemy objects and set their positions
var enemy=new Enemy();
enemy.x=0;
enemy.y=50;
enemy.speed=10;

var enemy2=new Enemy();
enemy2.x=350;
enemy2.y=130;
enemy2.speed=4;


var enemy3=new Enemy();
enemy3.y=230;
enemy3.x=-200;

// Place all enemy objects in an array called allEnemies
const allEnemies=[enemy,enemy2,enemy3];

// Place the player object in a variable called player and instantiate player object
var player =new Player();

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

// function that checks to see if the player and enemy bugs are in close proximity
var checkPosition=function(player,enemy){
    var x=0;
    for(var i=0; i<player.length; i++){
        if(((Math.abs(player[i]-enemy[i]))<=35)){
            x++;
          }
        }

    if (x==2){
        alert("Busted!!!!!");
        playerDies();
      }
}

// function sends enemy and player bugs to check for collision
var checkCollision=function(){
      allEnemies.forEach(function(enemy) {
           checkPosition( player.position, enemy.position,);
        });
};

// reset the game
var playerDies=function(){
    player.dropped();
    reset();
}
