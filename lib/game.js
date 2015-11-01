(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = window.Asteroids.Game = function (x, y, numAsteroids) {
    this.x = x;
    this.y = y;
    this.numAsteroids = numAsteroids;
    this.asteroids = [];
    this.bullets = [];
    this.addAsteroids(numAsteroids);
    this.ship = new window.Asteroids.Ship(this);
    this.lives = 3;
    this.over = false;
    this.addDementors = setInterval(this.dementorSeeding.bind(this), 10000);
  };

  Game.WIDTH = 900;
  Game.HEIGHT = 550;
  Game.BACKGROUND = new Image();
  Game.BACKGROUND.src = "lib/hogwarts.jpg"

  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < this.numAsteroids; i++) {
      var pos = [ Math.floor(Math.random()*Game.WIDTH), Math.floor(Math.random()*Game.HEIGHT) ];
      this.asteroids.push(new window.Asteroids.Asteroid(pos, this));
    }
  };

  Game.prototype.dementorSeeding = function () {
    if (this.asteroids.length === 3) {
      this.addAsteroids(1);
    } else if (this.asteroids.length === 2) {
      this.addAsteroids(2);
    } else if (this.asteroids.length === 1) {
      this.addAsteroids(3);
    } else if (this.asteroids.length === 0) {
      this.addAsteroids(4);
    }
  };

  Game.prototype.allObjects = function() {
    return this.asteroids.concat(this.bullets).concat(this.ship);
  };

  Game.prototype.draw = function (ctx) {
    this.ctx = ctx;

    ctx.clearRect(0, 0, Game.WIDTH, Game.WIDTH);
    ctx.drawImage(Game.BACKGROUND, 0, 0);
    (this.allObjects()).forEach(function(element) {
       element.draw(ctx);
    });
    this.drawLives(ctx);
  };

  Game.prototype.drawLives = function (ctx) {
    ctx.font = "24px inconsolata";
    ctx.fillStyle = "white";
    ctx.fillText("Lives: " + this.lives, 30, 535);
  };

  Game.prototype.moveObjects = function () {
    (this.allObjects()).forEach(function(element) {
      element.move();
    });
  };

  Game.prototype.wrap = function (pos) {
    if (pos[0] > Game.WIDTH) {
      return [0, pos[1]];
    } else if (pos[0] < 0) {
      return [Game.WIDTH, pos[1]];
    } else if (pos[1] > Game.HEIGHT){
      return [pos[0], 0];
    } else if (pos[1] < 0) {
      return [pos[0], Game.HEIGHT];
    } else {
      return pos;
    }
  };

  Game.prototype.checkCollisions = function () {
    for (var i = 0; i < (this.allObjects()).length; i++) {
      for (var j = i + 1; j < (this.allObjects()).length; j++) {
        if ((this.allObjects())[i].isCollidedWith((this.allObjects())[j])) {
          (this.allObjects())[i].collideWith((this.allObjects())[j]);
        }
      }
    }
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.remove = function (element) {
    if (element instanceof Asteroids.Asteroid) {
      var indexAst = this.asteroids.indexOf(element);
      this.asteroids.splice(indexAst, indexAst + 1);
    } else if (element instanceof Asteroids.Bullet) {
      var indexBull = this.bullets.indexOf(element);
      this.bullets.splice(indexBull, indexBull + 1);
    }
  };

  Game.prototype.addBullet = function(bullet) {
    this.bullets.push(bullet);
  };

  Game.prototype.isOutOfBounds = function(pos) {
    if (pos[0] > Game.WIDTH || pos[1] > Game.HEIGHT || pos[0] < 0 || pos[1] < 0){
      return true;
    } else {
      return false;
    }
  };

  Game.prototype.gameOver = function () {
    window.clearInterval(window.intervalId);
    this.ctx.clearRect(0, 0, Game.WIDTH, Game.HEIGHT)
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, Game.WIDTH, Game.HEIGHT);
    this.ctx.font = "72px inconsolata";
    this.ctx.fillStyle = "white";
    this.ctx.textAlign = "center";
    this.ctx.fillText("GAME OVER", 450, 300)
    this.ctx.font = "36px inconsolata";
    this.ctx.fillStyle = "white";
    this.ctx.textAlign = "center";
    this.ctx.fillText("Hit 'Enter' to play again", 450, 400)
  };
 })();
