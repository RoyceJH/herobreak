class LifeBar {
  constructor() {
    this.maxLife = 1000;
    this.currLife = this.maxLife;
    this.pos = [0, 680];
  }

  addLife(boost) {
    this.currLife += boost;
  }

  loseLife(dmg) {
    this.currLife -= dmg;
  }

  drawMax(ctx) {
    ctx.fillStyle = 'rgb(255, 255, 255)';
    ctx.beginPath();
    ctx.rect(this.pos[0], this.pos[1], ctx.canvas.width, 20);
    ctx.fill();
    ctx.stroke();
  }

  drawCurr(ctx) {
    ctx.fillStyle = 'rgb(238, 218, 85)';
    ctx.beginPath();
    let percentage = this.currLife / this.maxLife;
    ctx.rect(this.pos[0], this.pos[1], percentage * ctx.canvas.width, 20);
    ctx.fill();
    ctx.stroke();
  }

  drawText(ctx) {
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.beginPath();
    ctx.fillText(`${this.currLife} / ${this.maxLife} `, 195, 696.5, 150);
    ctx.stroke();
  }

  draw(ctx) {
    this.drawMax(ctx);
    this.drawCurr(ctx);
    this.drawText(ctx);
  }
}

export default LifeBar;
