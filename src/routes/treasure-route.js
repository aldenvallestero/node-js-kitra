const { Router } = require('express')
const { findTreasureValidation, createTreasureValidation } = require('../validations/treasure-validation')
const { findTreasure, createTreasure } = require('../controllers/treasure-controller')
const router = Router()

router

  .get('/', findTreasureValidation, findTreasure)
  .post('/', createTreasureValidation, createTreasure)

module.exports = router
