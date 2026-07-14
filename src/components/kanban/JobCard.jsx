import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
} from "@mui/material";

export default function JobCard({ job }) {
  return (
    <Card
      sx={{
        mb: 2,
        borderRadius: 3,
        cursor: "grab",
        transition: "0.2s",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: 6,
        },
      }}
    >
      <CardContent>

        <Typography fontWeight="bold">
          {job.company}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          mb={2}
        >
          {job.position}
        </Typography>

        <Stack
          direction="row"
          justifyContent="space-between"
        >
          <Chip
            size="small"
            label={job.location}
          />

          <Typography
            variant="caption"
          >
            {job.salary}
          </Typography>
        </Stack>

      </CardContent>
    </Card>
  );
}