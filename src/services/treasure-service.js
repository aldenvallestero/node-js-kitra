const geolib = require('geolib')
const logger = require('../utils/logger-util')
const MonetaryService = require('./monetary-service')
const { treasures, money_values } = require('../../models/index')

class TreasureService {
  constructor () {
    this.monetaryService = new MonetaryService()
  }

  async #findTreasuresWithinDistance (latitude, longitude, distance, treasureList) {
    logger.info(`TreasureService.#findTreasuresWithinDistance: X-${latitude} | Y-${longitude} | D-${distance}km`)
    const nearbyTreasures = []
    treasureList.map(i => {
      const rawDistance = geolib.getDistance({ latitude, longitude }, { latitude: i.latitude, longitude: i.longitude })
      const kmDistance = geolib.convertDistance(rawDistance, 'km')
      if (kmDistance <= distance) {
        logger.info(`${kmDistance} km detected!`)
        nearbyTreasures.push(i)
      }
    })

    return nearbyTreasures
  }

  async findTreasure ({ latitude, longitude, distance, prize_value = undefined }) {
    logger.info(`TreasureService.findTreasure: X-${latitude} | Y-${longitude} | D-${distance}km`)
    const treasureList = await treasures.findAll({ raw: true })
    const nearbyTreasures = await this.#findTreasuresWithinDistance(latitude, longitude, distance, treasureList)

    if (nearbyTreasures.length > 0) {
      const nearbyTreasureAmount = await this.monetaryService.extractTreasureValue(nearbyTreasures, prize_value)

      const message = nearbyTreasures.length > 0
        ? `Treasures Found! You Got $${nearbyTreasureAmount}`
        : 'No Luck Today!'

      return {
        status: 200,
        data: {
          message
        }
      }
    } else {
      return {
        status: 200,
        data: {
          message: 'No Luck Today!'
        }
      }
    }
  }

  async createTreasure (treasure) {
    logger.info('TreasureService.createTreasure')

    await treasures.create({
      id: treasure.id,
      latitude: treasure.latitude,
      longitude: treasure.longitude,
      name: treasure.name
    })

    const moneyValues = []

    treasure.prize_value.forEach(i => {
      moneyValues.push({ treasure_id: treasure.id, amt: i })
    })

    await money_values.bulkCreate(moneyValues)

    return {
      status: 200,
      data: {
        message: 'Treasure Added!'
      }
    }
  }
}

module.exports = TreasureService
