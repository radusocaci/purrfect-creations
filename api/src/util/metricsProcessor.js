const logger = require('./logger');

const LAST_MONTH_IN_YEAR = 11;

const computeOrderStatusMetrics = (order, metrics) => {
    switch (order.order_status) {
        case 'cancelled':
            metrics.orderStatus.cancelled++;
            break;
        case 'shipped':
            metrics.orderStatus.shipped++;
            break;
        case 'in_progress':
            metrics.orderStatus.inProgress++;
            break;
        case 'placed':
            metrics.orderStatus.placed++;
            break;
        default:
            console.error('Order status parameter not recognised.');
    }
};

const computeOrderCountAndRevenueMetrics = (order, metrics, lastMonthYear, lastMonthMonth, lastEntryYear, lastEntryMonth) => {
    metrics.nrOrders++;
    metrics.totalRevenue += order.price;

    const orderPlacedDate = new Date(order.order_placed);
    const orderPlacedYear = orderPlacedDate.getFullYear();
    const orderPlacedMonth = orderPlacedDate.getUTCMonth();

    if (orderPlacedYear === lastEntryYear &&
        orderPlacedMonth === lastEntryMonth) {
        metrics.nrOrdersThisMonth++;
        metrics.revenueThisMonth += order.price;
        return;
    }

    if (orderPlacedYear === lastMonthYear &&
        orderPlacedMonth === lastMonthMonth) {
        metrics.nrOrdersPrevMonth++;
        metrics.revenuePrevMonth += order.price;
        return;
    }

    const prevMonthYear = (orderPlacedMonth !== 0) ? lastMonthYear : lastMonthYear - 1;
    const prevMonth = (orderPlacedMonth !== 0) ? lastMonthMonth - 1 : LAST_MONTH_IN_YEAR;

    if (orderPlacedYear === prevMonthYear &&
        orderPlacedMonth === prevMonth) {
        metrics.nrOrdersPrevPrevMonth++;
        metrics.revenuePrevPrevMonth += order.price;
    }
};

const processMetricsFromOrder = (order, metrics, lastMonthYear, lastMonthMonth, lastEntryYear, lastEntryMonth) => {
    computeOrderStatusMetrics(order, metrics);
    computeOrderCountAndRevenueMetrics(order, metrics, lastMonthYear, lastMonthMonth, lastEntryYear, lastEntryMonth);
};

const generateOrdersMetricsAsJson = (orders) => {
    const metrics = {
        totalRevenue: 0,
        nrOrders: 0,
        nrOrdersThisMonth: 0,
        nrOrdersPrevMonth: 0,
        nrOrdersPrevPrevMonth: 0,
        revenueThisMonth: 0,
        revenuePrevMonth: 0,
        revenuePrevPrevMonth: 0,
        orderStatus: {
            inProgress: 0,
            placed: 0,
            shipped: 0,
            cancelled: 0
        },
        lastOrders: []
    };

    if (!orders.length) {
        logger.error('There are no orders in the database');
        return metrics;
    }

    metrics.lastOrders = (orders.length < 6) ? Array.from(orders) : Array.from(orders.slice(0, 5));

    const lastEntryDate = new Date(orders[0].order_placed);
    const lastEntryYear = lastEntryDate.getFullYear();
    const lastEntrMonth = lastEntryDate.getUTCMonth();
    const lastMonthEntryYear = (lastEntryDate.getUTCMonth() === 0) ? lastEntryDate.getFullYear() - 1 : lastEntryDate.getFullYear();
    const lastMonthEntryMonth = (lastEntryDate.getUTCMonth() === 0) ? LAST_MONTH_IN_YEAR : lastEntryDate.getUTCMonth() - 1;

    logger.info(`Processing order metrics with last year=${lastEntryYear} and last month=${lastEntrMonth + 1}`);

    orders.forEach(order => {
        processMetricsFromOrder(order, metrics, lastMonthEntryYear, lastMonthEntryMonth, lastEntryYear, lastEntrMonth);
    });

    return metrics;
};

module.exports = {
    generateOrdersMetricsAsJson
};