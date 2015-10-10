(function() {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = window.Asteroids.Asteroid = function(pos, game) {
    var vel = [Math.random(30), Math.random(30)];
    window.Asteroids.MovingObject.call(this, pos, vel, Asteroid.RADIUS, Asteroid.COLOR, game);
  };

  Asteroid.COLOR = "red";
  Asteroid.RADIUS = 50;

  window.Asteroids.Util.inherits(Asteroid, window.Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof window.Asteroids.Ship) {
      otherObject.relocate();
    }
  };
})();
