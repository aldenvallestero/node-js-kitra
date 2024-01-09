const { treasures } = require('../../models/index');
const geolib = require('geolib');
const logger = require('../utils/logger-util');

class TreasureService {
  async #findTreasuresWithinDistance(latitude, longitude, distance, treasureList) {
    logger.info(`TreasureService.#findTreasuresWithinDistance: X-${latitude} | Y-${longitude} | D-${distance}km`)
    const nearbyTreasures = [];
    treasureList.map(i => {
      const rawDistance = geolib.getDistance({ latitude, longitude }, { latitude: i.latitude, longitude: i.longitude });
      const kmDistance = geolib.convertDistance(rawDistance, 'km');
      if (kmDistance <= distance) {
        nearbyTreasures.push(i);
      }
    })

    return nearbyTreasures;
  }

  async findTreasure({ latitude, longitude, distance }) {
    logger.info(`TreasureService.findTreasure: X-${latitude} | Y-${longitude} | D-${distance}km`);

    const treasureList = await treasures.findAll({ raw: true });

    const nearbyTreasures = await this.#findTreasuresWithinDistance(latitude, longitude, distance, treasureList);

    const message = nearbyTreasures.length > 0 ? 'Treasures Found!' : 'No Luck Today!';
    
    const result = {
      status: 200,
      data: {
        message,
        treasure: nearbyTreasures,
      }
    };

    return result;
  }
}

module.exports = TreasureService;
