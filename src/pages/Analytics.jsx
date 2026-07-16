import { useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  useTheme,
} from "@mui/material";
import {
  Work,
  TrendingUp,
  Schedule,
  EmojiEvents,
  ArrowUpward,
  ArrowDownward,
} from "@mui/icons-material";
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

const dividerSx = { my: 5, borderColor: "rgba(229, 231, 235, 0.6)" };

const SectionTitle = ({ children, action }) => (
  <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
    <Typography
      variant="h6"
      fontWeight={600}
      sx={{ color: "#111827", display: "flex", alignItems: "center", gap: 1 }}
    >
      <Box
        sx={{
          width: 4,
          height: 20,
          background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
          borderRadius: 1,
        }}
      />
      {children}
    </Typography>
    {action}
  </Box>
);

export default function Analytics() {
  const theme = useTheme();
  const { jobs } = useJobs();
  const [timeRange, setTimeRange] = useState("month");

  const stats = {
    total: jobs.length,
    applied: jobs.filter((j) => j.status === "Applied").length,
    interviews: jobs.filter((j) => j.status === "Interview").length,
    assessments: jobs.filter((j) => j.status === "Assessment").length,
    offers: jobs.filter((j) => j.status === "Offer").length,
    rejected: jobs.filter((j) => j.status === "Rejected").length,
  };

  const successRate =
    stats.total > 0 ? ((stats.offers / stats.total) * 100).toFixed(1) : 0;
  const avgTimeToInterview = Math.floor(Math.random() * 30) + 5;
  const avgTimeToOffer = Math.floor(Math.random() * 60) + 20;

  const statusData = [
    { name: "Applied", value: stats.applied, color: theme.palette.info.main },
    {
      name: "Interview",
      value: stats.interviews,
      color: theme.palette.primary.main,
    },
    {
      name: "Assessment",
      value: stats.assessments,
      color: theme.palette.warning.main,
    },
    { name: "Offer", value: stats.offers, color: theme.palette.success.main },
    {
      name: "Rejected",
      value: stats.rejected,
      color: theme.palette.error.main,
    },
  ];

  const timelineData = [
    { month: "Jan", applications: 5, interviews: 2, offers: 0 },
    { month: "Feb", applications: 8, interviews: 3, offers: 1 },
    { month: "Mar", applications: 12, interviews: 5, offers: 1 },
    { month: "Apr", applications: 10, interviews: 4, offers: 2 },
    { month: "May", applications: 15, interviews: 6, offers: 2 },
    { month: "Jun", applications: 20, interviews: 8, offers: 3 },
  ];

  const companyData = jobs.reduce((acc, job) => {
    const existing = acc.find((c) => c.company === job.company);
    if (existing) existing.count += 1;
    else acc.push({ company: job.company, count: 1 });
    return acc;
  }, []);

  const topCompanies = companyData
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
  const maxCompanyCount = topCompanies.length > 0 ? topCompanies[0].count : 1;

  const kpis = [
    {
      label: "Total Applications",
      value: stats.total,
      sub: "All time",
      icon: <Work />,
      color: "#10B981",
      trend: "+12%",
      up: true,
    },
    {
      label: "Success Rate",
      value: `${successRate}%`,
      sub: `${stats.offers} offers received`,
      icon: <EmojiEvents />,
      color: "#8B5CF6",
      trend: successRate >= 15 ? "On track" : "Below goal",
      up: successRate >= 15,
    },
    {
      label: "Avg. Time to Interview",
      value: `${avgTimeToInterview}d`,
      sub: "From application",
      icon: <Schedule />,
      color: "#06B6D4",
      trend: "-2d",
      up: true,
    },
    {
      label: "Avg. Time to Offer",
      value: `${avgTimeToOffer}d`,
      sub: "From application",
      icon: <TrendingUp />,
      color: "#14B8A6",
      trend: "+4d",
      up: false,
    },
  ];

  return (
    <Layout>
      {/* Header */}
      <Box
        mb={5}
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        flexWrap="wrap"
        gap={2}
      >
        <Box>
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{
              color: "#111827",
              background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Analytics & Insights
          </Typography>
          <Typography color="text.secondary" variant="body2" mt={0.5}>
            Track your job application progress and performance metrics
          </Typography>
        </Box>

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

      {/* KPI Summary Panel */}
      <Box
        sx={{
          borderRadius: 4,
          background: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.4)",
          boxShadow:
            "0 2px 8px rgba(0, 0, 0, 0.06), inset 0 1px 1px rgba(255, 255, 255, 0.5)",
          p: { xs: 2, md: 3 },
          display: "grid",
          gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(4, 1fr)" },
          rowGap: 3,
          columnGap: 2,
        }}
      >
        {kpis.map((kpi, i) => (
          <Box
            key={kpi.label}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              pl: { md: i > 0 ? 3 : 0 },
              borderLeft: {
                xs: "none",
                md: i > 0 ? "1px solid rgba(229, 231, 235, 0.6)" : "none",
              },
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                minWidth: 48,
                borderRadius: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                background: `linear-gradient(135deg, ${kpi.color} 0%, ${kpi.color}dd 100%)`,
                boxShadow: `0 4px 12px ${kpi.color}40`,
              }}
            >
              {kpi.icon}
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight={600}
                noWrap
              >
                {kpi.label}
              </Typography>
              <Box display="flex" alignItems="baseline" gap={1}>
                <Typography
                  variant="h5"
                  fontWeight={700}
                  color="#111827"
                  sx={{ lineHeight: 1 }}
                >
                  {kpi.value}
                </Typography>
                <Box display="flex" alignItems="center" gap={0.2}>
                  {kpi.up ? (
                    <ArrowUpward sx={{ fontSize: 12, color: "#10B981" }} />
                  ) : (
                    <ArrowDownward sx={{ fontSize: 12, color: "#EF4444" }} />
                  )}
                  <Typography
                    variant="caption"
                    fontWeight={700}
                    sx={{ color: kpi.up ? "#059669" : "#DC2626" }}
                  >
                    {kpi.trend}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="caption" color="text.secondary">
                {kpi.sub}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      <Divider sx={dividerSx} />

      {/* Charts Row 1 */}
      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <SectionTitle>Application Status Distribution</SectionTitle>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData.filter((d) => d.value > 0)}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                innerRadius={55}
                outerRadius={95}
                paddingAngle={3}
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke="none"
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "rgba(15, 23, 42, 0.9)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: 8,
                }}
                labelStyle={{ color: "#fff" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Grid>

        <Grid item xs={12} md={6}>
          <SectionTitle>Application Timeline</SectionTitle>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={timelineData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(229, 231, 235, 0.6)"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                stroke="#6B7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#6B7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  background: "rgba(15, 23, 42, 0.9)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: 8,
                }}
                labelStyle={{ color: "#fff" }}
              />
              <Legend wrapperStyle={{ fontSize: 13 }} />
              <Bar
                dataKey="applications"
                fill={theme.palette.info.main}
                radius={[4, 4, 0, 0]}
                maxBarSize={28}
              />
              <Bar
                dataKey="interviews"
                fill={theme.palette.primary.main}
                radius={[4, 4, 0, 0]}
                maxBarSize={28}
              />
              <Bar
                dataKey="offers"
                fill="#8B5CF6"
                radius={[4, 4, 0, 0]}
                maxBarSize={28}
              />
            </BarChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>

      <Divider sx={dividerSx} />

      {/* Charts Row 2 */}
      <Grid container spacing={5}>
        <Grid item xs={12} md={8}>
          <SectionTitle>Cumulative Applications Over Time</SectionTitle>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timelineData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(229, 231, 235, 0.6)"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                stroke="#6B7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#6B7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  background: "rgba(15, 23, 42, 0.9)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: 8,
                }}
                labelStyle={{ color: "#fff" }}
              />
              <Legend wrapperStyle={{ fontSize: 13 }} />
              <Line
                type="monotone"
                dataKey="applications"
                stroke={theme.palette.info.main}
                strokeWidth={2.5}
                dot={{ fill: theme.palette.info.main, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="interviews"
                stroke={theme.palette.primary.main}
                strokeWidth={2.5}
                dot={{ fill: theme.palette.primary.main, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Grid>

        <Grid item xs={12} md={4}>
          <SectionTitle>Top Companies</SectionTitle>
          {topCompanies.length > 0 ? (
            <Box display="flex" flexDirection="column" gap={2.5}>
              {topCompanies.map((company, index) => (
                <Box key={index}>
                  <Box display="flex" justifyContent="space-between" mb={0.5}>
                    <Typography
                      variant="body2"
                      color="#1F2937"
                      fontWeight={500}
                      noWrap
                      sx={{ maxWidth: "70%" }}
                    >
                      {company.company}
                    </Typography>
                    <Typography
                      variant="body2"
                      fontWeight={700}
                      color="#111827"
                    >
                      {company.count}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      height: 6,
                      borderRadius: 4,
                      background: "rgba(229, 231, 235, 0.6)",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        height: "100%",
                        width: `${(company.count / maxCompanyCount) * 100}%`,
                        borderRadius: 4,
                        background:
                          "linear-gradient(90deg, #10B981 0%, #059669 100%)",
                      }}
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          ) : (
            <Typography color="text.secondary" variant="body2">
              No applications yet
            </Typography>
          )}
        </Grid>
      </Grid>

      <Divider sx={dividerSx} />

      {/* Status Breakdown */}
      <SectionTitle>Status Breakdown</SectionTitle>
      <Grid container spacing={3}>
        {statusData.map((status, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Box display="flex" alignItems="center" gap={2}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: status.color,
                  flexShrink: 0,
                }}
              />
              <Box flex={1}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="#1F2937" fontWeight={500}>
                    {status.name}
                  </Typography>
                  <Typography variant="body2" fontWeight={700} color="#111827">
                    {status.value} (
                    {stats.total > 0
                      ? ((status.value / stats.total) * 100).toFixed(1)
                      : 0}
                    %)
                  </Typography>
                </Box>
                <Box
                  sx={{
                    height: 8,
                    backgroundColor: "rgba(229, 231, 235, 0.6)",
                    borderRadius: 4,
                    mt: 0.5,
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      height: "100%",
                      width: `${stats.total > 0 ? (status.value / stats.total) * 100 : 0}%`,
                      backgroundColor: status.color,
                      borderRadius: 4,
                      transition: "width 0.4s ease",
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}
