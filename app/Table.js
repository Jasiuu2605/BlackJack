export class Table {
  constructor(playersCards, dealersCards) {
    this.dealersCards = dealersCards;
    this.playersCards = playersCards;
  }

  showPlayersCard(card) {
    this.playersCards.appendChild(card.render());
  }

  showDealersCard(card) {
    this.dealersCards.appendChild(card.render());
  }
}
