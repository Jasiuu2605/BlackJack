export class Hand {
  constructor() {
    this.cards = [];
  }

  addCard(card) {
    this.cards.push(card);
  }

  countCardsByWeight(weight) {
    return this.cards.filter((card) => card.weight == weight).length;
  }

  getStrength() {
    if (this.countCardsByWeight("A") == 2 && this.cards.length == 2) {
      return 21;
    }

    const cards = this.cards.map((card) => {
      if (["K", "Q", "J"].includes(card.weight)) {
        return 10;
      }
      if (this.cards.length == 2 && card.weight == "A") {
        return 11;
      }
      if (this.cards.length > 2 && card.weight == "A") {
        return 1;
      }
      return parseInt(card.weight);
    });

    return cards.reduce((sum, weight) => {
      return parseInt(sum) + parseInt(weight);
    });
  }
}
