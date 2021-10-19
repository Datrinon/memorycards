class GameManager {
  #types;
  #timeElapsed;
  #levelStartTime;
  levels;
  currentLevel;
  timeForCurrentLevel;
  score;
  timePerCard;
  didPlayerWin;
  levelPassed;
  gameStarted;

  /**
   * Create a game manager. Provide the constructor how much time should be 
   * allotted per card, plus what levels should be played (or you can leave
   * this blank to have a default 5 levels of [3, 4, 6, 9, 12])
   * 
   * @param {integer[]} levels - The number of levels to play; each element
   * represents the number of memory cards that have to be matched.
   * @param {integer} timePerCard - The number of seconds the player has to match
   * a card.
   */
  constructor(timePerCard = 8, levels = [3, 4, 6, 9, 12]) {
    this.#types = ["biryani", "burger", "butter-chicken", "dessert", "dosa",
      "idly", "pasta", "pizza", "rice", "samosa"];
    this.#timeElapsed = 0;
    this.score = 0; 
    this.currentLevel = 0;
    this.hasGameEnded = false;
    this.levels = levels;
    this.timePerCard = timePerCard;
    this.gameStarted = false;
  }

  get timeElapsed() {
    return this.#timeElapsed;
  }

  /**
   * Generates a number of topics for use on the memory cards. Ideally,
   * we pass these off to the API when we fetch data in a hook.
   * @returns {string[]} array of valid topics to give to the API to fetch images of.
   */
  generateMemoryCardTypesForCurrentLevel() {
    let currentLevelTypes = [];
    let i = 0;

    while (i < this.levels[this.currentLevel]) {
      let index = Math.round(Math.random() * (this.#types.length - 1));
      console.log(index);
      
      if (currentLevelTypes.includes(this.#types[index])) {
        continue;
      } else {
        currentLevelTypes.push(this.#types[index]);
        i++;
      }
    }

    return currentLevelTypes;
  }

  // TODO
  // Whenever the game starts, record the start time to calculate time elapsed.
}

export default GameManager;
