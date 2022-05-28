class Game {
  constructor(ctx) {
    this.ctx = ctx;

    this.player = new Player(ctx);
    this.bg = new Background(ctx);
    this.enemies = [];

    this.interval = null;

    this.setListeners();

    this.audio = new Audio("audio/music.mp3");
    this.tick = 0;
  }

  start() {
    this.audio.play();

    this.interval = setInterval(() => {
      this.clear();
      this.draw();
      this.move();
      this.checkCollisions();

      this.tick++;

      if (this.tick > Math.random() * 200 + 100) {
        this.tick = 0;
        this.addEnemy();
      }
    }, 1000 / 60);
  }

  stop() {
    this.audio.pause();
    clearInterval(this.interval);
    this.interval = null;
  }

  addEnemy() {
    const enemy = new Enemy(this.ctx);
    this.enemies.push(enemy);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.enemies = this.enemies.filter((e) => e.isVisible());
  }

  draw() {
    this.bg.draw();
    this.player.draw();
    this.enemies.forEach((e) => e.draw());
  }

  move() {
    this.player.move();
    this.bg.move();
    this.enemies.forEach((e) => e.move());
  }

  setListeners() {
    document.addEventListener("keydown", (e) => {
      this.player.keyDown(e.keyCode);
    });

    document.addEventListener("keyup", (e) => {
      this.player.keyUp(e.keyCode);
    });
  }

  checkCollisions() {
    this.enemies.forEach((e) => {
      if (e.collides(this.player)) {
        this.gameOver();
      }
    });
  }

  gameOver() {
    this.stop();
    this.ctx.fillText("GAME OVER", 100, 100);

    this.enemies = [];
    this.player = new Player(ctx);
  }
}
