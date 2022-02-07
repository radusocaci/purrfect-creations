const router = require('express').Router();
const {getOrdersDetails} = require('./handlers/orders');

router.get('/orders-data', getOrdersDetails);

module.exports = router;