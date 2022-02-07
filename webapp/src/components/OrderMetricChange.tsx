import {Avatar, Box, Card, CardContent, Grid, Typography} from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {FC, ReactNode} from "react";

interface OrderMetricChangeProps {
    lastMonthValue?: number,
    prevToLastMonthValue?: number,
    prevMonthValueDiff?: number,
    isImprovement?: boolean,
    metric?: string,
    isMoney?: boolean,
    icon?: ReactNode
}

export const OrderMetricChange: FC<OrderMetricChangeProps> = ({
                                                              lastMonthValue,
                                                              prevToLastMonthValue,
                                                              prevMonthValueDiff,
                                                              isImprovement,
                                                              metric,
                                                              isMoney,
                                                              icon
                                                          }: OrderMetricChangeProps) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'GBP',
    });

    return (<Card
            sx={{height: '100%'}}
        >
            <CardContent>
                <Grid
                    container
                    spacing={3}
                    sx={{justifyContent: 'space-between'}}
                >
                    <Grid item>
                        <Typography
                            color="textSecondary"
                            gutterBottom
                            variant="overline"
                        >
                            {metric}
                        </Typography>
                        <Typography
                            color="textPrimary"
                            variant="h4"
                        >
                            From {isMoney ? formatter.format(prevToLastMonthValue as number) : prevToLastMonthValue} to {isMoney ? formatter.format(lastMonthValue as number) : lastMonthValue}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Avatar
                            sx={{
                                backgroundColor: `${isImprovement ? 'success.main' : 'error.main'}`,
                                height: 56,
                                width: 56
                            }}
                        >
                            {icon}
                        </Avatar>
                    </Grid>
                </Grid>
                <Box
                    sx={{
                        pt: 2,
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    {isImprovement ? (
                        <>
                            <ArrowUpwardIcon color="success"/>
                            <Typography
                                variant="body2"
                                sx={{
                                    mr: 1
                                }}
                            >
                                {prevMonthValueDiff}%
                            </Typography>
                        </>
                    ) : (
                        <>
                            <ArrowDownwardIcon color="error"/>
                            <Typography
                                color="error"
                                sx={{
                                    mr: 1
                                }}
                                variant="body2"
                            >
                                {prevMonthValueDiff}%
                            </Typography></>
                    )}
                    <Typography
                        color="textSecondary"
                        variant="caption"
                    >
                        Since prev month
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
};
