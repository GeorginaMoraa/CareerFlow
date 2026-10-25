import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Box, Typography } from "@mui/material";

import { APPLICATION_STATUS, STATUS_HEX } from "../../constants/application";

export default function StatusChart({ byStatus }) {
  const data = APPLICATION_STATUS.map((name) => ({
    name,
    value: byStatus[name] || 0,
  }));
  const visible = data.filter((d) => d.value > 0);

  return (
    <Box>
      <Box sx={{ height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={visible}
              dataKey="value"
              nameKey="name"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={2}
            >
              {visible.map((d) => (
                <Cell key={d.name} fill={STATUS_HEX[d.name]} stroke="none" />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "center",
        }}
      >
        {data.map((d) => (
          <Box
            key={d.name}
            sx={{ display: "flex", alignItems: "center", gap: 0.75 }}
          >
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                bgcolor: STATUS_HEX[d.name],
              }}
            />
            <Typography variant="caption">
              {d.name} ({d.value})
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
