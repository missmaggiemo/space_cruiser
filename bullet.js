(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Bullet = Asteroids.Bullet = function (pos) {
    Asteroids.MovingObject.call(this, pos, Bullet.VELOCITY, Bullet.LENGTH, Bullet.COLOR);
  };

  Bullet.VELOCITY = [10,0];
  Bullet.COLOR = 'red';
  Bullet.LENGTH = 10;
  Bullet.WIDTH = 4;

  Bullet.inherits(Asteroids.MovingObject);

  Bullet.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.pos[0], this.pos[1], Bullet.LENGTH, Bullet.WIDTH);
  }

  Bullet.prototype.hitAsteroids = function(asteroid){
    console.log('hitAsteroids');
    var minDist = asteroid.radius;
    var x1 = this.pos[0] + Bullet.LENGTH;
    var y1 = this.pos[1] + Bullet.WIDTH/2;
    var x2 = asteroid.pos[0];
    var y2 = asteroid.pos[1];
    var distance = Math.sqrt(
      Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)
    );
    return(minDist >= distance);
  }

})(this);