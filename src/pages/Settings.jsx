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
  Alert,
} from "@mui/material";
import { Save, Upload } from "lucide-react";
import Layout from "../components/layout/Layout";

const SettingCard = ({
  title,
  children,
  gradient = "linear-gradient(90deg, #10B981 0%, #059669 100%)",
}) => (
  <Card
    elevation={0}
    sx={{
      borderRadius: 3,
      background: "#FFFFFF",
      border: "1px solid rgba(229, 231, 235, 0.8)",
      transition: "all 0.3s ease",
      position: "relative",
      overflow: "hidden",
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "4px",
        background: gradient,
      },
      "&:hover": {
        borderColor: "rgba(229, 231, 235, 1)",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.06)",
      },
    }}
  >
    <CardContent sx={{ p: 3 }}>
      <Typography
        variant="h6"
        fontWeight={700}
        mb={2.5}
        sx={{
          color: "#111827",
          fontSize: "1rem",
        }}
      >
        {title}
      </Typography>
      <Divider sx={{ mb: 2, opacity: 0.3 }} />
      {children}
    </CardContent>
  </Card>
);

const SettingRow = ({ label, description, children }) => (
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
    <Box sx={{ flex: 1 }}>
      <Typography
        sx={{
          color: "#111827",
          fontWeight: 600,
          fontSize: "0.95rem",
          mb: description ? 0.5 : 0,
        }}
      >
        {label}
      </Typography>
      {description && (
        <Typography
          variant="caption"
          sx={{
            color: "#9CA3AF",
            fontSize: "0.8rem",
            display: "block",
          }}
        >
          {description}
        </Typography>
      )}
    </Box>
    {children}
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
            variant="h3"
            fontWeight={800}
            sx={{
              color: "#111827",
              mb: 1,
              fontSize: { xs: "1.75rem", md: "2.25rem" },
              letterSpacing: "-0.5px",
            }}
          >
            Settings
          </Typography>
          <Typography
            color="text.secondary"
            sx={{
              fontSize: "1rem",
              fontWeight: 400,
            }}
          >
            Manage your account, preferences, and privacy settings.
          </Typography>
        </Box>

        {/* Success Message */}
        {saved && (
          <Alert
            severity="success"
            sx={{
              mb: 3,
              borderRadius: 2,
              background: "rgba(16, 185, 129, 0.08)",
              border: "1px solid rgba(16, 185, 129, 0.2)",
              color: "#059669",
              fontWeight: 500,
              "& .MuiAlert-icon": {
                color: "#059669",
              },
            }}
          >
            ✓ Settings saved successfully!
          </Alert>
        )}

        <Grid container spacing={3}>
          {/* Profile Settings */}
          <Grid item xs={12} md={6}>
            <SettingCard
              title="Profile Information"
              gradient="linear-gradient(90deg, #10B981 0%, #059669 100%)"
            >
              {/* Avatar Section */}
              <Box mb={3} display="flex" alignItems="flex-end" gap={2}>
                <Avatar
                  sx={{
                    width: 72,
                    height: 72,
                    background:
                      "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                    fontSize: "2rem",
                    fontWeight: 800,
                    boxShadow: "0 4px 12px rgba(16, 185, 129, 0.2)",
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
                    fontWeight: 600,
                    textTransform: "none",
                    borderRadius: 2,
                    "&:hover": {
                      background: "rgba(16, 185, 129, 0.05)",
                      borderColor: "#059669",
                    },
                  }}
                >
                  Upload Photo
                </Button>
              </Box>

              <Divider sx={{ my: 2.5, opacity: 0.3 }} />

              <TextField
                fullWidth
                label="Full Name"
                value={profile.fullName}
                onChange={(e) =>
                  handleProfileChange("fullName", e.target.value)
                }
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
                size="small"
              />

              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={profile.email}
                onChange={(e) => handleProfileChange("email", e.target.value)}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
                size="small"
              />

              <TextField
                fullWidth
                label="Phone Number"
                value={profile.phone}
                onChange={(e) => handleProfileChange("phone", e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
                size="small"
              />
            </SettingCard>
          </Grid>

          {/* Notification Settings */}
          <Grid item xs={12} md={6}>
            <SettingCard
              title="Notifications"
              gradient="linear-gradient(90deg, #06B6D4 0%, #0891B2 100%)"
            >
              <SettingRow
                label="Email Notifications"
                description="Get emails about your account activity"
              >
                <Switch
                  checked={notifications.emailNotifications}
                  onChange={() =>
                    handleNotificationChange("emailNotifications")
                  }
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "#06B6D4",
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "#06B6D4",
                    },
                  }}
                />
              </SettingRow>

              <SettingRow
                label="Application Reminders"
                description="Reminder to follow up on applications"
              >
                <Switch
                  checked={notifications.applicationReminders}
                  onChange={() =>
                    handleNotificationChange("applicationReminders")
                  }
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "#06B6D4",
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "#06B6D4",
                    },
                  }}
                />
              </SettingRow>

              <SettingRow
                label="Interview Reminders"
                description="Alerts before upcoming interviews"
              >
                <Switch
                  checked={notifications.interviewReminders}
                  onChange={() =>
                    handleNotificationChange("interviewReminders")
                  }
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "#06B6D4",
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "#06B6D4",
                    },
                  }}
                />
              </SettingRow>

              <SettingRow
                label="Career Tips & News"
                description="Curated job search tips and industry news"
              >
                <Switch
                  checked={notifications.newsAndTips}
                  onChange={() => handleNotificationChange("newsAndTips")}
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "#06B6D4",
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "#06B6D4",
                    },
                  }}
                />
              </SettingRow>
            </SettingCard>
          </Grid>

          {/* Preferences */}
          <Grid item xs={12} md={6}>
            <SettingCard
              title="Display Preferences"
              gradient="linear-gradient(90deg, #14B8A6 0%, #0D9488 100%)"
            >
              <Typography
                variant="caption"
                sx={{
                  textTransform: "uppercase",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  color: "#6B7280",
                  letterSpacing: "0.5px",
                  display: "block",
                  mb: 1,
                }}
              >
                List Display
              </Typography>

              <TextField
                fullWidth
                select
                label="Jobs Per Page"
                value={preferences.jobsPerPage}
                onChange={(e) =>
                  handlePreferenceChange("jobsPerPage", e.target.value)
                }
                sx={{
                  mb: 2.5,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
                size="small"
                SelectProps={{
                  native: true,
                }}
              >
                <option value="5">5 jobs per page</option>
                <option value="10">10 jobs per page</option>
                <option value="25">25 jobs per page</option>
                <option value="50">50 jobs per page</option>
              </TextField>

              <TextField
                fullWidth
                select
                label="Default View"
                value={preferences.defaultView}
                onChange={(e) =>
                  handlePreferenceChange("defaultView", e.target.value)
                }
                sx={{
                  mb: 2.5,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
                size="small"
                SelectProps={{
                  native: true,
                }}
              >
                <option value="grid">Grid View</option>
                <option value="list">List View</option>
                <option value="kanban">Kanban Board</option>
              </TextField>

              <SettingRow
                label="Auto-Save Changes"
                description="Automatically save your changes"
              >
                <Switch
                  checked={preferences.autoSave}
                  onChange={() =>
                    handlePreferenceChange("autoSave", !preferences.autoSave)
                  }
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "#14B8A6",
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "#14B8A6",
                    },
                  }}
                />
              </SettingRow>
            </SettingCard>
          </Grid>

          {/* Privacy Settings */}
          <Grid item xs={12} md={6}>
            <SettingCard
              title="Privacy & Security"
              gradient="linear-gradient(90deg, #8B5CF6 0%, #7C3AED 100%)"
            >
              <SettingRow
                label="Show My Profile"
                description="Make your profile visible to others"
              >
                <Switch
                  checked={privacy.showProfile}
                  onChange={() => handlePrivacyChange("showProfile")}
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "#8B5CF6",
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "#8B5CF6",
                    },
                  }}
                />
              </SettingRow>

              <SettingRow
                label="Allow Messages"
                description="Let others send you messages"
              >
                <Switch
                  checked={privacy.allowMessages}
                  onChange={() => handlePrivacyChange("allowMessages")}
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "#8B5CF6",
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "#8B5CF6",
                    },
                  }}
                />
              </SettingRow>

              <SettingRow
                label="Share Analytics"
                description="Help improve the app by sharing data"
              >
                <Switch
                  checked={privacy.shareAnalytics}
                  onChange={() => handlePrivacyChange("shareAnalytics")}
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "#8B5CF6",
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "#8B5CF6",
                    },
                  }}
                />
              </SettingRow>

              <Button
                fullWidth
                variant="outlined"
                sx={{
                  mt: 2,
                  borderColor: "#8B5CF6",
                  color: "#8B5CF6",
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: 2,
                  "&:hover": {
                    background: "rgba(139, 92, 246, 0.05)",
                    borderColor: "#7C3AED",
                  },
                }}
              >
                Change Password
              </Button>
            </SettingCard>
          </Grid>

          {/* Danger Zone */}
          <Grid item xs={12}>
            <SettingCard
              title="Account Actions"
              gradient="linear-gradient(90deg, #EF4444 0%, #DC2626 100%)"
            >
              <Typography
                variant="body2"
                sx={{
                  color: "#6B7280",
                  mb: 2.5,
                  fontSize: "0.9rem",
                  lineHeight: 1.5,
                }}
              >
                These actions are permanent and cannot be undone. Please be
                careful.
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
                    fontWeight: 600,
                    textTransform: "none",
                    borderRadius: 2,
                    "&:hover": {
                      background: "rgba(245, 158, 11, 0.05)",
                      borderColor: "#D97706",
                    },
                  }}
                >
                  Export My Data
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: "#EF4444",
                    color: "#EF4444",
                    flex: 1,
                    fontWeight: 600,
                    textTransform: "none",
                    borderRadius: 2,
                    "&:hover": {
                      background: "rgba(239, 68, 68, 0.05)",
                      borderColor: "#DC2626",
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
            <Box
              display="flex"
              gap={2}
              justifyContent="flex-end"
              sx={{ pt: 2 }}
            >
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#D1D5DB",
                  color: "#111827",
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: 2,
                  "&:hover": {
                    background: "rgba(0, 0, 0, 0.02)",
                    borderColor: "#9CA3AF",
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
                  color: "white",
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: 2,
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
