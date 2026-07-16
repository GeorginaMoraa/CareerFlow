import { Card, Box, Typography, Divider } from "@mui/material";
import {
  Work,
  CalendarMonth,
  EmojiEvents,
  TrendingUp,
  ArrowUpward,
  ArrowDownward,
} from "@mui/icons-material";
import { useJobs } from "../../context/JobContext";

export default function DashboardCards() {
  const { jobs } = useJobs();
  const applications = jobs.length;
  const interviews = jobs.filter((j) => j.status === "Interview").length;
  const offers = jobs.filter((j) => j.status === "Offer").length;
  const successRate =
    applications === 0 ? 0 : Math.round((offers / applications) * 100);

  const stats = [
    {
      title: "Applications",
      value: applications,
      color: "#10B981",
      icon: <Work />,
      trend: "+12%",
      up: true,
    },
    {
      title: "Interviews",
      value: interviews,
      color: "#06B6D4",
      icon: <CalendarMonth />,
      trend: "+3",
      up: true,
    },
    {
      title: "Offers",
      value: offers,
      color: "#14B8A6",
      icon: <EmojiEvents />,
      trend: `${offers}`,
      up: offers > 0,
    },
    {
      title: "Success Rate",
      value: `${successRate}%`,
      color: "#8B5CF6",
      icon: <TrendingUp />,
      trend: successRate >= 15 ? "On track" : "Low",
      up: successRate >= 15,
    },
  ];

  return (
    <Card
      sx={{
        borderRadius: 4,
        background: "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.4)",
        boxShadow:
          "0 2px 8px rgba(0, 0, 0, 0.06), inset 0 1px 1px rgba(255, 255, 255, 0.5)",
        p: { xs: 2, md: 3 },
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" },
        rowGap: { xs: 2.5, sm: 3 },
        columnGap: 2,
      }}
    >
      {stats.map((s, i) => (
        <Box
          key={s.title}
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
              background: `linear-gradient(135deg, ${s.color} 0%, ${s.color}dd 100%)`,
              boxShadow: `0 4px 12px ${s.color}40`,
            }}
          >
            {s.icon}
          </Box>

          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              fontWeight={600}
              noWrap
              sx={{ mb: 0.3 }}
            >
              {s.title}
            </Typography>

            <Box display="flex" alignItems="baseline" gap={1}>
              <Typography
                variant="h5"
                fontWeight={700}
                color="#111827"
                sx={{ lineHeight: 1 }}
              >
                {s.value}
              </Typography>

              <Box display="flex" alignItems="center" gap={0.2}>
                {s.up ? (
                  <ArrowUpward sx={{ fontSize: 12, color: "#10B981" }} />
                ) : (
                  <ArrowDownward sx={{ fontSize: 12, color: "#EF4444" }} />
                )}
                <Typography
                  variant="caption"
                  fontWeight={700}
                  sx={{ color: s.up ? "#059669" : "#DC2626" }}
                >
                  {s.trend}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      ))}
    </Card>
  );
}
