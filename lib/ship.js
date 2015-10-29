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
    // this.pos = [Math.floor(Math.random()*900), Math.floor(Math.random()*550)];
    this.pos = [0, 0]
    window.Asteroids.MovingObject.call(this, this.pos, this.vel, 15, "green", this.game);
    this.shootSound = document.getElementById("shoot");
  };

  Ship.COLOR = "green"
  Ship.RADIUS = 15;

  window.Asteroids.Util.inherits(Ship, window.Asteroids.MovingObject);

  Ship.IMG = new Image();
  Ship.IMG.src = "lib/ship.png";

  Ship.prototype.draw = function(ctx) {
    this.ctx = ctx;
    ctx.drawImage(Ship.IMG, this.pos[0], this.pos[1], 100, 100);
  };

  Ship.prototype.relocate = function () {
    this.game.lives -= 1;

    if (this.game.lives > 0) {
      // this.pos = [Math.floor(Math.random()*900), Math.floor(Math.random()*550)];
      this.pos = [0, 0];
      this.vel = [0, 0];
    } else {
      this.game.gameOver();
    }

  };

  Ship.prototype.power = function(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };

  Ship.prototype.fireBullet = function() {
    this.shootSound.load();
    this.shootSound.play();
    this.shootSound.volume = 0.25;
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
