import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Divider,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Layout from "../components/layout/Layout";
import { useJobs } from "../context/JobContext";
import ApplicationTimeline from "../components/jobs/ApplicationTimeline";

export default function ApplicationDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { getJobById } = useJobs();

  const job = getJobById(id);

  if (!job) {
    return (
      <Layout>
        <Typography variant="h5">
          Application not found.
        </Typography>
      </Layout>
    );
  }

  return (
    <Layout>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/applications")}
        sx={{ mb: 3 }}
      >
        Back
      </Button>

      <Typography variant="h4" fontWeight="bold">
        {job.company}
      </Typography>

      <Typography
        variant="h6"
        color="text.secondary"
        gutterBottom
      >
        {job.position}
      </Typography>

      <Grid container spacing={3} mt={2}>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>

              <Typography variant="h6" gutterBottom>
                Application Details
              </Typography>

              <Divider sx={{ mb: 2 }} />

              <Typography>
                <strong>Location:</strong> {job.location}
              </Typography>

              <Typography>
                <strong>Salary:</strong> {job.salary}
              </Typography>

              <Typography mt={2}>
                <strong>Status:</strong>
              </Typography>

              <Chip
                label={job.status}
                color="primary"
                sx={{ mt: 1 }}
              />

            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>

            <CardContent>

              <Typography variant="h6" gutterBottom>
                Timeline
              </Typography>

              <Divider sx={{ mb: 2 }} />

              <ApplicationTimeline timeline={job.timeline} />

            </CardContent>

          </Card>
        </Grid>

      </Grid>

    </Layout>
  );
}