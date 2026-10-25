import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { Add, ViewKanban } from "@mui/icons-material";

import PageHeader from "../components/common/PageHeader";
import EmptyState from "../components/common/EmptyState";
import KanbanBoard from "../components/pipeline/KanbanBoard";
import { useJobs } from "../hooks/useJobs";

export default function Pipeline() {
  const { jobs, loadSampleData } = useJobs();
  const navigate = useNavigate();

  return (
    <>
      <PageHeader
        title="Pipeline"
        subtitle="Drag applications between stages as they progress"
      />
      {jobs.length === 0 ? (
        <EmptyState
          icon={<ViewKanban />}
          title="Your pipeline is empty"
          message="Add an application to see it appear on the board."
        >
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => navigate("/applications")}
          >
            Add application
          </Button>
          <Button variant="outlined" onClick={loadSampleData}>
            Load sample data
          </Button>
        </EmptyState>
      ) : (
        <KanbanBoard />
      )}
    </>
  );
}
