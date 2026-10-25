import { Box, Card, CardContent, Typography } from "@mui/material";

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  color = "#10B981",
}) {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 3,
            display: "grid",
            placeItems: "center",
            color,
            bgcolor: `${color}1F`,
            flexShrink: 0,
          }}
        >
          {icon}
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="body2" color="text.secondary" noWrap>
            {title}
          </Typography>
          <Typography variant="h4" sx={{ lineHeight: 1.2 }}>
            {value}
          </Typography>
          {subtitle && (
            <Typography variant="caption" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
