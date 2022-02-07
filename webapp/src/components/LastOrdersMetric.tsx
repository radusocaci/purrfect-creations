import {FC, ReactElement} from "react";
import {Card, Chip, Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material';
import {OrderDto} from "../util/api/dto/metricsDataDto";

interface LastOrdersMetricProps {
    orders?: Array<OrderDto>
}

export const LastOrdersMetric: FC<LastOrdersMetricProps> = ({orders}: LastOrdersMetricProps): ReactElement => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'GBP',
    });

    return (
        <>
            <Card sx={{height: '100%'}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Order placed
                            </TableCell>
                            <TableCell>
                                Product
                            </TableCell>
                            <TableCell>
                                Date
                            </TableCell>
                            <TableCell>
                                First name
                            </TableCell>
                            <TableCell>
                                Last name
                            </TableCell>
                            <TableCell>
                                Address
                            </TableCell>
                            <TableCell>
                                Email
                            </TableCell>
                            <TableCell>
                                Order status
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(orders as Array<OrderDto>).map((order) => (
                            <TableRow
                                hover
                                key={order.order_id}
                            >
                                <TableCell>
                                    {order.order_placed}
                                </TableCell>
                                <TableCell>
                                    {order.product_name}
                                </TableCell>
                                <TableCell>
                                    {formatter.format(order.price)}
                                </TableCell>
                                <TableCell>
                                    {order.first_name}
                                </TableCell>
                                <TableCell>
                                    {order.last_name}
                                </TableCell>
                                <TableCell>
                                    {order.address}
                                </TableCell>
                                <TableCell>
                                    {order.email}
                                </TableCell>
                                <TableCell>
                                    <Chip label={order.order_status}
                                          style={{
                                              width: '100px'
                                          }}
                                          color={`${order.order_status === 'shipped' ?
                                              'success' :
                                              (order.order_status === 'in_progress' ?
                                                  'warning' :
                                                  (order.order_status === 'cancelled' ?
                                                      'error' :
                                                      'primary'))}`}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </>
    )
}