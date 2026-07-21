import Layout from "../components/layout/Layout";
import DashboardCards from "../components/dashboard/DashboardCards";
import CareerInsights from "../components/dashboard/CareerInsights";

import { Typography, Box, LinearProgress } from "@mui/material";
import { useJobs } from "../context/JobContext";

export default function Dashboard() {
  const { jobs } = useJobs();

  // Calculate progress metrics
  const totalApplications = jobs.length;
  const interviewsScheduled = jobs.filter(
    (job) => job.interviews && job.interviews.length > 0
  ).length;
  const offers = jobs.filter((job) => job.status === "Offer").length || 0;

  const interviewProgress =
    totalApplications > 0 ? (interviewsScheduled / totalApplications) * 100 : 0;

  return (
    <Layout>
      <Box
        sx={{
          maxWidth: "1400px",
          mx: "auto",
        }}
      >
        {/* Hero Header Section */}
        <Box
          sx={{
            mb: 6,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Background decoration */}
          <Box
            sx={{
              position: "absolute",
              top: -40,
              right: -80,
              width: 300,
              height: 300,
              background:
                "radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)",
              borderRadius: "50%",
              pointerEvents: "none",
            }}
          />

          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Typography
              variant="h3"
              fontWeight={800}
              sx={{
                color: "#111827",
                mb: 1,
                fontSize: { xs: "1.75rem", md: "2.25rem" },
                letterSpacing: "-0.5px",
              }}
            >
              Career Dashboard
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                fontSize: "1.05rem",
                fontWeight: 400,
                maxWidth: "600px",
              }}
            >
              Welcome back, Georgina 👋 Your job search at a glance.
            </Typography>

            {/* Progress Indicator */}
            {totalApplications > 0 && (
              <Box sx={{ mt: 4, maxWidth: "500px" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      textTransform: "uppercase",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "#6B7280",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Interview Conversion Rate
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 700,
                      color: "#059669",
                      fontSize: "0.9rem",
                    }}
                  >
                    {Math.round(interviewProgress)}% ({interviewsScheduled}/
                    {totalApplications})
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={interviewProgress}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    background: "rgba(16, 185, 129, 0.1)",
                    "& .MuiLinearProgress-bar": {
                      background:
                        "linear-gradient(90deg, #10B981 0%, #059669 100%)",
                      borderRadius: 4,
                    },
                  }}
                />
              </Box>
            )}
          </Box>
        </Box>

        {/* Statistics Cards - The Quick Stats */}
        <Box mb={8}>
          <DashboardCards />
        </Box>

        {/* Career Insights Section - The Only Other Data */}
        <Box>
          <Box sx={{ mb: 2.5 }}>
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{
                color: "#111827",
                fontSize: "1rem",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Quick Insights
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "#9CA3AF",
                fontSize: "0.85rem",
                display: "block",
                mt: 0.5,
              }}
            >
              Key metrics from your job search
            </Typography>
          </Box>

          <CareerInsights />
        </Box>
      </Box>
    </Layout>
  );
}
