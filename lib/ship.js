//remove hard-coded stuff
(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  };

  var Ship = window.Asteroids.Ship = function (game) {
    this.vel = [0, 0];
    this.radius = Ship.RADIUS;
    this.color = Ship.COLOR;
    this.game = game;
    this.pos = [Math.floor(Math.random()*1000), Math.floor(Math.random()*650)];
    window.Asteroids.MovingObject.call(this, this.pos, this.vel, 15, "green", this.game);
  };

  Ship.COLOR = "green"
  Ship.RADIUS = 15;

  window.Asteroids.Util.inherits(Ship, window.Asteroids.MovingObject);

  Ship.IMG = new Image();
  Ship.IMG.src = "lib/ship.jpg";

  Ship.prototype.draw = function(ctx) {
    ctx.drawImage(Ship.IMG, this.pos[0], this.pos[1], 70, 100);
  };

  Ship.prototype.relocate = function () {
    this.pos = [Math.floor(Math.random()*1000), Math.floor(Math.random()*650)];
    this.vel = [0, 0];
  };

  Ship.prototype.power = function(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };

  Ship.prototype.fireBullet = function() {
    if (this.vel === 0) {
      return;
    }
    var bullPos = this.pos.slice()
    var bullVel = this.vel.slice()
    var bullet = new window.Asteroids.Bullet(bullPos, bullVel, 5, "black", this.game);
    this.game.addBullet(bullet);
  };

  Ship.prototype.isWrappable = true;

})();
