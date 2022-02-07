import {FC, ReactNode} from "react";
import {Avatar, Card, CardContent, Grid, Typography} from '@mui/material';

interface OrderMetricValueProps {
    metric?: string,
    value?: number,
    isMoney?: boolean
    icon?: ReactNode
}

export const OrderMetricValue: FC<OrderMetricValueProps> = ({metric, value, isMoney, icon}: OrderMetricValueProps) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'GBP',
    });

    return (<Card sx={{height: '100%'}}>
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
                        {isMoney ? formatter.format(value as number) : value}
                    </Typography>
                </Grid>
                <Grid item>
                    <Avatar
                        sx={{
                            backgroundColor: 'primary.main',
                            height: 56,
                            width: 56
                        }}
                    >
                        {icon}
                    </Avatar>
                </Grid>
            </Grid>
        </CardContent>
    </Card>)
};
