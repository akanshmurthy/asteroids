(function() {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = window.Asteroids.GameView = function(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.gameMusic = document.getElementById("game-music");

  };

  GameView.prototype.start = function () {
    this.bindKeyHandlers();
    window.intervalId = setInterval(function() {
      this.game.step();
      this.game.draw(this.ctx);
    }.bind(this), 20);
    this.gameMusic.load();
    this.gameMusic.play();
    this.gameMusic.volume = 0.5;
  };

  GameView.prototype.bindKeyHandlers = function () {
    var that = this;
    window.key('up', function() { that.game.ship.power(); });
    window.key('down', function() { that.game.ship.brake(); });
    window.key('left', function() { that.game.ship.counterClockwiseRotate(); });
    window.key('right', function() { that.game.ship.clockwiseRotate(); });
    window.key('space', function() { that.game.ship.fireBullet(); });
  };

})();
