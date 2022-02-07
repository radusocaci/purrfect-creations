const ordersBase = require('../util/airtable');
const logger = require('../util/logger');

const getOrders = async (sort, fields, filterByFormula, maxRecords) => {
    return new Promise((resolve, reject) => {
        let orders = [];

        const processPage = (partialRecords, fetchNextPage) => {
            orders = [...orders, ...partialRecords];
            fetchNextPage();
        };

        const processOrders = (err) => {
            if (err) {
                reject(err);
            }

            resolve(orders.map(record => record.fields));
        };

        let params = {view: 'Grid view'};
        Object.assign(
            params,
            fields ? {fields: fields} : undefined,
            filterByFormula ? {filterByFormula: filterByFormula} : undefined,
            sort ? {sort: sort} : undefined,
            maxRecords ? {maxRecords: maxRecords} : undefined
        );

        logger.info(`Calling get all orders endpoint with params: ${JSON.stringify(params)}`);

        ordersBase.select(params).eachPage(processPage, processOrders);
    });
};

module.exports = {
    getOrders
};