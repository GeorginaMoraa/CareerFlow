import { Card, CardContent, Typography, Stack } from "@mui/material";
import { useJobs } from "../../context/JobContext";

export default function CareerInsights() {
  const { jobs } = useJobs();

  const total = jobs.length;

  const interviews = jobs.filter(
    (job) => job.status === "Interview"
  ).length;

  const offers = jobs.filter(
    (job) => job.status === "Offer"
  ).length;

  const rejected = jobs.filter(
    (job) => job.status === "Rejected"
  ).length;

  const interviewRate =
    total > 0
      ? Math.round((interviews / total) * 100)
      : 0;

  return (
    <Card sx={{ borderRadius: 4 }}>
      <CardContent>

        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
        >
          Career Insights
        </Typography>

        <Stack spacing={2}>

          <Typography>
            🎯 Total Applications:
            <strong> {total}</strong>
          </Typography>

          <Typography>
            📞 Interview Rate:
            <strong> {interviewRate}%</strong>
          </Typography>

          <Typography>
            🎉 Offers:
            <strong> {offers}</strong>
          </Typography>

          <Typography>
            ❌ Rejections:
            <strong> {rejected}</strong>
          </Typography>

        </Stack>

      </CardContent>
    </Card>
  );
}