(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Alien = Asteroids.Alien = function(pos){
    Asteroids.MovingObject.call(this, pos, [-5, 0], Alien.RADIUS, Alien.COLOR, Alien.IMAGE);
    this.bullets = [];
        
    this.bulletTime = setInterval(this.fireBullet.bind(this), 500);
    
    this.moveTime = setInterval(this.randomMove.bind(this), 700);
    
  };

  Alien.RADIUS = 20;
  Alien.COLOR = "red";
  Alien.IMAGE = './alien.png';
  Alien.LASER_SOUND = new Audio('popeye_laser.mp3');
  Alien.POWER_SOUND = new Audio('popeye_ship_power.mp3')

  Alien.inherits(Asteroids.MovingObject);

  Alien.prototype.power = function(impulse){
    this.vel = impulse;
    Alien.POWER_SOUND.play();
  };

  Alien.prototype.fireBullet = function () {
    var alien = this;
    var bulletPos = [alien.pos[0], alien.pos[1]];
    alien.bullets.push(new Asteroids.Bullet(bulletPos, [-10, 0], 'green'));
    // debugger
    Alien.LASER_SOUND.play();
  };
  
  Alien.prototype.randomMove = function () {
    var alien = this;
    var coin = Math.floor(Math.random() * 3);
    
    if (coin == 0) {
      alien.power([-5, 0]);
    } else if (coin == 1) {
      alien.power([0, -5]);
    } else if (coin == 2) {
      alien.power([0, 5]);
    }
  };
  
  Alien.prototype.stop = function () {
    clearInterval(this.bulletTime);
    clearInterval(this.moveTime);
  }

})(this);