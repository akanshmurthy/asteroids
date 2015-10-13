(function () {

  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var MovingObject = window.Asteroids.MovingObject = function(pos, vel, radius, color, game) {
    this.pos = pos;
    this.vel = vel;
    this.radius = radius;
    this.color = color;
    this.game = game;
  };

  MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

  };

  MovingObject.prototype.move = function () {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    if (this.game.isOutOfBounds(this.pos) && this.isWrappable) {
      this.pos = this.game.wrap(this.pos);
    } else {
      this.remove();
    }

  };

  MovingObject.prototype.isCollidedWith = function(otherObject) {
    var xCoords = Math.pow((this.pos[0] - otherObject.pos[0]), 2);
    var yCoords = Math.pow((this.pos[1] - otherObject.pos[1]), 2);
    var dist = Math.sqrt(xCoords + yCoords);
    var radSum = this.radius + otherObject.radius;

    if (dist < radSum) {
      return true;
    } else {
      return false;
    }
  };

  MovingObject.prototype.collideWith = function(otherObject) {

  };

  MovingObject.prototype.remove = function() {
    this.game.remove(this);
  };

  MovingObject.prototype.isWrappable = true;

 })();
