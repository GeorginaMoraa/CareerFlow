import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  LinearProgress,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  Add,
  EmojiEvents,
  EventAvailable,
  HourglassTop,
  WorkOutlined,
} from "@mui/icons-material";

import PageHeader from "../components/common/PageHeader";
import EmptyState from "../components/common/EmptyState";
import StatCard from "../components/dashboard/StatCard";
import StatusChart from "../components/dashboard/StatusChart";
import { useJobs } from "../hooks/useJobs";
import { useSettings } from "../hooks/useSettings";
import { formatDate } from "../utils/helpers";
import { getStats, recentActivity, upcomingInterviews } from "../utils/stats";

function Panel({ title, action, children }) {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography variant="h6">{title}</Typography>
          {action}
        </Box>
        {children}
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const { jobs, loadSampleData } = useJobs();
  const { profile } = useSettings();
  const navigate = useNavigate();

  const stats = useMemo(() => getStats(jobs), [jobs]);
  const upcoming = useMemo(() => upcomingInterviews(jobs, 5), [jobs]);
  const activity = useMemo(() => recentActivity(jobs, 6), [jobs]);

  return (
    <>
      <PageHeader
        title="Career dashboard"
        subtitle={`Welcome back${profile.firstName ? `, ${profile.firstName}` : ""}. Here's your job search at a glance.`}
        action={
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => navigate("/applications")}
          >
            Add application
          </Button>
        }
      />

      {jobs.length === 0 ? (
        <EmptyState
          icon={<WorkOutlined />}
          title="Welcome to CareerFlow"
          message="Start tracking your job search. Add your first application, or load sample data to see how everything works."
        >
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => navigate("/applications")}
          >
            Add your first application
          </Button>
          <Button variant="outlined" onClick={loadSampleData}>
            Load sample data
          </Button>
        </EmptyState>
      ) : (
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard
              title="Total applications"
              value={stats.total}
              icon={<WorkOutlined />}
              color="#3B82F6"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard
              title="In progress"
              value={stats.active}
              subtitle="Applied, assessment or interview"
              icon={<HourglassTop />}
              color="#8B5CF6"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard
              title="Interviews"
              value={stats.byStatus.Interview}
              subtitle={`${upcoming.length} upcoming`}
              icon={<EventAvailable />}
              color="#F59E0B"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard
              title="Offers"
              value={stats.byStatus.Offer}
              subtitle={`${stats.offerRate}% offer rate`}
              icon={<EmojiEvents />}
              color="#10B981"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Panel title="Status breakdown">
              <StatusChart byStatus={stats.byStatus} />
            </Panel>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Panel
              title="Upcoming interviews"
              action={
                <Button size="small" onClick={() => navigate("/calendar")}>
                  Calendar
                </Button>
              }
            >
              {upcoming.length === 0 ? (
                <Typography color="text.secondary" py={2}>
                  No upcoming interviews. Schedule one from the calendar or an
                  application page.
                </Typography>
              ) : (
                <List disablePadding>
                  {upcoming.map(({ job, interview, at }) => (
                    <ListItemButton
                      key={interview.id}
                      onClick={() => navigate(`/applications/${job.id}`)}
                      sx={{ borderRadius: 2 }}
                    >
                      <ListItemText
                        primary={`${job.company} · ${interview.type || "Interview"}`}
                        secondary={`${formatDate(at, "EEE, MMM d")} at ${interview.time || "—"}`}
                      />
                    </ListItemButton>
                  ))}
                </List>
              )}
            </Panel>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Panel title="Funnel">
              {[
                ["Response rate", stats.responseRate],
                ["Interview rate", stats.interviewRate],
                ["Offer rate", stats.offerRate],
              ].map(([label, value]) => (
                <Box key={label} sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 0.5,
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      {label}
                    </Typography>
                    <Typography variant="body2" fontWeight={700}>
                      {value}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={value}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
              ))}
            </Panel>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Panel title="Recent activity">
              <List disablePadding>
                {activity.map(({ job, event }) => (
                  <ListItemButton
                    key={`${job.id}-${event.id}`}
                    onClick={() => navigate(`/applications/${job.id}`)}
                    sx={{ borderRadius: 2 }}
                  >
                    <ListItemText
                      primary={`${job.company} — ${event.title}`}
                      secondary={formatDate(event.date)}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Panel>
          </Grid>
        </Grid>
      )}
    </>
  );
}
