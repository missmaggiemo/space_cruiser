(function (root) {
  Function.prototype.inherits = function (obj) {
    function Surrogate () {};
    Surrogate.prototype = obj.prototype;
    this.prototype = new Surrogate ();
  }

 var Asteroids = root.Asteroids = (root.Asteroids || {});

  var MovingObject =
  Asteroids.MovingObject =
  function (pos, vel, radius, color, imageSrc) {
    this.pos = pos;
    // [x, y] center
    this.vel = vel;
    // [dx, dy]
    this.radius = radius;
    this.color = color;
    this.image = new Image();
    if (imageSrc != null) {
     this.image.src = imageSrc; 
    }
  };

  MovingObject.prototype.move = function () {
    if (this.vel == undefined) {
      console.log(this);
    }
    var pos = this.pos;
    var vel = this.vel;
    this.pos = [pos[0] + vel[0], pos[1] + vel[1]];
  };

  MovingObject.prototype.draw = function(ctx){
    var image = this.image;
    var pos = this.pos;
    var radius = this.radius;
    ctx.drawImage(image, pos[0] - radius, pos[1] - radius);
  };

  MovingObject.prototype.isCollidedWith = function(otherObj){
    var x1 = this.pos[0];
    var y1 = this.pos[1];
    var x2 = otherObj.pos[0];
    var y2 = otherObj.pos[1];
    var minDist = this.radius + otherObj.radius;

    var distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    return (minDist >= distance);
  };

})(this);