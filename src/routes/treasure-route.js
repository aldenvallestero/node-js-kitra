const { Router } = require('express');
const { findTreasureValidation } = require('../validations/treasure-validation');
const { findTreasure } = require('../controllers/treasure-controller');
const router = Router()

router

  .get('/', findTreasureValidation, findTreasure);


module.exports = router;
