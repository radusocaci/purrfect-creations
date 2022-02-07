import {Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography} from '@mui/material';
import {FC, ReactElement, ReactNode} from "react";

interface OrderMetricDistributionProps {
    metric?: string,
    value?: number,
    icon?: ReactNode,
    color?: string
}

export const OrderMetricDistribution: FC<OrderMetricDistributionProps> = ({
                                                                              metric,
                                                                              value,
                                                                              icon,
                                                                              color
                                                                          }: OrderMetricDistributionProps): ReactElement => (
    <Card
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
                        {value?.toFixed(2)}%
                    </Typography>
                </Grid>
                <Grid item>
                    <Avatar
                        sx={{
                            backgroundColor: `${color}`,
                            height: 56,
                            width: 56
                        }}
                    >
                        {icon}
                    </Avatar>
                </Grid>
            </Grid>
            <Box sx={{pt: 3}}>
                <LinearProgress
                    value={value}
                    variant="determinate"
                />
            </Box>
        </CardContent>
    </Card>
);
