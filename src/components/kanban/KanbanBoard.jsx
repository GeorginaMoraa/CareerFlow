import { Grid } from "@mui/material";
import { useJobs } from "../../context/JobContext";

import KanbanColumn from "./KanbanColumn";

const columns = [
  "Applied",
  "Assessment",
  "Interview",
  "Offer",
  "Rejected",
];

export default function KanbanBoard() {
  const { jobs } = useJobs();

  return (
    <Grid container spacing={3}>
      {columns.map((column) => (
        <Grid item xs={12} md={6} lg={2.4} key={column}>
          <KanbanColumn
            title={column}
            jobs={jobs.filter(
              (job) => job.status === column
            )}
          />
        </Grid>
      ))}
    </Grid>
  );
}