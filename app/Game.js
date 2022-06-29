import { Deck } from "./Deck.js";
import { Message } from "./Message.js";
import { Player } from "./Player.js";
import { Table } from "./Table.js";

class Game {
  constructor({
    player,
    playersPoints,
    dealersPoints,
    table,
    hitButton,
    standButton,
    messageBox,
  }) {
    this.hitButton = hitButton;
    this.standButton = standButton;
    this.playersPoints = playersPoints;
    this.dealersPoints = dealersPoints;
    this.messageBox = messageBox;
    this.table = table;
    this.player = player;
    this.dealer = new Player("Krupier");
    this.deck = new Deck();
    this.deck.shuffle();
  }

  run() {
    this.hitButton.addEventListener("click", (event) => {
      this.hitCard();
    });
    this.standButton.addEventListener("click", (event) => {
      this.dealerPlays();
      console.log("działa");
    });
    this.dealCards();
  }

  hitCard() {
    const card = this.deck.pickOne();
    this.player.hand.addCard(card);
    this.table.showPlayersCard(card);
    this.playersPoints.innerHTML = this.player.calculatePoints();
  }

  dealCards() {
    for (let n = 0; n < 2; n++) {
      let card1 = this.deck.pickOne();
      this.player.hand.addCard(card1);
      this.table.showPlayersCard(card1);

      let card2 = this.deck.pickOne();
      this.dealer.hand.addCard(card2);
      this.table.showDealersCard(card2);
    }

    this.playersPoints.innerHTML = this.player.calculatePoints();
    this.dealersPoints.innerHTML = this.dealer.calculatePoints();

    // console.log(player.hand.cards);
    // console.log(dealer.hand.cards);
  }

  dealerPlays() {
    while (
      this.dealer.points <= this.player.points &&
      this.dealer.points <= 21 &&
      this.player.points <= 21
    ) {
      const card = this.deck.pickOne();
      this.dealer.hand.addCard(card);
      this.table.showDealersCard(card);
      this.dealersPoints.innerHTML = this.dealer.calculatePoints();
    }

    this.endTheGame();
  }

  endTheGame() {
    this.hitButton.removeEventListener("click", (event) => {
      this.hitCard();
    });
    this.standButton.removeEventListener("click", (event) => {
      this.dealerPlays();
    });

    this.hitButton.style.display = "none";
    this.standButton.style.display = "none";

    if (this.player.points < 21 && this.player.points == this.dealer.points) {
      this.messageBox.setText("Remis").show();
      return;
    }
    if (this.player.points > 21) {
      this.messageBox.setText("Wygrywa dealer").show();
      return;
    }
    if (this.dealer.points > 21) {
      this.messageBox.setText("Wygrywa Player").show();
      return;
    }
    if (this.player.points < this.dealer.points) {
      this.messageBox.setText("wygrywa dealer").show();
    }
  }
}

const table = new Table(
  document.getElementById("playersCards"),
  document.getElementById("dealersCards")
);
const messageBox = new Message(document.getElementById("message"));
const player = new Player("Janek");
const game = new Game({
  hitButton: document.getElementById("hit"),
  standButton: document.getElementById("stand"),
  dealersPoints: document.getElementById("dealersPoints"),
  playersPoints: document.getElementById("playersPoints"),
  player,
  table,
  messageBox,
});

game.run();
