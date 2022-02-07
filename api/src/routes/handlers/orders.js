const {getOrders} = require('../../dao/airtableApiClient');
const {generateOrdersMetricsAsJson} = require('../../util/metricsProcessor');
const logger = require('../../util/logger');

const getOrdersDetails = async (req, resp) => {
    logger.info('Retrieving order details from AirTable');

    const sortByOrderPlacedDesc = [{
        field: 'order_placed',
        direction: 'desc'
    }];

    const orders = await getOrders(sortByOrderPlacedDesc);

    const metrics = generateOrdersMetricsAsJson(orders);

    logger.info(`Order metrics generated successfully: ${JSON.stringify(metrics)}`);

    return resp.json(metrics);
};

module.exports = {
    getOrdersDetails
};