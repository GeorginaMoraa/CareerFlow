import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { Card, CardContent, Typography } from "@mui/material";
import { useJobs } from "../../context/JobContext";

const COLORS = [
  "#2563EB",
  "#22C55E",
  "#F59E0B",
  "#EF4444",
  "#7C3AED",
];

export default function StatusPieChart() {
  const { jobs } = useJobs();

  const statusCounts = jobs.reduce((acc, job) => {
    const status = job.status || "Applied";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(statusCounts).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <Card elevation={0} sx={{ borderRadius: 4 }}>
      <CardContent>
        <Typography variant="h6" mb={10}>
          Status Distribution
        </Typography>

        <ResponsiveContainer width={500} height={400}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              outerRadius={100}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}