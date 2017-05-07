class LifeBar {
  constructor() {
    this.currLife = 1000;
  }

  addLife(boost) {
    this.currLife += boost;
  }
}

export default LifeBar;
