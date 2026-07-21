import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, Typography, Box, Stack } from "@mui/material";
import { useJobs } from "../../context/JobContext";

const COLORS = [
  "#10B981", // Applied - Green
  "#06B6D4", // Phone Screen - Cyan
  "#14B8A6", // Interview - Teal
  "#8B5CF6", // Final Round - Purple
  "#F59E0B", // Offer - Amber
  "#EF4444", // Rejected - Red
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
          background: "linear-gradient(90deg, #F59E0B 0%, #D97706 100%)",
        },
        "&:hover": {
          borderColor: "rgba(245, 158, 11, 0.2)",
          boxShadow: "0 8px 16px rgba(245, 158, 11, 0.06)",
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
            Status Distribution
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: "#9CA3AF",
              fontSize: "0.85rem",
            }}
          >
            Overview of application statuses
          </Typography>
        </Box>

        {/* Chart and Legend Container */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flex: 1,
            minHeight: 300,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Pie Chart Section */}
          <Box
            sx={{
              flex: 0.55,
              position: "relative",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  innerRadius="45%"
                  outerRadius="75%"
                  paddingAngle={2}
                  animationDuration={600}
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
                    background: "rgba(15, 23, 42, 0.95)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    borderRadius: 8,
                    backdropFilter: "blur(12px)",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                    padding: "8px 12px",
                  }}
                  labelStyle={{ color: "#fff", fontWeight: 600 }}
                  formatter={(value) => `${value} applications`}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Center Stats */}
            <Box
              sx={{
                position: "absolute",
                textAlign: "center",
                zIndex: 1,
              }}
            >
              <Typography
                variant="h5"
                fontWeight={800}
                sx={{
                  color: "#111827",
                }}
              >
                {total}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "#9CA3AF",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                }}
              >
                Total
              </Typography>
            </Box>
          </Box>

          {/* Legend Section */}
          <Stack
            spacing={1.5}
            sx={{
              flex: 0.45,
              maxHeight: "100%",
              overflowY: "auto",
              pr: 0.5,
              "&::-webkit-scrollbar": {
                width: "4px",
              },
              "&::-webkit-scrollbar-track": {
                background: "transparent",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "rgba(229, 231, 235, 0.3)",
                borderRadius: "2px",
                "&:hover": {
                  background: "rgba(229, 231, 235, 0.5)",
                },
              },
            }}
          >
            {data.map((entry, i) => {
              const percentage =
                total > 0 ? ((entry.value / total) * 100).toFixed(0) : 0;
              return (
                <Box
                  key={entry.name}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 1,
                    padding: "8px 12px",
                    borderRadius: 1.5,
                    transition: "all 0.2s ease",
                    cursor: "pointer",
                    "&:hover": {
                      background: "rgba(229, 231, 235, 0.3)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.75,
                      flex: 1,
                      minWidth: 0,
                    }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: COLORS[i % COLORS.length],
                        flexShrink: 0,
                        boxShadow: `0 2px 4px ${COLORS[i % COLORS.length]}33`,
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#6B7280",
                        fontSize: "0.8rem",
                        fontWeight: 500,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {entry.name}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1, flexShrink: 0 }}>
                    <Typography
                      sx={{
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        color: "#111827",
                        minWidth: "20px",
                        textAlign: "right",
                      }}
                    >
                      {entry.value}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.75rem",
                        color: "#9CA3AF",
                        minWidth: "30px",
                        textAlign: "right",
                      }}
                    >
                      {percentage}%
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
