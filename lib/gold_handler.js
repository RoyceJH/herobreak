class GoldHandler {
  constructor() {
    this.gold = 0;
  }

  gold() {
    return this.gold;
  }

  updateGold() {
    $('.current-gold').text(`Gold: ${this.gold}`);
  }

  addGold(goldEarned) {
    this.gold += goldEarned;
    this.updateGold();
  }

  renderError() {
    $('.buy-errors').text('Not enough gold');
    setTimeout(()=> {
      $('.buy-errors').text('');
    }, 2000);
  }

  buy(cost) {
    if(this.gold >= cost) {
      this.gold -= cost;
      this.updateGold();
      return true;
    } else {
      this.renderError();
      return false;
    }
  }
}

export default GoldHandler;
