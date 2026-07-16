import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, Typography, Box, Stack } from "@mui/material";
import { useJobs } from "../../context/JobContext";

const COLORS = [
  "#10B981",
  "#06B6D4",
  "#14B8A6",
  "#8B5CF6",
  "#F59E0B",
  "#EF4444",
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
  const total = jobs.length;

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
        sx={{ display: "flex", flexDirection: "column", height: "50%" }}
      >
        <Typography
          variant="h2"
          mb={50}
          sx={{ color: "#111827", fontWeight: 600 }}
        >
          Status Distribution
        </Typography>

        <Box sx={{ position: "relative", flex: 1, minHeight: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius="60%"
                outerRadius="85%"
                paddingAngle={3}
              >
                {data.map((entry, i) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[i % COLORS.length]}
                    stroke="none"
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "rgba(15, 23, 42, 0.9)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: 8,
                  backdropFilter: "blur(8px)",
                }}
                labelStyle={{ color: "#fff" }}
              />
            </PieChart>
          </ResponsiveContainer>

          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
            }}
          >
            <Typography variant="h4" fontWeight={700} color="#111827">
              {total}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Total
            </Typography>
          </Box>
        </Box>

        <Stack spacing={1} mt={2}>
          {data.map((entry, i) => (
            <Box
              key={entry.name}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box display="flex" alignItems="center" gap={1}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: COLORS[i % COLORS.length],
                  }}
                />
                <Typography variant="body2" color="text.secondary">
                  {entry.name}
                </Typography>
              </Box>
              <Typography variant="body2" fontWeight={600} color="#111827">
                {entry.value}
              </Typography>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
