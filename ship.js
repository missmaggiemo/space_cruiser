(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Ship = Asteroids.Ship = function(pos){
    Asteroids.MovingObject.call(this, pos, [0, 0], Ship.RADIUS, Ship.COLOR, Ship.IMAGE);
    this.bullets = [];
  };

  Ship.RADIUS = 20;
  Ship.COLOR = "white";
  Ship.IMAGE = './ship.png';

  Ship.inherits(Asteroids.MovingObject);

  Ship.prototype.power = function(impulse){
    this.vel = impulse;
  };

  Ship.prototype.fireBullet = function () {
    var bulletPos = [this.pos[0] + this.radius, this.pos[1]]
    this.bullets.push(new Asteroids.Bullet(bulletPos));
  }

})(this);