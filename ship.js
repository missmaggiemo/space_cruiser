(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Ship = Asteroids.Ship = function(pos){
    Asteroids.MovingObject.call(this, pos, [0, 0], Ship.RADIUS, Ship.COLOR, Ship.IMAGE);
    this.bullets = [];
    this.canShoot = true;
  };

  Ship.RADIUS = 20;
  Ship.COLOR = "white";
  Ship.IMAGE = './ship.png';
  Ship.LASER_SOUND = new Audio('popeye_laser.mp3');
  Ship.POWER_SOUND = new Audio('popeye_ship_power.mp3')

  Ship.inherits(Asteroids.MovingObject);

  Ship.prototype.power = function(impulse){
    this.vel = impulse;
    Ship.POWER_SOUND.play();
  };

  Ship.prototype.fireBullet = function () {
    var ship = this;
    if (ship.canShoot) {
      var bulletPos = [ship.pos[0] + ship.radius, ship.pos[1]];
      ship.bullets.push(new Asteroids.Bullet(bulletPos));
      Ship.LASER_SOUND.play();
      ship.canShoot = false;
      setTimeout( function (event) {   
        ship.canShoot = true;
      }, 100);
    }
  }

})(this);