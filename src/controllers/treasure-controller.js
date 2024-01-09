const TreasureService = require('../services/treasure-service');

module.exports.findTreasure = async (req, res) => {
  const treasureService = new TreasureService();
  const result = await treasureService.findTreasure(req.body);
  return res.status(result.status).send(result.data);
}
