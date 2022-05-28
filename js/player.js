class Player {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = 50;
    this.y = 100;
    // TODO: what else?
    this.w = 90;
    this.h = 40;

    this.vx = 0;
    this.vy = 0;

    this.ax = 0;
    this.ay = 0;
    this.g = 0.05;

    this.img = new Image();
    this.img.src = "./img/helicopter.png";
    this.img.frame = 0;

    this.tick = 0;

    this.bullets = [];
  }

  draw() {
    this.ctx.drawImage(
      this.img, //img
      0, //sx
      (this.img.frame * this.img.height) / 4, //sy
      this.img.width, //sw
      this.img.height / 4, //sh
      this.x, // dx
      this.y, // dy
      this.w, // dw
      this.h // dh
    );

    this.bullets.forEach((bullet) => {
      bullet.draw();
    });
  }

  move() {
    this.vy += this.ay;
    this.vy += this.g;

    this.vx += this.ax;

    this.x += this.vx;
    this.y += this.vy;

    this.tick++;

    if (this.tick > 10 && this.ay) {
      this.tick = 0;
      this.img.frame++;

      if (this.img.frame > 3) {
        this.img.frame = 0;
      }
    }

    this.bullets.forEach((bullet) => {
      bullet.move();
    });

    this.bullets = this.bullets.filter((b) => b.isVisible());

    if (this.y < 0) {
      this.y = 0;
      this.vy = 0;
    }

    if (this.y + this.h > this.ctx.canvas.height) {
      this.y = this.ctx.canvas.height - this.h;
      this.vy = 0;
    }

    if (this.x + this.w > this.ctx.canvas.width) {
      this.x = this.ctx.canvas.width - this.w;
      this.vx = 0;
    }

    if (this.x < 0) {
      this.x = 0;
      this.vx = 0;
    }
  }

  keyDown(key) {
    if (key === UP) {
      this.ay = -0.2;
    }

    if (key === RIGHT) {
      this.ax = 0.1;
    }

    if (key === LEFT) {
      this.ax = -0.1;
    }

    if (key === SPACE) {
      this.shoot();
    }
  }

  keyUp(key) {
    if (key === UP) {
      this.ay = 0;
    }

    if (key === RIGHT) {
      this.ax = 0;
    }

    if (key === LEFT) {
      this.ax = 0;
    }
  }

  shoot() {
    const bullet = new Bullet(
      this.ctx,
      this.x + this.w - 10,
      this.y + this.h - 5
    );

    this.bullets.push(bullet);
  }
}
