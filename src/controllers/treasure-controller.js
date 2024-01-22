const TreasureService = require('../services/treasure-service')

module.exports.findTreasure = async (req, res) => {
  const treasureService = new TreasureService();
  const result = await treasureService.findTreasure(req.body)
  res.status(result.status)
  res.send(result.data)
}

module.exports.createTreasure = async (req, res) => {
  const treasureService = new TreasureService()
  const result = await treasureService.createTreasure(req.body)
  res.status(result.status)
  res.send(result.data)
}
