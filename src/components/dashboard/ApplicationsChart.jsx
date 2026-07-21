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
  "#10B981", // Green - Applied
  "#06B6D4", // Cyan - Phone Screen
  "#14B8A6", // Teal - Interview
  "#8B5CF6", // Purple - Final Round
  "#F59E0B", // Amber - Offer
  "#EF4444", // Red - Rejected
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
        borderRadius: 3,
        height: "100%",
        background: "#FFFFFF",
        border: "1px solid rgba(229, 231, 235, 0.8)",
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "linear-gradient(90deg, #10B981 0%, #059669 100%)",
        },
        "&:hover": {
          borderColor: "rgba(16, 185, 129, 0.2)",
          boxShadow: "0 8px 16px rgba(16, 185, 129, 0.06)",
        },
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          p: 3,
        }}
      >
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{
              color: "#111827",
              fontSize: "1rem",
              mb: 0.5,
            }}
          >
            Applications by Status
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: "#9CA3AF",
              fontSize: "0.85rem",
            }}
          >
            Track your applications across all stages
          </Typography>
        </Box>

        {/* Chart Container */}
        <Box
          sx={{
            flex: 1,
            minHeight: 300,
            "& .recharts-surface": {
              overflow: "visible !important",
            },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 16, right: 8, left: -20, bottom: 60 }}
            >
              <defs>
                {COLORS.map((color, i) => (
                  <linearGradient
                    key={`gradient-${i}`}
                    id={`colorGradient-${i}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor={color} stopOpacity={0.9} />
                    <stop offset="100%" stopColor={color} stopOpacity={0.6} />
                  </linearGradient>
                ))}
              </defs>

              <CartesianGrid
                strokeDasharray="4 4"
                stroke="rgba(229, 231, 235, 0.6)"
                vertical={false}
              />
              <XAxis
                dataKey="status"
                stroke="#9CA3AF"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: "rgba(229, 231, 235, 0.5)" }}
                angle={-45}
                textAnchor="end"
                height={80}
                interval={0}
              />
              <YAxis
                stroke="#9CA3AF"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: "rgba(229, 231, 235, 0.5)" }}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  background: "rgba(15, 23, 42, 0.95)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  borderRadius: 8,
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                  padding: "10px 12px",
                }}
                labelStyle={{ color: "#fff", fontWeight: 600 }}
                cursor={{ fill: "rgba(16, 185, 129, 0.06)" }}
              />
              <Bar
                dataKey="count"
                radius={[8, 8, 0, 0]}
                maxBarSize={52}
                animationDuration={600}
              >
                {data.map((entry, i) => (
                  <Cell
                    key={entry.status}
                    fill={`url(#colorGradient-${i % COLORS.length})`}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}
