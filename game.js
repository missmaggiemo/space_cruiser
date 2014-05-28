(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Game = Asteroids.Game = function(ctx){
    this.ctx = ctx;
    this.FPS = 30;
    this.asteroids = [];
    this.ship = new Asteroids.Ship([Game.DIM_X / 5, Game.DIM_Y / 2]);
  };


  
  // in index.html
  // Asteroids.Game.DIM_X = document.body.clientWidth;
  // Asteroids.Game.DIM_Y = document.body.clientHeight;
  
  Game.POINTS = 0;
  Game.GAME_OVER = new Audio('popeye_game_over.mp3');
  Game.DESTROY_ASTEROID = new Audio('popeye_asteroid.mp3')

  Game.SHIP_ENGINE = new Audio('popeye_ship_engine.mp3'); 
  
  Game.prototype.displayPoints = function () {
    document.getElementById('points').innerHTML = Game.POINTS;
  };

  Game.prototype.addAsteroids = function(nAsteroids){
    for(var i = 0; i < nAsteroids; i++){
      this.asteroids.push(Asteroids.Asteroid.prototype.randomAsteroid(Game.DIM_X, Game.DIM_Y));
    }
  };

  Game.prototype.removeOffBoardAsteroids = function() {
    var asteroids = this.asteroids;
    for (var i = 0; i < asteroids.length; i++) {
      if (asteroids[i].pos[0] < 0){
        asteroids.splice(i, 1);
      }
    }
  };

  Game.prototype.removeOffBoardBullets = function() {
    var bullets = this.ship.bullets;
    for (var i = 0; i < bullets.length; i++) {
      if (bullets[i].pos[0] > Game.DIM_X){
        bullets.splice(i, 1);
      }
    }
  };

  Game.prototype.resetShip = function () {
    var shipX = this.ship.pos[0];
    var shipY = this.ship.pos[1];


    if (shipX < 0 || shipX > Game.DIM_X || shipY < 0 || shipY > Game.DIM_Y) {
      this.ship.pos[0] = Game.DIM_X / 5;
      this.ship.pos[1] = Game.DIM_Y / 2;
    }
  };

  Game.prototype.checkCollisions = function () {
    var asteroids = this.asteroids;
    for(var i = 0; i < asteroids.length; i++){
      if(asteroids[i].isCollidedWith(this.ship)){
        document.getElementById('death').style.display = 'block';
        Game.GAME_OVER.play();
        this.stop();
      }
    }
  };

  Game.prototype.removeHitAsteroids = function(){
    var bullets = this.ship.bullets;
    var asteroids = this.asteroids;
    for(var i = 0; i < bullets.length; i++){
      for(var j = 0; j < asteroids.length; j++){
        if (bullets[i].hitAsteroids(asteroids[j])){
          var velPoints = Math.round(asteroids[j].vel[0] * -20);
          asteroids.splice(j, 1);
          bullets.splice(i, 1);
          Game.DESTROY_ASTEROID.play();
          Game.POINTS = Game.POINTS + velPoints;
        }
      }
    }
  };

  Game.prototype.outOfBounds = function () {
    this.removeOffBoardAsteroids();
    this.removeOffBoardBullets();
    this.resetShip();
  }

  Game.prototype.bindKeyHandlers = function(){
   
    var ship = this.ship;

    window.addEventListener('keydown', function (event) {
      var key = event.keyCode;
      if (key == 39) {
        ship.power([5, 0]);
      } else if (key == 37) {
        ship.power([-5, 0]);
      } else if (key == 38) {
        ship.power([0, -5]);
      } else if (key == 40) {
        ship.power([0, 5]);
      } else if (key == 32) {
        ship.fireBullet();
      }
    });
  }

  Game.prototype.stop = function(){
    clearInterval(this.timerId);
    Game.SHIP_ENGINE.pause();
  };

  Game.prototype.draw = function(){
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.ship.draw(this.ctx);
    var asteroids = this.asteroids;
    for(var i = 0; i < asteroids.length; i++){
      asteroids[i].draw(this.ctx);
    }
    var bullets = this.ship.bullets;
    for(var i = 0; i < bullets.length; i++){
      bullets[i].draw(this.ctx);
    }
  };

  Game.prototype.move = function(){
    this.ship.move();
    var asteroids = this.asteroids;
    for(var i = 0; i < asteroids.length; i++){
      asteroids[i].move();
    }
    var bullets = this.ship.bullets;
    for(var i = 0; i < bullets.length; i++){
      bullets[i].move();
    }
  };

  Game.prototype.step = function(){
    this.move();
    this.outOfBounds();
    this.addAsteroids(Math.floor(Math.random() * 1.2));
    this.removeHitAsteroids();
    this.draw();
    this.checkCollisions();
    this.displayPoints();
  };

  Game.prototype.start = function(){
    var game = this;
    this.bindKeyHandlers();
    game.addAsteroids(10);
    
    Game.SHIP_ENGINE.addEventListener('ended', function() {
        this.play();
    }, false);
    
    Game.SHIP_ENGINE.play();
    
    this.timerId = setInterval(function(){
      game.step();
    }, game.FPS);
  };
})(this);