import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Box,
} from "@mui/material";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useNavigate } from "react-router-dom";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export default function JobCard({ job }) {
  const navigate = useNavigate();
  const {
  attributes,
  listeners,
  setNodeRef,
  transform,
  isDragging,
} = useDraggable({
  id: String(job.id),
  data: {
    job,
  },
});
  const style = {
    transform: CSS.Transform.toString(transform),
    cursor: "grab",
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      <CardContent>

        <Typography
          variant="h6"
          fontWeight="bold"
        >
          {job.company}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          mb={2}
        >
          {job.position}
        </Typography>

        <Stack spacing={1}>

          <Box
            display="flex"
            alignItems="center"
            gap={1}
          >
            <LocationOnIcon fontSize="small" />
            <Typography variant="body2">
              {job.location}
            </Typography>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            gap={1}
          >
            <AttachMoneyIcon fontSize="small" />
            <Typography variant="body2">
              {job.salary || "Not specified"}
            </Typography>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            gap={1}
          >
            <CalendarTodayIcon fontSize="small" />
            <Typography variant="body2">
              {job.dateApplied || "No date"}
            </Typography>
          </Box>

        </Stack>

        <Stack
          direction="row"
          spacing={1}
          mt={2}
          flexWrap="wrap"
        >

          <Chip
            size="small"
            color="primary"
            label={job.status}
          />

          {job.priority && (
            <Chip
              size="small"
              color={
                job.priority === "High"
                  ? "error"
                  : job.priority === "Medium"
                  ? "warning"
                  : "success"
              }
              label={job.priority}
            />
          )}

        </Stack>

      </CardContent>
    </Card>
  );
}