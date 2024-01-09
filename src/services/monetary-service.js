const { money_values } = require('../../models/index');
const logger = require('../utils/logger-util');

class MonetaryService {
  async #filterTreasureValuesById(moneyValuesList, nearbyTreasures, prize_value) {
    logger.info(`MonetaryService.#filterTreasureValuesById`);
    const moneyValues = [];

    if (prize_value) {
      await moneyValuesList.forEach(i => {
        nearbyTreasures.forEach(j => {
          if (i.treasure_id === j.id && i.amt >= prize_value) {
            moneyValues.push(i.amt);
          }
        })
      })

      return Math.min(...moneyValues);
    }

    await moneyValuesList.forEach(i => {
      nearbyTreasures.forEach(j => {
        if (i.treasure_id === j.id) {
          moneyValues.push(i.amt);
        }
      })
    })

    return Math.min(...moneyValues);
  }

  async extractTreasureValue(nearbyTreasures, prize_value) {
    logger.info(`MonetaryService.extractTreasureValue`);
    
    const moneyValuesList = await money_values.findAll({ raw: true });

    let moneyValues = await this.#filterTreasureValuesById(moneyValuesList, nearbyTreasures, prize_value);

    return moneyValues;
  }
}

module.exports = MonetaryService;
