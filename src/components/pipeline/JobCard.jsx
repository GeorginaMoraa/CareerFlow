import { forwardRef } from "react";
import { Box, Card, Chip, Typography } from "@mui/material";
import { CalendarToday, LocationOn } from "@mui/icons-material";

import { formatDate } from "../../utils/helpers";

const PRIORITY_COLOR = { High: "error", Medium: "warning", Low: "default" };

/** Presentational card; also rendered inside the drag overlay. */
const JobCard = forwardRef(function JobCard(
  { job, dragging = false, onOpen, ...props },
  ref
) {
  return (
    <Card
      ref={ref}
      onClick={onOpen}
      {...props}
      sx={{
        p: 1.5,
        mb: 1.5,
        cursor: dragging ? "grabbing" : "grab",
        touchAction: "none",
        boxShadow: dragging ? 6 : 0,
        "&:hover": { borderColor: "primary.main" },
      }}
    >
      <Typography fontWeight={700} noWrap>
        {job.company}
      </Typography>
      <Typography variant="body2" color="text.secondary" noWrap mb={1}>
        {job.position}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 0.25,
          color: "text.secondary",
        }}
      >
        {job.location && (
          <Typography
            variant="caption"
            sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
          >
            <LocationOn sx={{ fontSize: 14 }} /> {job.location}
          </Typography>
        )}
        {job.dateApplied && (
          <Typography
            variant="caption"
            sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
          >
            <CalendarToday sx={{ fontSize: 14 }} />{" "}
            {formatDate(job.dateApplied)}
          </Typography>
        )}
      </Box>

      {job.priority && (
        <Chip
          size="small"
          variant="outlined"
          label={job.priority}
          color={PRIORITY_COLOR[job.priority] || "default"}
          sx={{ mt: 1 }}
        />
      )}
    </Card>
  );
});

export default JobCard;
