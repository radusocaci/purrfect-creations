import React, {FC, ReactElement, useEffect, useState} from "react";
import {Grid, Typography} from "@mui/material";
import {OrderMetricChange} from "../components/OrderMetricChange";
import {OrderMetricValue} from "../components/OrderMetricValue";
import {MetricsDataDto} from "../util/api/dto/metricsDataDto";
import {CircularProgress} from "@material-ui/core";
import {getMetricsData} from "../util/api/apiClient";
import {OrderMetricDistribution} from "../components/OrderMetricDistribution";
import OrderIcon from '@mui/icons-material/ShoppingBag';
import LastMonthIcon from '@mui/icons-material/DateRange';
import ThisMonthIcon from '@mui/icons-material/Today';
import RevenueIcon from '@mui/icons-material/AttachMoney';
import DifferenceIcon from '@mui/icons-material/Difference';
import InProgressIcon from '@mui/icons-material/Autorenew';
import ShippedIcon from '@mui/icons-material/Done';
import PlacedIcon from '@mui/icons-material/Add';
import CancelledIcon from '@mui/icons-material/Close';
import {LastOrdersMetric} from "../components/LastOrdersMetric";

export const Dashboard: FC = (): ReactElement => {
    const [metricsData, setMetricsData] = useState<MetricsDataDto>()
    const [loading, setLoading] = useState(true);
    const [revenueImprovement, setRevenueImprovement] = useState(false);
    const [ordersImprovement, setOrdersImprovement] = useState(false);
    const [revenueDiff, setRevenueDiff] = useState(0);
    const [ordersDiff, setOrdersDiff] = useState(0);
    const [shippedPercentage, setShippedPercentage] = useState(0);
    const [cancelledPercentage, setCancelledPercentage] = useState(0);
    const [inProgressPercentage, setInProgressPercentage] = useState(0);
    const [placedPercentage, setPlacedPercentage] = useState(0);

    useEffect(() => {
        getMetricsData()
            .then(data => {
                setMetricsData(data)
                processLastMonthRevenueChanges(data.revenuePrevMonth, data.revenuePrevPrevMonth)
                processLastMonthOrdersChanges(data.nrOrdersPrevMonth, data.nrOrdersPrevPrevMonth)
                processOrderStatisticsByStatus(data.nrOrders, data.orderStatus.shipped,
                    data.orderStatus.placed, data.orderStatus.cancelled, data.orderStatus.inProgress)
                setLoading(false)
            })
    }, [])

    const processLastMonthRevenueChanges = (currRevenue: number, prevRevenue: number) => {
        if (currRevenue < prevRevenue) {
            setRevenueImprovement(false)
            setRevenueDiff(Math.floor((prevRevenue - currRevenue) / prevRevenue * 100))
        } else {
            setRevenueImprovement(true)
            setRevenueDiff(Math.floor((currRevenue - prevRevenue) / prevRevenue * 100))
        }
    }

    const processLastMonthOrdersChanges = (currOrders: number, prevOrders: number) => {
        if (currOrders < prevOrders) {
            setOrdersImprovement(false)
            setOrdersDiff(Math.floor((prevOrders - currOrders) / prevOrders * 100))
        } else {
            setOrdersImprovement(true)
            setOrdersDiff(Math.floor((currOrders - prevOrders) / prevOrders * 100))
        }
    }

    const processOrderStatisticsByStatus = (
        totalOrders: number,
        shipped: number,
        placed: number,
        cancelled: number,
        inProgress: number
    ) => {
        setCancelledPercentage(cancelled / totalOrders * 100)
        setInProgressPercentage(inProgress / totalOrders * 100)
        setShippedPercentage(shipped / totalOrders * 100)
        setPlacedPercentage(placed / totalOrders * 100)
    }

    return (
        <>
            {!loading && (
                <Grid
                    container
                    rowSpacing={3}
                    columnSpacing={{xl: 2}}>
                    <Grid
                        item
                        xl={12}>
                        <Typography
                            sx={{m: 1}}
                            variant="h3"
                            style={{
                                marginLeft: '38%',
                            }}>
                            Purfect Creations Metrics Dashboard
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xl={12}>
                        <Typography
                            sx={{m: 1}}
                            variant="h4">
                            Order Count Metrics
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xl={3}>
                        <OrderMetricValue metric='TOTAL NUMBER OF ORDERS'
                                          value={metricsData?.nrOrders}
                                          icon={<OrderIcon/>}/>
                    </Grid>
                    <Grid
                        item
                        xl={3}>
                        <OrderMetricValue metric='ORDERS THIS MONTH'
                                          value={metricsData?.nrOrdersThisMonth}
                                          icon={<ThisMonthIcon/>}/>
                    </Grid>
                    <Grid
                        item
                        xl={3}>
                        <OrderMetricValue metric='ORDERS LAST MONTH'
                                          value={metricsData?.nrOrdersPrevMonth}
                                          icon={<LastMonthIcon/>}/>
                    </Grid>
                    <Grid
                        item
                        xl={3}>
                        <OrderMetricChange lastMonthValue={metricsData?.nrOrdersPrevMonth}
                                           prevToLastMonthValue={metricsData?.nrOrdersPrevPrevMonth}
                                           metric='ORDER COUNT CHANGE LAST MONTH'
                                           prevMonthValueDiff={ordersDiff}
                                           isImprovement={ordersImprovement}
                                           icon={<DifferenceIcon/>}/>
                    </Grid>
                    <Grid
                        item
                        xl={12}>
                        <Typography
                            sx={{m: 1}}
                            variant="h4">
                            Revenue Metrics
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xl={3}>
                        <OrderMetricValue metric='TOTAL REVENUE (GBP)'
                                          value={metricsData?.totalRevenue}
                                          isMoney={true}
                                          icon={<RevenueIcon/>}/>
                    </Grid>
                    <Grid
                        item
                        xl={3}>
                        <OrderMetricValue metric='REVENUE THIS MONTH (GBP)'
                                          value={metricsData?.revenueThisMonth}
                                          isMoney={true}
                                          icon={<ThisMonthIcon/>}/>
                    </Grid>
                    <Grid
                        item
                        xl={3}>
                        <OrderMetricValue metric='REVENUE LAST MONTH (GBP)'
                                          value={metricsData?.revenuePrevMonth}
                                          isMoney={true}
                                          icon={<LastMonthIcon/>}/>
                    </Grid>
                    <Grid
                        item
                        xl={3}>
                        <OrderMetricChange lastMonthValue={metricsData?.revenuePrevMonth}
                                           prevToLastMonthValue={metricsData?.revenuePrevPrevMonth}
                                           metric='REVENUE CHANGE LAST MONTH (GBP)'
                                           prevMonthValueDiff={revenueDiff}
                                           isImprovement={revenueImprovement}
                                           isMoney={true}
                                           icon={<DifferenceIcon/>}/>
                    </Grid>
                    <Grid
                        item
                        xl={12}>
                        <Typography
                            sx={{m: 1}}
                            variant="h4">
                            Orders Distribution by Status
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xl={3}>
                        <OrderMetricDistribution metric='IN PROGRESS'
                                                 value={inProgressPercentage}
                                                 icon={<InProgressIcon/>}
                                                 color='warning.main'/>
                    </Grid>
                    <Grid
                        item
                        xl={3}>
                        <OrderMetricDistribution metric='PLACED'
                                                 value={placedPercentage}
                                                 icon={<PlacedIcon/>}
                                                 color='primary.main'/>
                    </Grid>
                    <Grid
                        item
                        xl={3}>
                        <OrderMetricDistribution metric='SHIPPED'
                                                 value={shippedPercentage}
                                                 icon={<ShippedIcon/>}
                                                 color='success.main'/>
                    </Grid>
                    <Grid
                        item
                        xl={3}>
                        <OrderMetricDistribution metric='CANCELLED'
                                                 value={cancelledPercentage}
                                                 icon={<CancelledIcon/>}
                                                 color='error.main'/>
                    </Grid>
                    <Grid
                        item
                        xl={12}>
                        <Typography
                            sx={{m: 1}}
                            variant="h4">
                            Latest orders
                        </Typography>
                    </Grid>
                    <Grid item
                          xl={12}>
                        <LastOrdersMetric orders={metricsData?.lastOrders}/>
                    </Grid>
                </Grid>
            )}
            {loading && (
                <CircularProgress size={50}
                                  style={{
                                      marginLeft: '49%',
                                      marginTop: '50px'
                                  }}/>
            )}
        </>
    )
};