import { Card, CardContent, Typography, Box, Stack, Chip } from "@mui/material";
import { useJobs } from "../../context/JobContext";

const InsightCard = ({ icon, title, description, metric, color, trend }) => {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 2.5,
        background: "#FFFFFF",
        border: "1px solid rgba(229, 231, 235, 0.8)",
        transition: "all 0.3s ease",
        height: "100%",
        "&:hover": {
          transform: "translateY(-2px)",
          borderColor: `${color}33`,
          boxShadow: `0 8px 16px ${color}10`,
        },
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              background: `${color}15`,
              borderRadius: 1.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.25rem",
              flexShrink: 0,
            }}
          >
            {icon}
          </Box>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 1,
                mb: 0.5,
              }}
            >
              <Typography
                variant="body2"
                fontWeight={700}
                sx={{
                  color: "#111827",
                  fontSize: "0.9rem",
                }}
              >
                {title}
              </Typography>
              {trend && (
                <Chip
                  size="small"
                  label={trend}
                  sx={{
                    height: "20px",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    background: `${color}20`,
                    color: color,
                  }}
                />
              )}
            </Box>

            <Typography
              variant="caption"
              sx={{
                color: "#6B7280",
                fontSize: "0.8rem",
                lineHeight: 1.4,
                display: "block",
                mb: 1,
              }}
            >
              {description}
            </Typography>

            {metric && (
              <Typography
                sx={{
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  color: color,
                }}
              >
                {metric}
              </Typography>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default function CareerInsights() {
  const { jobs } = useJobs();

  // Calculate insights
  const totalApplications = jobs.length;
  const activeApplications = jobs.filter(
    (job) => job.status !== "Rejected" && job.status !== "Offer"
  ).length;
  const averageTimeToInterview = jobs.filter(
    (job) => job.interviews && job.interviews.length > 0
  ).length;
  const successRate =
    totalApplications > 0
      ? (
          (jobs.filter((job) => job.status === "Offer").length /
            totalApplications) *
          100
        ).toFixed(1)
      : 0;

  const upcomingInterviews = jobs.reduce((count, job) => {
    if (job.interviews) {
      const upcoming = job.interviews.filter(
        (interview) => new Date(interview.date) >= new Date()
      );
      return count + upcoming.length;
    }
    return count;
  }, 0);

  const mostActiveCompanies = Object.entries(
    jobs.reduce((acc, job) => {
      acc[job.company] = (acc[job.company] || 0) + 1;
      return acc;
    }, {})
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const insights = [
    {
      icon: "📈",
      title: "Success Rate",
      description: "Offer received out of total applications",
      metric: `${successRate}%`,
      color: "#10B981",
      trend:
        successRate > 0
          ? `↑ ${jobs.filter((job) => job.status === "Offer").length} offers`
          : "No offers yet",
    },
    {
      icon: "📅",
      title: "Upcoming Interviews",
      description: "Scheduled interviews in your pipeline",
      metric: upcomingInterviews,
      color: "#06B6D4",
      trend: `+${upcomingInterviews}`,
    },
    {
      icon: "🎯",
      title: "Active Pipeline",
      description: "Applications still in progress",
      metric: activeApplications,
      color: "#14B8A6",
      trend: `${activeApplications} in review`,
    },
    {
      icon: "🏢",
      title: "Top Companies",
      description:
        mostActiveCompanies.length > 0
          ? `${mostActiveCompanies.map((c) => c[0]).join(", ")}`
          : "No applications yet",
      metric:
        mostActiveCompanies.length > 0 ? `${mostActiveCompanies[0][1]}` : "0",
      color: "#8B5CF6",
      trend: mostActiveCompanies.length > 0 ? "Most active" : "Add companies",
    },
  ];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        },
        gap: 2,
      }}
    >
      {insights.map((insight, index) => (
        <InsightCard key={index} {...insight} />
      ))}
    </Box>
  );
}
