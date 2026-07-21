import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { useJobs } from "../../context/JobContext";

// Icons placeholder - replace with actual icons from lucide-react or @mui/icons-material
const StatCard = ({ title, value, subtitle, gradient, icon, trend }) => {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        background: "#FFFFFF",
        border: "1px solid rgba(229, 231, 235, 0.8)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative",
        overflow: "hidden",
        height: "100%",
        "&:hover": {
          transform: "translateY(-4px)",
          borderColor: "rgba(16, 185, 129, 0.2)",
          boxShadow: "0 12px 24px rgba(16, 185, 129, 0.08)",
        },
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: gradient,
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Header with icon and trend */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 2,
          }}
        >
          <Box
            sx={{
              width: 44,
              height: 44,
              background: `linear-gradient(135deg, ${gradient})`,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
              fontSize: "1.5rem",
            }}
          >
            {icon}
          </Box>

          {trend && (
            <Box
              sx={{
                background: "rgba(16, 185, 129, 0.1)",
                color: "#059669",
                px: 1.5,
                py: 0.5,
                borderRadius: 1.5,
                fontSize: "0.75rem",
                fontWeight: 700,
              }}
            >
              {trend}
            </Box>
          )}
        </Box>

        {/* Value and Title */}
        <Typography
          variant="h4"
          fontWeight={800}
          sx={{
            color: "#111827",
            mb: 0.5,
            fontSize: { xs: "1.75rem", md: "2rem" },
          }}
        >
          {value}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#6B7280",
            fontWeight: 500,
            fontSize: "0.9rem",
            mb: 1,
          }}
        >
          {title}
        </Typography>

        {subtitle && (
          <Typography
            variant="caption"
            sx={{
              color: "#9CA3AF",
              fontSize: "0.8rem",
              display: "block",
            }}
          >
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default function DashboardCards() {
  const { jobs } = useJobs();

  const totalApplications = jobs.length;
  const activeApplications = jobs.filter(
    (job) => job.status !== "Offer" && job.status !== "Rejected"
  ).length;
  const interviews = jobs.filter(
    (job) => job.interviews && job.interviews.length > 0
  ).length;
  const offers = jobs.filter((job) => job.status === "Offer").length || 0;

  const stats = [
    {
      title: "Total Applications",
      value: totalApplications,
      subtitle: "All submissions",
      gradient: "135deg, #10B981 0%, #059669 100%",
      icon: "",
      trend: totalApplications > 0 ? `+${totalApplications}` : "0",
    },
    {
      title: "Active Positions",
      value: activeApplications,
      subtitle: "In progress",
      gradient: "135deg, #06B6D4 0%, #0891B2 100%",
      icon: "",
      trend: activeApplications > 0 ? `${activeApplications}` : "0",
    },
    {
      title: "Interviews",
      value: interviews,
      subtitle: "Scheduled meetings",
      gradient: "135deg, #14B8A6 0%, #0D9488 100%",
      icon: "",
      trend: interviews > 0 ? `+${interviews}` : "0",
    },
    {
      title: "Offers Received",
      value: offers,
      subtitle: "Ready to decide",
      gradient: "135deg, #F59E0B 0%, #D97706 100%",
      icon: "",
      trend: offers > 0 ? `+${offers}` : "0",
    },
  ];

  return (
    <Grid container spacing={3}>
      {stats.map((stat, index) => (
        <Grid item xs={12} sm={6} lg={3} key={index}>
          <StatCard {...stat} />
        </Grid>
      ))}
    </Grid>
  );
}
