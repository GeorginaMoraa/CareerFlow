import { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Switch,
  TextField,
  Button,
  Divider,
  Avatar,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Save, Upload } from "lucide-react";
import Layout from "../components/layout/Layout";

const SettingCard = ({ title, children }) => (
  <Card
    sx={{
      borderRadius: 4,
      background: "rgba(255, 255, 255, 0.7)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.4)",
      boxShadow:
        "0 2px 8px rgba(0, 0, 0, 0.06), inset 0 1px 1px rgba(255, 255, 255, 0.5)",
      transition: "all 0.3s ease",
      "&:hover": {
        background: "rgba(255, 255, 255, 0.8)",
        boxShadow:
          "0 8px 24px rgba(0, 0, 0, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.5)",
      },
    }}
  >
    <CardContent sx={{ p: 3 }}>
      <Typography
        variant="h5"
        fontWeight={700}
        mb={3}
        sx={{
          color: "#111827",
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Box
          sx={{
            width: 4,
            height: 24,
            background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
            borderRadius: 1,
          }}
        />
        {title}
      </Typography>
      {children}
    </CardContent>
  </Card>
);

const SettingRow = ({ label, value, children }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      py: 2,
      "&:not(:last-child)": {
        borderBottom: "1px solid rgba(229, 231, 235, 0.5)",
      },
    }}
  >
    <Typography sx={{ color: "#1F2937", fontWeight: 500 }}>{label}</Typography>
    {children || (
      <Typography sx={{ color: "#6B7280", fontSize: "0.95rem" }}>
        {value}
      </Typography>
    )}
  </Box>
);

