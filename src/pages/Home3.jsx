import React, { useState, useEffect } from "react";
import { SubscriptionChart,Navbar3, Main, Product, Footer } from "../components";
import { Line } from 'react-chartjs-2';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import moment from 'moment'; // 
import { CategoryScale, Chart,registerables } from "chart.js";



function Home3() {
  const [dashboardData, setDashboardData] = useState({});
  const [subsData, setSubsData] = useState([]);
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [subsLoading, setSubsLoading] = useState(true);
  Chart.register(CategoryScale);
  Chart.register(...registerables);
  const sortedSubsData = subsData.slice().sort((a, b) => moment(a.purchaseDate) - moment(b.purchaseDate));


 
  const calculateAccumulatedPrice = (subsData) => {
    let accumulatedPrice = 0;
    return subsData.map((sub) => {
      accumulatedPrice += sub.price;
      return accumulatedPrice;
    });
  };
  const parsedDates = sortedSubsData.map((sub) => moment(sub.purchaseDate).format("YYYY-MM-DD"));
  const accumulatedPrices = calculateAccumulatedPrice(sortedSubsData);
    

  const chartData = {
    labels: parsedDates, // Use parsed dates as labels
    datasets: [
      {
        label: "Accumulated Price",
        data: accumulatedPrices,
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  useEffect(() => {
    // Retrieve the authentication token from local storage
    const authToken = localStorage.getItem('accessToken');

    // Make an authenticated API call for dashboard data with the token
    fetch("http://localhost:9998/BackendCRM/User/dashborad", {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch dashboard data");
        }
      })
      .then((data) => {
        setDashboardData(data);
        setDashboardLoading(false);
      })
      .catch((error) => {
        console.error("An error occurred while fetching dashboard data:", error);
        setDashboardLoading(false);
      });

    // Make an authenticated API call for subscription data with the token
    fetch("http://localhost:9998/BackendCRM/sub/alldtos", {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch subscription data");
        }
      })
      .then((subs) => {
        setSubsData(subs);
        setSubsLoading(false);
      })
      .catch((error) => {
        console.error("An error occurred while fetching subscription data:", error);
        setSubsLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar3 />
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper elevation={3}>
                <div className="dashboard-header">
                  <Typography variant="h4" component="div">
                    
                  </Typography>
                </div>
                {dashboardLoading || subsLoading ? (
                  <div className="loading-indicator">
                    <CircularProgress />
                  </div>
                ) : (
                  <div className="dashboard-content">
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6} md={4}>
                        <Paper elevation={3}>
                          <div className="dashboard-item">
                            <Typography variant="h6" component="div">
                              Number of Subscribed Societies
                            </Typography>
                            <Typography variant="h4" component="div">
                              {dashboardData.nbsc}
                            </Typography>
                          </div>
                        </Paper>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <Paper elevation={3}>
                          <div className="dashboard-item">
                            <Typography variant="h6" component="div">
                              Our Profit
                            </Typography>
                            <Typography variant="h4" component="div">
                              {dashboardData.ca}
                            </Typography>
                          </div>
                        </Paper>
                      </Grid>
                    </Grid>
                    <div className="dashboard-subscriptions">
                      <Typography variant="h5" component="div">
                        Subscriptions:
                      </Typography>
                      <Line data={chartData} style={{ width: '25%', height: '25%' }} />

                      <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                            <TableRow>
                              <TableCell>Purchase Date</TableCell>
                              <TableCell>Expiration Date</TableCell>
                              <TableCell>Duration in Months</TableCell>
                              <TableCell>Price</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {subsData.map((sub) => (
                              <TableRow key={sub.id}>
                                <TableCell>{sub.purchaseDate}</TableCell>
                                <TableCell>{sub.expirationDate}</TableCell>
                                <TableCell>{sub.durationInMonths}</TableCell>
                                <TableCell>{sub.price}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                  </div>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      <Footer />
    </>
  );
}

export default Home3;
