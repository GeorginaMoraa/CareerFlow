import { useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useJobs } from "../context/JobContext";
import Layout from "../components/layout/Layout";

export default function Analytics() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { jobs } = useJobs();
  const [timeRange, setTimeRange] = useState("month"); // month, quarter, year

  // Calculate statistics
  const stats = {
    total: jobs.length,
    applied: jobs.filter((j) => j.status === "Applied").length,
    interviews: jobs.filter((j) => j.status === "Interview").length,
    assessments: jobs.filter((j) => j.status === "Assessment").length,
    offers: jobs.filter((j) => j.status === "Offer").length,
    rejected: jobs.filter((j) => j.status === "Rejected").length,
  };

  // Success rate calculation
  const successRate =
    stats.total > 0 ? ((stats.offers / stats.total) * 100).toFixed(1) : 0;

  // Average time calculations (simplified)
  const avgTimeToInterview = Math.floor(Math.random() * 30) + 5; // Demo data
  const avgTimeToOffer = Math.floor(Math.random() * 60) + 20;

  // Status distribution data
  const statusData = [
    { name: "Applied", value: stats.applied, color: theme.palette.info.main },
    { name: "Interview", value: stats.interviews, color: theme.palette.primary.main },
    { name: "Assessment", value: stats.assessments, color: theme.palette.warning.main },
    { name: "Offer", value: stats.offers, color: theme.palette.success.main },
    { name: "Rejected", value: stats.rejected, color: theme.palette.error.main },
  ];

  // Timeline data (demo)
  const timelineData = [
    { month: "Jan", applications: 5, interviews: 2, offers: 0 },
    { month: "Feb", applications: 8, interviews: 3, offers: 1 },
    { month: "Mar", applications: 12, interviews: 5, offers: 1 },
    { month: "Apr", applications: 10, interviews: 4, offers: 2 },
    { month: "May", applications: 15, interviews: 6, offers: 2 },
    { month: "Jun", applications: 20, interviews: 8, offers: 3 },
  ];

  // Company frequency (top companies)
  const companyData = jobs.reduce((acc, job) => {
    const existing = acc.find((c) => c.company === job.company);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ company: job.company, count: 1 });
    }
    return acc;
  }, []);

  const topCompanies = companyData
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return (
    <Layout>
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h4" fontWeight="700" gutterBottom>
          Analytics & Insights
        </Typography>
        <Typography color="text.secondary" variant="body2">
          Track your job application progress and performance metrics
        </Typography>
      </Box>

      {/* Time Range Selector */}
      <Box mb={3} display="flex" justifyContent="flex-end">
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Time Range</InputLabel>
          <Select
            value={timeRange}
            label="Time Range"
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <MenuItem value="month">Last Month</MenuItem>
            <MenuItem value="quarter">Last Quarter</MenuItem>
            <MenuItem value="year">Last Year</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Key Metrics */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" variant="body2" gutterBottom>
                Total Applications
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {stats.total}
              </Typography>
              <Typography color="text.secondary" variant="caption">
                All time
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" variant="body2" gutterBottom>
                Success Rate
              </Typography>
              <Typography variant="h4" fontWeight="bold" color="success.main">
                {successRate}%
              </Typography>
              <Typography color="text.secondary" variant="caption">
                {stats.offers} offers received
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" variant="body2" gutterBottom>
                Avg. Time to Interview
              </Typography>
              <Typography variant="h4" fontWeight="bold" color="primary.main">
                {avgTimeToInterview}d
              </Typography>
              <Typography color="text.secondary" variant="caption">
                From application
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" variant="body2" gutterBottom>
                Avg. Time to Offer
              </Typography>
              <Typography variant="h4" fontWeight="bold" color="success.main">
                {avgTimeToOffer}d
              </Typography>
              <Typography color="text.secondary" variant="caption">
                From application
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Row 1 */}
      <Grid container spacing={3} mb={4}>
        {/* Status Distribution */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={3}>
                Application Status Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData.filter((d) => d.value > 0)}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Timeline */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={3}>
                Application Timeline
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="applications" fill={theme.palette.info.main} />
                  <Bar dataKey="interviews" fill={theme.palette.primary.main} />
                  <Bar dataKey="offers" fill={theme.palette.success.main} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Row 2 */}
      <Grid container spacing={3} mb={4}>
        {/* Applications Over Time */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={3}>
                Cumulative Applications Over Time
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="applications"
                    stroke={theme.palette.info.main}
                    strokeWidth={2}
                    dot={{ fill: theme.palette.info.main, r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="interviews"
                    stroke={theme.palette.primary.main}
                    strokeWidth={2}
                    dot={{ fill: theme.palette.primary.main, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Top Companies */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={3}>
                Top Companies Applied To
              </Typography>
              <Box>
                {topCompanies.length > 0 ? (
                  topCompanies.map((company, index) => (
                    <Box key={index} mb={2} display="flex" justifyContent="space-between">
                      <Typography variant="body2">{company.company}</Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {company.count}
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography color="text.secondary" variant="body2">
                    No applications yet
                  </Typography>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Status Breakdown Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" mb={3}>
            Status Breakdown
          </Typography>
          <Box>
            {statusData.map((status, index) => (
              <Box key={index} mb={2} display="flex" alignItems="center" gap={2}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor: status.color,
                  }}
                />
                <Box flex={1}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2">{status.name}</Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {status.value} ({((status.value / stats.total) * 100).toFixed(1)}%)
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      height: 8,
                      backgroundColor: "#f0f0f0",
                      borderRadius: 4,
                      mt: 0.5,
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        height: "100%",
                        width: `${(status.value / stats.total) * 100}%`,
                        backgroundColor: status.color,
                        borderRadius: 4,
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Layout>
  );
}