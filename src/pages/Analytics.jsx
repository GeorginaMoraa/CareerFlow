import { useState, useMemo } from "react";
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
  Tooltip as MuiTooltip,
} from "@mui/material";
import { TrendingUp, Schedule, TrackChanges } from "@mui/icons-material";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useJobs } from "../context/JobContext";
import Layout from "../components/layout/Layout";

// Improved color palette: focus on teal success + amber friction
const COLORS = {
  success: "#0F8062",
  successLight: "#E8F5F1",
  friction: "#B8860B",
  frictionLight: "#FFF8E1",
  neutral: "#6B7280",
  border: "rgba(107, 114, 128, 0.15)",
};

const SectionTitle = ({ children }) => (
  <Typography
    variant="h6"
    fontWeight={600}
    sx={{
      color: "#111827",
      display: "flex",
      alignItems: "center",
      gap: 1,
      mb: 3,
      fontSize: "15px",
      letterSpacing: "-0.3px",
    }}
  >
    <Box
      sx={{
        width: 3,
        height: 16,
        background: `linear-gradient(135deg, ${COLORS.success} 0%, #059669 100%)`,
        borderRadius: 0.5,
      }}
    />
    {children}
  </Typography>
);

const getTimeRangeFilter = (days) => {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  return cutoff;
};

const getMonthKey = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
};

