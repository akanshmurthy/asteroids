(function() {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = window.Asteroids.GameView = function(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };

  GameView.prototype.start = function () {
    setInterval(function() {
      this.game.step();
      this.game.draw(this.ctx);
    }.bind(this), 20);
    this.bindKeyHandlers();
  };

  GameView.prototype.bindKeyHandlers = function () {
    var that = this;
    window.key('up', function() { that.game.ship.power([0,-1]); });
    window.key('down', function() { that.game.ship.power([0,1]); });
    window.key('left', function() { that.game.ship.power([-1,0]); });
    window.key('right', function() { that.game.ship.power([1,0]); });
    window.key('space', function() { that.game.ship.fireBullet(); });
  };

})();