export default function Settings() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // State management
  const [profile, setProfile] = useState({
    fullName: "Georgina Moraa",
    email: "georgina@example.com",
    phone: "+254 712 345 678",
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    applicationReminders: true,
    interviewReminders: true,
    newsAndTips: false,
  });

  const [preferences, setPreferences] = useState({
    jobsPerPage: "10",
    defaultView: "grid",
    autoSave: true,
  });

  const [privacy, setPrivacy] = useState({
    showProfile: true,
    allowMessages: true,
    shareAnalytics: false,
  });

  const [saved, setSaved] = useState(false);

  const handleProfileChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleNotificationChange = (field) => {
    setNotifications({ ...notifications, [field]: !notifications[field] });
  };

  const handlePreferenceChange = (field, value) => {
    setPreferences({ ...preferences, [field]: value });
  };

  const handlePrivacyChange = (field) => {
    setPrivacy({ ...privacy, [field]: !privacy[field] });
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <Layout>
      <Box
        sx={{
          maxWidth: "1400px",
          mx: "auto",
          pb: 6,
        }}
      >
        {/* Header */}
        <Box mb={5}>
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{
              color: "#111827",
              background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: 1,
            }}
          >
            Settings
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: "1rem" }}>
            Manage your account settings and preferences
          </Typography>
        </Box>

        {/* Success Message */}
        {saved && (
          <Card
            sx={{
              mb: 3,
              background: "rgba(16, 185, 129, 0.1)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              borderRadius: 4,
            }}
          >
            <CardContent sx={{ py: 2 }}>
              <Typography sx={{ color: "#059669", fontWeight: 500 }}>
                ✓ Settings saved successfully!
              </Typography>
            </CardContent>
          </Card>
        )}

        <Grid container spacing={3}>
          {/* Profile Settings */}
          <Grid item xs={12} md={6}>
            <SettingCard title="Profile">
              <Box mb={3} display="flex" alignItems="center" gap={2}>
                <Avatar
                  sx={{
                    width: 64,
                    height: 64,
                    background:
                      "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                  }}
                >
                  GM
                </Avatar>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<Upload size={16} />}
                  sx={{
                    borderColor: "#10B981",
                    color: "#10B981",
                    "&:hover": {
                      background: "rgba(16, 185, 129, 0.05)",
                    },
                  }}
                >
                  Upload Photo
                </Button>
              </Box>

              <Divider
                sx={{ my: 2, borderColor: "rgba(229, 231, 235, 0.5)" }}
              />

              <TextField
                fullWidth
                label="Full Name"
                value={profile.fullName}
                onChange={(e) =>
                  handleProfileChange("fullName", e.target.value)
                }
                sx={{ mb: 2 }}
                size="small"
              />

              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={profile.email}
                onChange={(e) => handleProfileChange("email", e.target.value)}
                sx={{ mb: 2 }}
                size="small"
              />

              <TextField
                fullWidth
                label="Phone Number"
                value={profile.phone}
                onChange={(e) => handleProfileChange("phone", e.target.value)}
                size="small"
              />
            </SettingCard>
          </Grid>

          {/* Notification Settings */}
          <Grid item xs={12} md={6}>
            <SettingCard title="Notifications">
              <SettingRow label="Email Notifications">
                <Switch
                  checked={notifications.emailNotifications}
                  onChange={() =>
                    handleNotificationChange("emailNotifications")
                  }
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "#10B981",
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "#10B981",
                    },
                  }}
                />
              </SettingRow>

              <SettingRow label="Application Reminders">
                <Switch
                  checked={notifications.applicationReminders}
                  onChange={() =>
                    handleNotificationChange("applicationReminders")
                  }
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "#10B981",
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "#10B981",
                    },
                  }}
                />
              </SettingRow>

              <SettingRow label="Interview Reminders">
                <Switch
                  checked={notifications.interviewReminders}
                  onChange={() =>
                    handleNotificationChange("interviewReminders")
                  }
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "#10B981",
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "#10B981",
                    },
                  }}
                />
              </SettingRow>

              <SettingRow label="News & Tips">
                <Switch
                  checked={notifications.newsAndTips}
                  onChange={() => handleNotificationChange("newsAndTips")}
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "#10B981",
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "#10B981",
                    },
                  }}
                />
              </SettingRow>
            </SettingCard>
          </Grid>

          {/* Preferences */}
          <Grid item xs={12} md={6}>
            <SettingCard title="Preferences">
              <TextField
                fullWidth
                select
                label="Jobs Per Page"
                value={preferences.jobsPerPage}
                onChange={(e) =>
                  handlePreferenceChange("jobsPerPage", e.target.value)
                }
                sx={{ mb: 2 }}
                size="small"
                SelectProps={{
                  native: true,
                }}
              >
                <option value="5">5 jobs</option>
                <option value="10">10 jobs</option>
                <option value="25">25 jobs</option>
                <option value="50">50 jobs</option>
              </TextField>

              <TextField
                fullWidth
                select
                label="Default View"
                value={preferences.defaultView}
                onChange={(e) =>
                  handlePreferenceChange("defaultView", e.target.value)
                }
                sx={{ mb: 2 }}
                size="small"
                SelectProps={{
                  native: true,
                }}
              >
                <option value="grid">Grid View</option>
                <option value="list">List View</option>
                <option value="kanban">Kanban View</option>
              </TextField>

              <SettingRow label="Auto-Save Changes">
                <Switch
                  checked={preferences.autoSave}
                  onChange={() =>
                    handlePreferenceChange("autoSave", !preferences.autoSave)
                  }
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "#10B981",
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "#10B981",
                    },
                  }}
                />
              </SettingRow>
            </SettingCard>
          </Grid>

          {/* Privacy Settings */}
          <Grid item xs={12} md={6}>
            <SettingCard title="Privacy & Security">
              <SettingRow label="Show My Profile">
                <Switch
                  checked={privacy.showProfile}
                  onChange={() => handlePrivacyChange("showProfile")}
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "#10B981",
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "#10B981",
                    },
                  }}
                />
              </SettingRow>

              <SettingRow label="Allow Messages">
                <Switch
                  checked={privacy.allowMessages}
                  onChange={() => handlePrivacyChange("allowMessages")}
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "#10B981",
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "#10B981",
                    },
                  }}
                />
              </SettingRow>

              <SettingRow label="Share Analytics">
                <Switch
                  checked={privacy.shareAnalytics}
                  onChange={() => handlePrivacyChange("shareAnalytics")}
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "#10B981",
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "#10B981",
                    },
                  }}
                />
              </SettingRow>

              <Button
                fullWidth
                variant="outlined"
                sx={{
                  mt: 2,
                  borderColor: "#EF4444",
                  color: "#EF4444",
                  "&:hover": {
                    background: "rgba(239, 68, 68, 0.05)",
                  },
                }}
              >
                Change Password
              </Button>
            </SettingCard>
          </Grid>

          {/* Danger Zone */}
          <Grid item xs={12}>
            <SettingCard title="Danger Zone">
              <Typography variant="body2" sx={{ color: "#6B7280", mb: 2 }}>
                These actions cannot be undone. Please be careful.
              </Typography>
              <Box
                display="flex"
                gap={2}
                flexDirection={isMobile ? "column" : "row"}
              >
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: "#F59E0B",
                    color: "#F59E0B",
                    flex: 1,
                    "&:hover": {
                      background: "rgba(245, 158, 11, 0.05)",
                    },
                  }}
                >
                  Export Data
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: "#EF4444",
                    color: "#EF4444",
                    flex: 1,
                    "&:hover": {
                      background: "rgba(239, 68, 68, 0.05)",
                    },
                  }}
                >
                  Delete Account
                </Button>
              </Box>
            </SettingCard>
          </Grid>

          {/* Save Button */}
          <Grid item xs={12}>
            <Box display="flex" gap={2} justifyContent="flex-end">
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#D1D5DB",
                  color: "#111827",
                  "&:hover": {
                    background: "rgba(0, 0, 0, 0.02)",
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                startIcon={<Save size={20} />}
                onClick={handleSave}
                sx={{
                  background:
                    "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                  boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
                  "&:hover": {
                    boxShadow: "0 8px 24px rgba(16, 185, 129, 0.4)",
                  },
                }}
              >
                Save Changes
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
}
