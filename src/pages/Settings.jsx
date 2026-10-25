import { useRef, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Switch,
  Typography,
} from "@mui/material";
import {
  DeleteForever,
  FileDownloadOutlined,
  FileUploadOutlined,
  Restore,
  Science,
} from "@mui/icons-material";
import toast from "react-hot-toast";

import PageHeader from "../components/common/PageHeader";
import ConfirmDialog from "../components/common/ConfirmDialog";
import { useJobs } from "../hooks/useJobs";
import { useSettings } from "../hooks/useSettings";
import { downloadFile, jobsToCSV } from "../utils/helpers";

function Section({ title, children }) {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" mb={1}>
          {title}
        </Typography>
        <Divider sx={{ mb: 1 }} />
        {children}
      </CardContent>
    </Card>
  );
}

function Row({ label, description, children }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        py: 1.5,
        flexWrap: "wrap",
      }}
    >
      <Box sx={{ flex: 1, minWidth: 220 }}>
        <Typography fontWeight={600}>{label}</Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </Box>
      {children}
    </Box>
  );
}

export default function Settings() {
  const { preferences, updatePreferences, resetSettings } = useSettings();
  const { jobs, importJobs, loadSampleData, clearJobs } = useJobs();
  const fileRef = useRef(null);
  const [confirm, setConfirm] = useState(null);

  const handleImport = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    try {
      const data = JSON.parse(await file.text());
      importJobs(Array.isArray(data) ? data : data.jobs);
    } catch {
      toast.error("That file isn't a valid CareerFlow export");
    }
  };

  const confirmations = {
    clear: {
      title: "Delete all applications",
      message:
        "This permanently removes every application, note and interview.",
      label: "Delete everything",
      run: clearJobs,
    },
    reset: {
      title: "Reset settings and profile",
      message:
        "Your profile and preferences will go back to their defaults. Applications are not affected.",
      label: "Reset",
      run: () => {
        resetSettings();
        toast.success("Settings reset");
      },
    },
  };

  return (
    <>
      <PageHeader
        title="Settings"
        subtitle="Customize CareerFlow and manage your data"
      />

      <Section title="Preferences">
        <Row
          label="Dark mode"
          description="Use a dark colour scheme throughout the app."
        >
          <Switch
            checked={preferences.darkMode}
            onChange={(e) => updatePreferences({ darkMode: e.target.checked })}
            slotProps={{ input: { "aria-label": "Dark mode" } }}
          />
        </Row>
        <Divider />
        <Row
          label="Interview reminders"
          description="Show upcoming interviews (next 7 days) in the notifications bell."
        >
          <Switch
            checked={preferences.interviewReminders}
            onChange={(e) =>
              updatePreferences({ interviewReminders: e.target.checked })
            }
            slotProps={{ input: { "aria-label": "Interview reminders" } }}
          />
        </Row>
      </Section>

      <Section title="Your data">
        <Typography variant="body2" color="text.secondary" mb={1}>
          Everything is stored locally in this browser. Export a backup to move
          your data to another device.
        </Typography>
        <Row
          label="Export as JSON"
          description="Full backup including notes, interviews and timeline."
        >
          <Button
            variant="outlined"
            startIcon={<FileDownloadOutlined />}
            disabled={jobs.length === 0}
            onClick={() =>
              downloadFile(
                "careerflow-backup.json",
                JSON.stringify(jobs, null, 2),
                "application/json"
              )
            }
          >
            Export JSON
          </Button>
        </Row>
        <Divider />
        <Row
          label="Export as CSV"
          description="A spreadsheet-friendly list of your applications."
        >
          <Button
            variant="outlined"
            startIcon={<FileDownloadOutlined />}
            disabled={jobs.length === 0}
            onClick={() =>
              downloadFile(
                "careerflow-applications.csv",
                jobsToCSV(jobs),
                "text/csv"
              )
            }
          >
            Export CSV
          </Button>
        </Row>
        <Divider />
        <Row
          label="Import from JSON"
          description="Add applications from a CareerFlow JSON backup."
        >
          <Button
            variant="outlined"
            startIcon={<FileUploadOutlined />}
            onClick={() => fileRef.current?.click()}
          >
            Import JSON
          </Button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            hidden
            onChange={handleImport}
          />
        </Row>
        <Divider />
        <Row
          label="Load sample data"
          description="Add a few example applications to explore the app."
        >
          <Button
            variant="outlined"
            startIcon={<Science />}
            onClick={loadSampleData}
          >
            Load samples
          </Button>
        </Row>
      </Section>

      <Section title="Danger zone">
        <Row
          label="Reset profile & settings"
          description="Restore defaults. Your applications are kept."
        >
          <Button
            color="warning"
            variant="outlined"
            startIcon={<Restore />}
            onClick={() => setConfirm("reset")}
          >
            Reset
          </Button>
        </Row>
        <Divider />
        <Row
          label="Delete all applications"
          description="Permanently remove every application."
        >
          <Button
            color="error"
            variant="outlined"
            startIcon={<DeleteForever />}
            disabled={jobs.length === 0}
            onClick={() => setConfirm("clear")}
          >
            Delete all
          </Button>
        </Row>
      </Section>

      <ConfirmDialog
        open={Boolean(confirm)}
        title={confirm ? confirmations[confirm].title : ""}
        message={confirm ? confirmations[confirm].message : ""}
        confirmLabel={confirm ? confirmations[confirm].label : ""}
        onCancel={() => setConfirm(null)}
        onConfirm={() => {
          confirmations[confirm]?.run();
          setConfirm(null);
        }}
      />
    </>
  );
}
