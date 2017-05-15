class GoldHandler {
  constructor() {
    this.gold = 0;
    this.updateGold();
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

  renderError(cost) {
    $('.buy-errors').text(`Need ${cost} gold to purchase.`);
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
      this.renderError(cost);
      return false;
    }
  }
}

export default GoldHandler;
