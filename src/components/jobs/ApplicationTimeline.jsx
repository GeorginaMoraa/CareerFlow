import { Box, Typography } from "@mui/material";
import { formatDate } from "../../utils/helpers";

export default function ApplicationTimeline({ timeline = [] }) {
  if (timeline.length === 0) {
    return (
      <Typography color="text.secondary">No timeline events yet.</Typography>
    );
  }

  const sorted = [...timeline].sort((a, b) =>
    (b.date || "").localeCompare(a.date || "")
  );

  return (
    <Box>
      {sorted.map((event) => (
        <Box
          key={event.id}
          sx={{
            borderLeft: 3,
            borderColor: "primary.main",
            pl: 2,
            pb: 2.5,
            ml: 0.5,
          }}
        >
          <Typography fontWeight={600}>{event.title}</Typography>
          {event.description && (
            <Typography variant="body2" color="text.secondary">
              {event.description}
            </Typography>
          )}
          <Typography variant="caption" color="text.secondary">
            {formatDate(event.date)}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
