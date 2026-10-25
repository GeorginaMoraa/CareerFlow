import { useMemo, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { BarChart as BarChartIcon } from "@mui/icons-material";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { subDays, parseISO } from "date-fns";
import { useTheme } from "@mui/material/styles";

import PageHeader from "../components/common/PageHeader";
import EmptyState from "../components/common/EmptyState";
import StatCard from "../components/dashboard/StatCard";
import StatusChart from "../components/dashboard/StatusChart";
import { useJobs } from "../hooks/useJobs";
import {
  APPLICATION_STATUS,
  STATUS_HEX,
  WORK_TYPES,
} from "../constants/application";
import { applicationsByMonth, getStats } from "../utils/stats";

const RANGES = {
  30: "Last 30 days",
  90: "Last 90 days",
  365: "Last 12 months",
  all: "All time",
};

function ChartCard({ title, children }) {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h6" mb={2}>
          {title}
        </Typography>
        {children}
      </CardContent>
    </Card>
  );
}

export default function Analytics() {
  const { jobs } = useJobs();
  const theme = useTheme();
  const [range, setRange] = useState("90");

  const filtered = useMemo(() => {
    if (range === "all") return jobs;
    const cutoff = subDays(new Date(), Number(range));
    return jobs.filter(
      (j) => j.dateApplied && parseISO(j.dateApplied) >= cutoff
    );
  }, [jobs, range]);

  const stats = useMemo(() => getStats(filtered), [filtered]);
  const monthly = useMemo(() => applicationsByMonth(jobs, 6), [jobs]);

  const funnel = APPLICATION_STATUS.map((status) => ({
    status,
    count: stats.byStatus[status],
  }));

  const workTypes = [...WORK_TYPES, "Not specified"].map((type) => ({
    type,
    count: filtered.filter((j) => (j.workType || "Not specified") === type)
      .length,
  }));

  const axis = { stroke: theme.palette.text.secondary, fontSize: 12 };
  const grid = theme.palette.divider;

  if (jobs.length === 0) {
    return (
      <>
        <PageHeader
          title="Analytics"
          subtitle="Understand how your job search is performing"
        />
        <EmptyState
          icon={<BarChartIcon />}
          title="No data to analyse yet"
          message="Add some applications and your analytics will show up here."
        />
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Analytics"
        subtitle="Understand how your job search is performing"
        action={
          <TextField
            select
            size="small"
            value={range}
            onChange={(e) => setRange(e.target.value)}
            sx={{ minWidth: 170 }}
          >
            {Object.entries(RANGES).map(([value, label]) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </TextField>
        }
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Applications"
            value={stats.total}
            icon={<span>#</span>}
            color="#3B82F6"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Response rate"
            value={`${stats.responseRate}%`}
            subtitle="Moved past 'Applied'"
            icon={<span>↩</span>}
            color="#8B5CF6"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Interview rate"
            value={`${stats.interviewRate}%`}
            icon={<span>🗣</span>}
            color="#F59E0B"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Offer rate"
            value={`${stats.offerRate}%`}
            icon={<span>🎉</span>}
            color="#10B981"
          />
        </Grid>

        {filtered.length === 0 ? (
          <Grid size={12}>
            <EmptyState
              title="No applications in this period"
              message="Try a longer time range."
            />
          </Grid>
        ) : (
          <>
            <Grid size={{ xs: 12, md: 6 }}>
              <ChartCard title="Applications per month">
                <Box sx={{ height: 260 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthly}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={grid}
                        vertical={false}
                      />
                      <XAxis dataKey="month" {...axis} />
                      <YAxis allowDecimals={false} {...axis} />
                      <Tooltip cursor={{ fill: theme.palette.action.hover }} />
                      <Bar
                        dataKey="applications"
                        fill="#10B981"
                        radius={[6, 6, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </ChartCard>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <ChartCard title="Status distribution">
                <StatusChart byStatus={stats.byStatus} />
              </ChartCard>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <ChartCard title="Pipeline funnel">
                <Box sx={{ height: 260 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={funnel}
                      layout="vertical"
                      margin={{ left: 20 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={grid}
                        horizontal={false}
                      />
                      <XAxis type="number" allowDecimals={false} {...axis} />
                      <YAxis
                        type="category"
                        dataKey="status"
                        width={90}
                        {...axis}
                      />
                      <Tooltip cursor={{ fill: theme.palette.action.hover }} />
                      <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                        {funnel.map((d) => (
                          <Cell key={d.status} fill={STATUS_HEX[d.status]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </ChartCard>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <ChartCard title="By work type">
                <Box sx={{ height: 260 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={workTypes}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={grid}
                        vertical={false}
                      />
                      <XAxis dataKey="type" {...axis} />
                      <YAxis allowDecimals={false} {...axis} />
                      <Tooltip cursor={{ fill: theme.palette.action.hover }} />
                      <Bar
                        dataKey="count"
                        fill="#06B6D4"
                        radius={[6, 6, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </ChartCard>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
}
