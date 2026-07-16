import { Card, CardContent, Typography, Divider, Box } from "@mui/material";

export default function ApplicationTimeline({ timeline = [] }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Timeline
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {timeline.length === 0 ? (
          <Typography color="text.secondary">
            No timeline events yet.
          </Typography>
        ) : (
          timeline.map((event) => (
            <Box
              key={event.id}
              sx={{
                borderLeft: "3px solid",
                borderColor: "primary.main",
                pl: 2,
                mb: 3,
              }}
            >
              <Typography fontWeight="bold">{event.title}</Typography>

              <Typography variant="body2" color="text.secondary">
                {event.description}
              </Typography>

              <Typography variant="caption" color="text.secondary">
                {new Date(event.date).toLocaleDateString()}
              </Typography>
            </Box>
          ))
        )}
      </CardContent>
    </Card>
  );
}
