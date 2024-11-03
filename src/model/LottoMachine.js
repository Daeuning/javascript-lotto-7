import { GAME_RULES } from '../constants/gameRule.js';
import { getSortedRandomNumbers } from '../utils/game.js';
import validatePurchaseAmount from '../validators/PurchaseAmountValidator.js';
import Lotto from '../model/Lotto.js';

class LottoMachine {
  #purchaseAmount;
  #lottoCount;
  #lottoNumbers;

  constructor(purchaseAmount) {
    this.#validate(purchaseAmount);
    this.#purchaseAmount = Number(purchaseAmount);
    this.#lottoCount = this.#calculateLottoCount();
    this.#lottoNumbers = this.#generateLottoNumbers();
  }

  #validate(purchaseAmount) {
    validatePurchaseAmount(purchaseAmount);
  }

  #calculateLottoCount() {
    return this.#purchaseAmount / GAME_RULES.CURRENCY_UNIT;
  }

  #generateLottoNumbers() {
    return Array.from({ length: this.#lottoCount }, () => this.#createValidatedLottoNumbers());
  }

  #createValidatedLottoNumbers() {
    const numbers = getSortedRandomNumbers(1, 45, 6);
    const lotto = new Lotto(numbers); 
    return lotto.getNumbers(); 
  }

  getLottoCount() {
    return this.#lottoCount;
  }

  getLottoNumbers() {
    return this.#lottoNumbers;
  }
}

export default LottoMachine;
