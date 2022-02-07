const Airtable = require('airtable');

const {
    apiKey,
    baseId
} = require('./config');

const base = new Airtable({apiKey: apiKey}).base(baseId);
const ordersBase = base('Orders');

module.exports = ordersBase;
