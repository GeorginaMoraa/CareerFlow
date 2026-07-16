import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { useJobs } from "../../context/JobContext";

const COLORS = [
  "#10B981",
  "#06B6D4",
  "#14B8A6",
  "#8B5CF6",
  "#F59E0B",
  "#EF4444",
];

export default function ApplicationsChart() {
  const { jobs } = useJobs();
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
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        height: "100%",
        background: "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.4)",
        boxShadow:
          "0 2px 8px rgba(0, 0, 0, 0.06), inset 0 1px 1px rgba(255, 255, 255, 0.5)",
      }}
    >
      <CardContent
        sx={{ display: "flex", flexDirection: "column", height: "100%" }}
      >
        <Typography
          variant="h2"
          mb={50}
          sx={{ color: "#111827", fontWeight: 500 }}
        >
          Applications by Status
        </Typography>

        <Box sx={{ flex: 1, minHeight: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(229, 231, 235, 0.5)"
                vertical={false}
              />
              <XAxis
                dataKey="status"
                stroke="#6B7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#6B7280"
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
                  backdropFilter: "blur(8px)",
                }}
                labelStyle={{ color: "#fff" }}
                cursor={{ fill: "rgba(16, 185, 129, 0.08)" }}
              />
              <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={48}>
                {data.map((entry, i) => (
                  <Cell key={entry.status} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}
