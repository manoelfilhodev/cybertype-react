export class GameController {
  score = 0;
  addPoint() {
    this.score++;
  }
  reset() {
    this.score = 0;
  }
  getScore() {
    return this.score;
  }
}
