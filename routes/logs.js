/*
    route: api/logs
*/

const { Router } = require('express');
const router = Router();

const {
    getLoyalCustomers
} = require('../controllers/logs');

router.get('/loyalCustomers', getLoyalCustomers);

module.exports = router;