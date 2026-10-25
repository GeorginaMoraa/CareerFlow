import { Box, Typography } from "@mui/material";

export default function PageHeader({ title, subtitle, action }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        mb: 3,
      }}
    >
      <Box>
        <Typography
          variant="h4"
          sx={{ fontSize: { xs: "1.6rem", md: "2rem" } }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography color="text.secondary" variant="body2" mt={0.5}>
            {subtitle}
          </Typography>
        )}
      </Box>
      {action}
    </Box>
  );
}
