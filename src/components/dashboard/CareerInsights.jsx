import { Card, Box, Typography } from "@mui/material";
import { useJobs } from "../../context/JobContext";

export default function CareerInsights() {
  const { jobs } = useJobs();
  const total = jobs.length;
  const interviews = jobs.filter((j) => j.status === "Interview").length;
  const offers = jobs.filter((j) => j.status === "Offer").length;
  const rejected = jobs.filter((j) => j.status === "Rejected").length;
  const interviewRate = total > 0 ? Math.round((interviews / total) * 100) : 0;

  const items = [
    {
      emoji: "🎯",
      label: "Total Applications",
      value: total,
      color: "#10B981",
    },
    {
      emoji: "📞",
      label: "Interview Rate",
      value: `${interviewRate}%`,
      color: "#06B6D4",
    },
    { emoji: "🎉", label: "Offers", value: offers, color: "#14B8A6" },
    { emoji: "❌", label: "Rejections", value: rejected, color: "#EF4444" },
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
        gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(4, 1fr)" },
        rowGap: 2.5,
        columnGap: 2,
      }}
    >
      {items.map((it) => (
        <Box key={it.label} display="flex" alignItems="center" gap={1.5}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 2,
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              background: `${it.color}1A`,
            }}
          >
            {it.emoji}
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              noWrap
              sx={{ display: "block" }}
            >
              {it.label}
            </Typography>
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{ color: it.color, lineHeight: 1.2 }}
            >
              {it.value}
            </Typography>
          </Box>
        </Box>
      ))}
    </Card>
  );
}
