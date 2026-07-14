import Layout from "../components/layout/Layout";
import DashboardCards from "../components/dashboard/DashboardCards";
import ApplicationsChart from "../components/dashboard/ApplicationsChart";
import StatusPieChart from "../components/dashboard/StatusPieChart";
import CareerInsights from "../components/dashboard/CareerInsights";

import { Typography, Grid, Box } from "@mui/material";

export default function Dashboard() {
  return (
    <Layout>
      <Box mb={3}>
        <Typography variant="h4" fontWeight="bold">
          Dashboard
        </Typography>

        <Typography color="text.secondary">
          Welcome back, Georgina 👋
        </Typography>
      </Box>

      <DashboardCards />

      <Grid container spacing={3} mt={2}>
        <Grid item xs={12} md={8}>
          <ApplicationsChart />
        </Grid>

        <Grid item xs={12} md={4}>
          <StatusPieChart />
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Career Insights
          </Typography>
          <Box mt={2}>
            <CareerInsights />
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
}
