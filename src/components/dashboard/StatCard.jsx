import { Card, CardContent, Typography, Box } from "@mui/material";

export default function StatCard({
  title,
  value,
  icon,
  color,
}) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        p: 1,
        transition: "0.3s",
        border: "1px solid #e2e8f0",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 10px 30px rgba(0,0,0,.08)",
        },
      }}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography color="text.secondary">
              {title}
            </Typography>

            <Typography
              variant="h4"
              fontWeight="bold"
            >
              {value}
            </Typography>
          </Box>

          <Box
            sx={{
              bgcolor: color,
              width: 60,
              height: 60,
              borderRadius: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}