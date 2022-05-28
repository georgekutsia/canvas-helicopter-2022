class Enemy {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = this.ctx.canvas.width;
    this.y = Math.random() * this.ctx.canvas.height;
    this.w = 0.2 * this.ctx.canvas.width;
    this.h = 0.2 * this.ctx.canvas.height;
    this.vx = -5;
  }

  draw() {
    const prevStyle = this.ctx.fillStyle;
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(this.x, this.y, this.w, this.h);
    this.ctx.fillStyle = prevStyle;
  }

  move() {
    this.x += this.vx;
  }

  isVisible() {
    return this.x + this.w > 0;
  }

  collides(player) {
    const colX =
      this.x <= player.x + player.w - 20 && this.x + this.w > player.x;
    const colY = this.y + this.h > player.y && this.y < player.y + player.h;

    return colX && colY;
  }
}
