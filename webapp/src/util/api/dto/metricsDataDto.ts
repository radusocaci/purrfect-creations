export interface OrderDto {
    order_id: number,
    order_placed: string,
    product_name: string,
    price: number,
    first_name: string,
    last_name: string,
    address: string,
    email: string,
    order_status: string
}

export interface MetricsDataDto {
    totalRevenue: number,
    nrOrders: number,
    nrOrdersThisMonth: number,
    nrOrdersPrevMonth: number,
    nrOrdersPrevPrevMonth: number,
    revenueThisMonth: number,
    revenuePrevMonth: number,
    revenuePrevPrevMonth: number,
    orderStatus: {
        inProgress: number,
        placed: number,
        shipped: number,
        cancelled: number
    }
    lastOrders: Array<OrderDto>
}