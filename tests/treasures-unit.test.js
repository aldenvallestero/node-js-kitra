const { treasures, money_values } = require('../models/index');
const { treasureFixtures } = require('./fixtures/treasures-fixture');
const { moneyValuesFixture } = require('./fixtures/money-values-fixture');
const { findTreasure } = require('../src/controllers/treasure-controller');

describe('Treasure', () => {
  test('Should send a status code of 200 when treasures found', async () => {
    jest.spyOn(treasures, 'findAll').mockImplementationOnce(() => {
      return treasureFixtures;
    });

    jest.spyOn(money_values, 'findAll').mockImplementationOnce(() => {
      return moneyValuesFixture;
    });

    const request = {
      body: {
        latitude: 15,
        longitude: 121,
        distance: 10,
        prize_value: 30,
      }
    };

    const response = {
      status: jest.fn((x) => x),
      send: jest.fn((x) => x),
    };

    await findTreasure(request, response)
    expect(response.status).toHaveBeenCalledWith(200)
  });
});