var express = require('express');
var router = express.Router();
const controllers = require('../Controllers/payments');

router.post('/createIntent',controllers.createIntent);

router.post('/confirmIntent',controllers.confirmIntent);

module.exports = router;