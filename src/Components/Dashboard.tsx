import MainLayout from "./Layout/MainLayout";
import React from 'react';
import { Card, CardContent, Grid, Typography, Box } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PendingIcon from '@mui/icons-material/AccessTime';

const Dashboard = () => {
    const data = [
        { name: '5k', uv: 20 },
        { name: '10k', uv: 40 },
        { name: '15k', uv: 64 },
        { name: '20k', uv: 50 },
        { name: '25k', uv: 30 },
        { name: '30k', uv: 60 },
        { name: '35k', uv: 50 },
        { name: '40k', uv: 30 },
        { name: '45k', uv: 40 },
        { name: '50k', uv: 60 },
    ];

    return (<MainLayout>
        <Box sx={{ padding: 4 }}>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item>
                                    <PeopleIcon fontSize="large" />
                                </Grid>
                                <Grid item>
                                    <Typography variant="h5">40,689</Typography>
                                    <Typography color="textSecondary">Total User</Typography>
                                    <Typography variant="body2" color="success.main">8.5% Up from yesterday</Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item>
                                    <ShoppingCartIcon fontSize="large" />
                                </Grid>
                                <Grid item>
                                    <Typography variant="h5">10,293</Typography>
                                    <Typography color="textSecondary">Total Order</Typography>
                                    <Typography variant="body2" color="success.main">1.3% Up from past week</Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Grid container spacing={2} alignItems="center">
                                {/* <Grid item>
                                    <AttachMoneyIcon fontSize="small" />
                                </Grid> */}
                                <Grid item>
                                    <Typography variant="h5">$ 89,000</Typography>
                                    <Typography color="textSecondary">Total Sales</Typography>
                                    <Typography variant="body2" color="error.main">4.3% Down from yesterday</Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item>
                                    <PendingIcon fontSize="large" />
                                </Grid>
                                <Grid item>
                                    <Typography variant="h5">2,040</Typography>
                                    <Typography color="textSecondary">Total Pending</Typography>
                                    <Typography variant="body2" color="success.main">1.8% Up from yesterday</Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Sales Details Graph */}
            <Box mt={4}>
                <Typography variant="h6" gutterBottom>Sales Details</Typography>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="uv" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </Box>
        </Box></MainLayout>
    );
};

export default Dashboard;
