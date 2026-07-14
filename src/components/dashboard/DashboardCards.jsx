import Grid from "@mui/material/Grid";
import {
  Work,
  CalendarMonth,
  EmojiEvents,
  TrendingUp,
} from "@mui/icons-material";

import StatCard from "./StatCard";
import { useJobs } from "../../context/JobContext";

export default function DashboardCards() {
  const { jobs } = useJobs();

  const applications = jobs.length;

  const interviews = jobs.filter(
    (job) => job.status === "Interview"
  ).length;

  const offers = jobs.filter(
    (job) => job.status === "Offer"
  ).length;

  const successRate =
    applications === 0
      ? 0
      : Math.round((offers / applications) * 100);

  return (
    <Grid container spacing={3}>
      <Grid item xs={2} md={6} lg={3}>
        <StatCard
          title="Applications"
          value={applications}
          color="#2563EB"
          icon={<Work />}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <StatCard
          title="Interviews"
          value={interviews}
          color="#F59E0B"
          icon={<CalendarMonth />}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <StatCard
          title="Offers"
          value={offers}
          color="#22C55E"
          icon={<EmojiEvents />}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <StatCard
          title="Success Rate"
          value={`${successRate}%`}
          color="#7C3AED"
          icon={<TrendingUp />}
        />
      </Grid>
    </Grid>
  );
}