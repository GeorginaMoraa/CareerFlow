import Layout from "../components/layout/Layout";

import DashboardCards from "../components/dashboard/DashboardCards";
import ApplicationsChart from "../components/dashboard/ApplicationsChart";
import StatusPieChart from "../components/dashboard/StatusPieChart";
import CareerInsights from "../components/dashboard/CareerInsights";

import { Typography, Grid, Box } from "@mui/material";

export default function Dashboard() {
  return (
    <Layout>
      <Box
        sx={{
          maxWidth: "1400px",

          mx: "auto",
        }}
      >
        {/* Header */}

        <Box mb={5}>
          <Typography
            variant="h4"

            fontWeight={700}

            sx={{
              color: "#111827",
              background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundSize: "200% 200%",
            }}
          >
            Dashboard
          </Typography>

          <Typography
            color="text.secondary"

            mt={2}

            sx={{ fontSize: "1rem" }}
          >
            Welcome back, Georgina 👋 Here's your career progress overview.
          </Typography>
        </Box>

        {/* Statistics Cards */}

        <Box mb={5}>
          <DashboardCards />
        </Box>

        {/* Analytics Section */}

        <Grid
          container

          spacing={3}

          alignItems="stretch"
        >
          <Grid
            item

            xs={12}

            lg={8}
          >
            <Box
              sx={{
                height: "100%",

                minHeight: 420,
              }}
            >
              <ApplicationsChart />
            </Box>
          </Grid>

          <Grid
            item

            xs={12}

            lg={4}
          >
            <Box
              sx={{
                height: "100%",

                minHeight: 420,
              }}
            >
              <StatusPieChart />
            </Box>
          </Grid>
        </Grid>

        {/* Career Insights */}

        <Box mt={3}>
          <Typography
            variant="subtitle1"

            fontWeight={700}

            mb={1.5}

            sx={{ color: "#111827" }}
          >
            Career Insights
          </Typography>

          <CareerInsights />
        </Box>
      </Box>
    </Layout>
  );
}