export default function Analytics() {
  const theme = useTheme();
  const { jobs } = useJobs();
  const [timeRange, setTimeRange] = useState("month");

  const filteredJobs = useMemo(() => {
    const daysMap = { month: 30, quarter: 90, year: 365 };
    const cutoff = getTimeRangeFilter(daysMap[timeRange]);

    return jobs.filter((job) => {
      const jobDate = new Date(job.createdAt || job.appliedDate || 0);
      return jobDate >= cutoff;
    });
  }, [jobs, timeRange]);

  const stats = useMemo(() => {
    return {
      total: filteredJobs.length,
      applied: filteredJobs.filter((j) => j.status === "Applied").length,
      interviews: filteredJobs.filter((j) => j.status === "Interview").length,
      assessments: filteredJobs.filter((j) => j.status === "Assessment").length,
      offers: filteredJobs.filter((j) => j.status === "Offer").length,
      rejected: filteredJobs.filter((j) => j.status === "Rejected").length,
    };
  }, [filteredJobs]);

  const timingMetrics = useMemo(() => {
    const interviewJobs = filteredJobs.filter((j) => j.interviewDate);
    const offerJobs = filteredJobs.filter((j) => j.offerDate);

    const avgTimeToInterview =
      interviewJobs.length > 0
        ? Math.round(
            interviewJobs.reduce((acc, job) => {
              const applied = new Date(job.appliedDate || job.createdAt);
              const interview = new Date(job.interviewDate);
              return acc + (interview - applied) / (1000 * 60 * 60 * 24);
            }, 0) / interviewJobs.length
          )
        : 0;

    const avgTimeToOffer =
      offerJobs.length > 0
        ? Math.round(
            offerJobs.reduce((acc, job) => {
              const applied = new Date(job.appliedDate || job.createdAt);
              const offer = new Date(job.offerDate);
              return acc + (offer - applied) / (1000 * 60 * 60 * 24);
            }, 0) / offerJobs.length
          )
        : 0;

    return { avgTimeToInterview, avgTimeToOffer };
  }, [filteredJobs]);

  const successRate =
    stats.total > 0 ? ((stats.offers / stats.total) * 100).toFixed(1) : 0;

  // Conversion funnel data
  const funnelData = [
    {
      stage: "Applications",
      count: stats.total,
      color: COLORS.success,
      opacity: 0.2,
    },
    {
      stage: "Interviews",
      count: stats.interviews + stats.assessments,
      color: COLORS.success,
      opacity: 0.4,
    },
    {
      stage: "Offers",
      count: stats.offers,
      color: COLORS.success,
      opacity: 0.6,
    },
  ];

  const timelineData = useMemo(() => {
    const monthMap = {};
    const daysMap = { month: 30, quarter: 90, year: 365 };
    const monthCount =
      timeRange === "month" ? 1 : timeRange === "quarter" ? 3 : 12;

    for (let i = monthCount - 1; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const key = getMonthKey(date);
      monthMap[key] = {
        month: key,
        applications: 0,
        interviews: 0,
        offers: 0,
        rejections: 0,
      };
    }

    filteredJobs.forEach((job) => {
      const jobDate = new Date(job.appliedDate || job.createdAt);
      const key = getMonthKey(jobDate);
      if (monthMap[key]) {
        monthMap[key].applications += 1;
        if (job.status === "Rejected") {
          monthMap[key].rejections += 1;
        }
        if (job.status === "Interview" || job.status === "Assessment") {
          monthMap[key].interviews += 1;
        }
        if (job.status === "Offer") {
          monthMap[key].offers += 1;
        }
      }
    });

    return Object.values(monthMap);
  }, [filteredJobs, timeRange]);

  const companyData = useMemo(() => {
    return filteredJobs.reduce((acc, job) => {
      const existing = acc.find((c) => c.company === job.company);
      if (existing) existing.count += 1;
      else acc.push({ company: job.company, count: 1 });
      return acc;
    }, []);
  }, [filteredJobs]);

  const topCompanies = useMemo(() => {
    return companyData.sort((a, b) => b.count - a.count).slice(0, 5);
  }, [companyData]);

  const maxCompanyCount = topCompanies.length > 0 ? topCompanies[0].count : 1;

  // Key metrics (redesigned for impact)
  const keyMetrics = [
    {
      label: "Success Rate",
      value: `${successRate}%`,
      subtext: `${stats.offers} offers`,
      icon: <TrackChanges sx={{ fontSize: 20 }} />,
      highlight: true,
    },
    {
      label: "Avg. Time to Interview",
      value:
        timingMetrics.avgTimeToInterview > 0
          ? `${timingMetrics.avgTimeToInterview}d`
          : "—",
      subtext: "From application",
      icon: <Schedule sx={{ fontSize: 20 }} />,
    },
    {
      label: "Momentum",
      value: `${stats.total}`,
      subtext: `${timeRange === "month" ? "this month" : timeRange === "quarter" ? "this quarter" : "this year"}`,
      icon: <TrendingUp sx={{ fontSize: 20 }} />,
    },
  ];

  return (
    <Layout>
      {/* Improved Header */}
      <Box mb={6}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          flexWrap="wrap"
          gap={2}
          mb={4}
        >
          <Box>
            <Typography
              variant="h4"
              fontWeight={700}
              sx={{
                color: COLORS.success,
                mb: 1,
                fontSize: "28px",
                letterSpacing: "-0.5px",
              }}
            >
              Your Job Search Performance
            </Typography>
            <Typography
              color="text.secondary"
              variant="body2"
              sx={{ fontSize: "14px" }}
            >
              Track applications, interviews, and offers in one place
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

        {/* Key Metrics - Redesigned */}
        <Grid container spacing={2}>
          {keyMetrics.map((metric) => (
            <Grid item xs={12} sm={6} md={4} key={metric.label}>
              <Box
                sx={{
                  padding: "20px",
                  background: metric.highlight
                    ? COLORS.successLight
                    : "#F9FAFB",
                  border: `1px solid ${metric.highlight ? COLORS.success + "30" : COLORS.border}`,
                  borderRadius: "12px",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    borderColor: metric.highlight
                      ? COLORS.success
                      : COLORS.neutral,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                  },
                }}
              >
                <Box display="flex" alignItems="flex-start" gap={2}>
                  <Box
                    sx={{
                      padding: "8px",
                      background: metric.highlight
                        ? COLORS.success
                        : COLORS.neutral,
                      color: "white",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {metric.icon}
                  </Box>
                  <Box flex={1}>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: 500,
                        color: COLORS.neutral,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        mb: 0.5,
                      }}
                    >
                      {metric.label}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: metric.highlight ? "32px" : "24px",
                        fontWeight: 700,
                        color: "#111827",
                        mb: 0.5,
                      }}
                    >
                      {metric.value}
                    </Typography>
                    <Typography
                      sx={{ fontSize: "13px", color: COLORS.neutral }}
                    >
                      {metric.subtext}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ my: 5, borderColor: COLORS.border }} />

      {/* Conversion Funnel - The Hero Section */}
      <Grid container spacing={5} sx={{ mb: 5 }}>
        <Grid item xs={12} md={6}>
          <SectionTitle>Conversion Funnel</SectionTitle>
          {stats.total > 0 ? (
            <Box display="flex" flexDirection="column" gap={2}>
              {funnelData.map((stage, idx) => {
                const percentage =
                  stats.total > 0
                    ? ((stage.count / stats.total) * 100).toFixed(1)
                    : 0;
                const conversionRate =
                  idx === 0
                    ? 100
                    : ((stage.count / funnelData[idx - 1].count) * 100).toFixed(
                        1
                      );

                return (
                  <Box key={stage.stage}>
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: 600,
                            color: "#111827",
                          }}
                        >
                          {stage.stage}
                        </Typography>
                        {idx > 0 && (
                          <Typography
                            sx={{
                              fontSize: "12px",
                              color: COLORS.neutral,
                            }}
                          >
                            ({conversionRate}% conversion)
                          </Typography>
                        )}
                      </Box>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 700,
                          color: COLORS.success,
                        }}
                      >
                        {stage.count}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        height: "12px",
                        background: "#F3F4F6",
                        borderRadius: "6px",
                        overflow: "hidden",
                        position: "relative",
                      }}
                    >
                      <Box
                        sx={{
                          height: "100%",
                          width: `${percentage}%`,
                          background: `linear-gradient(90deg, ${COLORS.success} 0%, ${COLORS.success}cc 100%)`,
                          borderRadius: "6px",
                          transition: "width 0.4s ease",
                        }}
                      />
                    </Box>

                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: COLORS.neutral,
                        mt: 0.5,
                      }}
                    >
                      {percentage}% of total applications
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          ) : (
            <Box
              sx={{
                padding: "40px 20px",
                textAlign: "center",
                background: "#F9FAFB",
                borderRadius: "12px",
              }}
            >
              <Typography color="text.secondary">
                No applications yet
              </Typography>
            </Box>
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          <SectionTitle>Top Companies</SectionTitle>
          {topCompanies.length > 0 ? (
            <Box display="flex" flexDirection="column" gap={2}>
              {topCompanies.map((company, index) => (
                <Box key={index}>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <MuiTooltip title={company.company} arrow>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "#111827",
                          maxWidth: "70%",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {company.company}
                      </Typography>
                    </MuiTooltip>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 700,
                        color: COLORS.success,
                      }}
                    >
                      {company.count}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      height: "8px",
                      background: "#F3F4F6",
                      borderRadius: "4px",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        height: "100%",
                        width: `${(company.count / maxCompanyCount) * 100}%`,
                        background: `linear-gradient(90deg, ${COLORS.success} 0%, ${COLORS.success}cc 100%)`,
                        borderRadius: "4px",
                        transition: "width 0.3s ease",
                      }}
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          ) : (
            <Box
              sx={{
                padding: "40px 20px",
                textAlign: "center",
                background: "#F9FAFB",
                borderRadius: "12px",
              }}
            >
              <Typography color="text.secondary">
                No applications yet
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>

      <Divider sx={{ my: 5, borderColor: COLORS.border }} />

      {/* Application Timeline */}
      <Box sx={{ mb: 5 }}>
        <SectionTitle>Application Activity</SectionTitle>
        {timelineData.some((d) => d.applications > 0) ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={timelineData}
              margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={COLORS.border}
                vertical={false}
              />
              <XAxis
                dataKey="month"
                stroke={COLORS.neutral}
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke={COLORS.neutral}
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
              <Legend wrapperStyle={{ fontSize: 13, paddingTop: "16px" }} />
              <Bar
                dataKey="applications"
                fill={COLORS.success}
                radius={[4, 4, 0, 0]}
                maxBarSize={28}
              />
              <Bar
                dataKey="rejections"
                fill={COLORS.friction}
                radius={[4, 4, 0, 0]}
                maxBarSize={28}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <Box
            sx={{
              height: 300,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#F9FAFB",
              borderRadius: "12px",
            }}
          >
            <Typography color="text.secondary">
              No applications in this period
            </Typography>
          </Box>
        )}
      </Box>

      <Divider sx={{ my: 5, borderColor: COLORS.border }} />

      {/* Cumulative Trend */}
      <Box>
        <SectionTitle>Your Progress Over Time</SectionTitle>
        {timelineData.some((d) => d.applications > 0) ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={timelineData}
              margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={COLORS.border}
                vertical={false}
              />
              <XAxis
                dataKey="month"
                stroke={COLORS.neutral}
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke={COLORS.neutral}
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
              <Legend wrapperStyle={{ fontSize: 13, paddingTop: "16px" }} />
              <Line
                type="monotone"
                dataKey="applications"
                stroke={COLORS.success}
                strokeWidth={2.5}
                dot={{ fill: COLORS.success, r: 4 }}
                name="Applications"
              />
              <Line
                type="monotone"
                dataKey="offers"
                stroke={COLORS.success}
                strokeWidth={2.5}
                strokeDasharray="5 5"
                dot={{ fill: COLORS.success, r: 4 }}
                name="Offers"
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <Box
            sx={{
              height: 300,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#F9FAFB",
              borderRadius: "12px",
            }}
          >
            <Typography color="text.secondary">
              No applications in this period
            </Typography>
          </Box>
        )}
      </Box>
    </Layout>
  );
}
