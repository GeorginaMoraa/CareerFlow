import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { Card, CardContent, Typography } from "@mui/material";
import { useJobs } from "../../context/JobContext";

export default function ApplicationsChart() {
  const { jobs } = useJobs();

  // Count jobs by status
  const statusCounts = jobs.reduce((acc, job) => {
    const status = job.status || "Applied";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(statusCounts).map(([status, count]) => ({
    status,
    count,
  }));

  return (
    <Card elevation={0} sx={{ borderRadius: 4 }}>
      <CardContent>
        <Typography variant="h6" mb={2}>
          Applications by Status
        </Typography>

        <ResponsiveContainer width={500} height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#2563EB" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}