class Bullet {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.r = 2;
    this.g = 0.1;

    this.vx = 20;
    this.vy = 0;

    new Audio("audio/shoot.wav").play();
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
  }

  move() {
    this.vy += this.g;
    this.x += this.vx;
    this.y += this.vy;
  }

  isVisible() {
    return this.x + this.r < this.ctx.canvas.width;
  }
}
