(function() {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = window.Asteroids.Asteroid = function(pos, game) {
    var vel = [Math.random(30), Math.random(30)];
    window.Asteroids.MovingObject.call(this, pos, vel, Asteroid.RADIUS, Asteroid.COLOR, game);
    this.explodeSound = document.getElementById("explode");
  };

  Asteroid.COLOR = "red";
  Asteroid.RADIUS = 50;

  window.Asteroids.Util.inherits(Asteroid, window.Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof window.Asteroids.Ship) {
      this.explodeSound.load();
      this.explodeSound.play();
      this.explodeSound.volume = 0.25;
      otherObject.relocate();
    } else if (otherObject instanceof window.Asteroids.Bullet) {
      console.log("Asteroid collidewith");
      this.remove();
      otherObject.remove();
    }
  };

  Asteroid.IMG = new Image();
  Asteroid.IMG.src = "lib/asteroid.png";

  Asteroid.prototype.draw = function(ctx) {
    this.ctx = ctx;
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.drawImage(Asteroid.IMG, -10, -10, 100, 100);
    ctx.restore();
  };

})();
