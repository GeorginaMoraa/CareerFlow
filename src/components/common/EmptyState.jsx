import { Box, Paper, Typography } from "@mui/material";

export default function EmptyState({ icon, title, message, children }) {
  return (
    <Paper
      variant="outlined"
      sx={{ p: { xs: 3, md: 6 }, textAlign: "center", borderRadius: 4 }}
    >
      {icon && (
        <Box sx={{ color: "primary.main", mb: 1, "& svg": { fontSize: 48 } }}>
          {icon}
        </Box>
      )}
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {message && (
        <Typography color="text.secondary" sx={{ mb: children ? 3 : 0 }}>
          {message}
        </Typography>
      )}
      <Box
        sx={{
          display: "flex",
          gap: 1.5,
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {children}
      </Box>
    </Paper>
  );
}
