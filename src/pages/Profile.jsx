import { useState } from "react";

import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Divider,
} from "@mui/material";

import { Camera, Save, Edit2, X } from "lucide-react";

import Layout from "../components/layout/Layout";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const [profilePhoto, setProfilePhoto] = useState(null);

  const [showPhotoDialog, setShowPhotoDialog] = useState(false);

  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState({
    firstName: "Georgina",

    lastName: "Mora",

    email: "georgina@example.com",

    phone: "+254 700 000 000",

    location: "Nairobi, Kenya",

    bio: "Passionate software engineering student interested in building useful technology solutions.",

    currentCompany: "Career Development",

    currentRole: "Software Engineering Student",

    yearsOfExperience: "1",

    skills: ["React", "JavaScript", "Python", "Node.js", "TypeScript"],
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  const [newSkill, setNewSkill] = useState("");

  const handleSave = () => {
    setProfile(editedProfile);

    setIsEditing(false);

    setSaved(true);

    setTimeout(() => setSaved(false), 3000);
  };

  const handleCancel = () => {
    setEditedProfile(profile);

    setIsEditing(false);
  };

  const addSkill = () => {
    if (newSkill && !editedProfile.skills.includes(newSkill)) {
      setEditedProfile({
        ...editedProfile,

        skills: [...editedProfile.skills, newSkill],
      });

      setNewSkill("");
    }
  };

  const removeSkill = (skill) => {
    setEditedProfile({
      ...editedProfile,

      skills: editedProfile.skills.filter((item) => item !== skill),
    });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setProfilePhoto(event.target.result);

        setShowPhotoDialog(false);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <Layout>
      {/* Header */}
      <Box
        mb={4}

        display="flex"

        justifyContent="space-between"

        alignItems={{
          xs: "flex-start",
          md: "center",
        }}

        flexDirection={{
          xs: "column",
          md: "row",
        }}

        gap={2}
      >
        <Box>
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
            Profile
          </Typography>

          <Typography
            color="text.secondary"

            sx={{ fontSize: "1rem" }}
          >
            Manage your professional information
          </Typography>
        </Box>

        {!isEditing && (
          <Button
            variant="contained"

            startIcon={<Edit2 size={20} />}

            onClick={() => setIsEditing(true)}

            sx={{
              background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
              borderRadius: "8px",
              px: 3,
              textTransform: "none",
              fontWeight: 600,
              boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
              "&:hover": {
                boxShadow: "0 8px 24px rgba(16, 185, 129, 0.4)",
              },
            }}
          >
            Edit Profile
          </Button>
        )}
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
              ✓ Profile updated successfully!
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* LEFT PROFILE CARD */}

      <Grid container spacing={2}>
        <Grid item xs={12} lg={4}>
          <Card
            sx={{
              borderRadius: 4,
              height: "100%",
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
            <CardContent
              sx={{
                textAlign: "center",

                pt: 5,

                px: 3,
              }}
            >
              <Box
                position="relative"

                display="inline-block"

                mb={2}
              >
                <Avatar
                  src={profilePhoto}

                  sx={{
                    width: 130,

                    height: 130,

                    fontSize: "3rem",

                    fontWeight: 700,

                    background:
                      "linear-gradient(135deg, #10B981 0%, #059669 100%)",

                    boxShadow: "0 8px 20px rgba(16, 185, 129, 0.4)",
                  }}
                >
                  {profile.firstName[0]}

                  {profile.lastName[0]}
                </Avatar>

                {isEditing && (
                  <IconButton
                    onClick={() => setShowPhotoDialog(true)}

                    sx={{
                      position: "absolute",

                      bottom: 5,

                      right: 5,

                      background:
                        "linear-gradient(135deg, #10B981 0%, #059669 100%)",

                      color: "#fff",

                      width: 44,

                      height: 44,

                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #059669 0%, #047857 100%)",
                        boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
                      },
                    }}
                  >
                    <Camera size={20} />
                  </IconButton>
                )}
              </Box>

              <Typography
                variant="h5"

                fontWeight={700}

                sx={{ color: "#111827", mb: 1 }}
              >
                {profile.firstName} {profile.lastName}
              </Typography>

              <Typography
                color="text.secondary"

                fontWeight={500}
              >
                {profile.currentRole}
              </Typography>

              <Typography
                variant="body2"

                color="text.secondary"

                sx={{ mt: 1 }}
              >
                📍 {profile.location}
              </Typography>

              <Divider
                sx={{ my: 3, borderColor: "rgba(229, 231, 235, 0.5)" }}
              />

              <Typography
                fontWeight={700}

                textAlign="left"

                mb={2}

                sx={{ color: "#111827" }}
              >
                Contact Information
              </Typography>

              <Box textAlign="left">
                <Typography
                  variant="caption"
                  sx={{ color: "#6B7280", display: "block" }}
                >
                  Email
                </Typography>

                <Typography mb={2} sx={{ color: "#1F2937", fontWeight: 500 }}>
                  {profile.email}
                </Typography>

                <Typography
                  variant="caption"
                  sx={{ color: "#6B7280", display: "block" }}
                >
                  Phone
                </Typography>

                <Typography mb={2} sx={{ color: "#1F2937", fontWeight: 500 }}>
                  {profile.phone}
                </Typography>

                <Typography
                  variant="caption"
                  sx={{ color: "#6B7280", display: "block" }}
                >
                  Experience
                </Typography>

                <Typography sx={{ color: "#1F2937", fontWeight: 500 }}>
                  {profile.yearsOfExperience} years
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* RIGHT CONTENT */}

        <Grid item xs={12} lg={8}>
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
            <CardContent
              sx={{
                p: 4,
              }}
            >
              {isEditing ? (
                <Box>
                  <Typography
                    variant="h6"

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
                        background:
                          "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                        borderRadius: 1,
                      }}
                    />
                    Edit Profile
                  </Typography>

                  <Grid container spacing={2}>
                    {[
                      ["firstName", "First Name"],

                      ["lastName", "Last Name"],

                      ["email", "Email"],

                      ["phone", "Phone"],

                      ["location", "Location"],

                      ["currentCompany", "Company"],

                      ["currentRole", "Role"],
                    ].map(([field, label]) => (
                      <Grid
                        item

                        xs={12}

                        sm={6}

                        key={field}
                      >
                        <TextField
                          fullWidth

                          label={label}

                          value={editedProfile[field]}

                          onChange={(e) =>
                            setEditedProfile({
                              ...editedProfile,

                              [field]: e.target.value,
                            })
                          }
                        />
                      </Grid>
                    ))}

                    <Grid item xs={12}>
                      <TextField
                        fullWidth

                        multiline

                        rows={3}

                        label="Bio"

                        value={editedProfile.bio}

                        onChange={(e) =>
                          setEditedProfile({
                            ...editedProfile,

                            bio: e.target.value,
                          })
                        }
                      />
                    </Grid>
                  </Grid>

                  <Box mt={3}>
                    <Typography
                      fontWeight={700}
                      mb={2}
                      sx={{ color: "#111827" }}
                    >
                      Skills
                    </Typography>

                    <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
                      {editedProfile.skills.map((skill) => (
                        <Chip
                          key={skill}

                          label={skill}

                          onDelete={() => removeSkill(skill)}

                          sx={{
                            background: "rgba(16, 185, 129, 0.1)",
                            color: "#10B981",
                            fontWeight: 500,
                            "& .MuiChip-deleteIcon": {
                              color: "#10B981",
                              opacity: 0.7,
                              "&:hover": {
                                opacity: 1,
                              },
                            },
                          }}
                        />
                      ))}
                    </Box>

                    <Box display="flex" gap={1} mt={2}>
                      <TextField
                        size="small"

                        value={newSkill}

                        onChange={(e) => setNewSkill(e.target.value)}

                        placeholder="Add skill"

                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            addSkill();
                          }
                        }}

                        sx={{
                          "& .MuiOutlinedInput-root": {
                            background: "rgba(255, 255, 255, 0.6)",
                            backdropFilter: "blur(8px)",
                            "& fieldset": {
                              borderColor: "rgba(229, 231, 235, 0.5)",
                            },
                            "&:hover fieldset": {
                              borderColor: "rgba(16, 185, 129, 0.3)",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#10B981",
                            },
                          },
                        }}
                      />

                      <Button
                        variant="contained"

                        onClick={addSkill}

                        sx={{
                          background:
                            "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                          boxShadow: "0 2px 8px rgba(16, 185, 129, 0.2)",
                          "&:hover": {
                            boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
                          },
                        }}
                      >
                        Add
                      </Button>
                    </Box>
                  </Box>

                  <Box mt={4} display="flex" gap={2}>
                    <Button
                      variant="contained"

                      startIcon={<Save size={18} />}

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

                    <Button
                      variant="outlined"

                      onClick={handleCancel}

                      startIcon={<X size={18} />}

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
                  </Box>
                </Box>
              ) : (
                <Box>
                  <Typography
                    fontWeight={700}

                    mb={2}

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
                        height: 20,
                        background:
                          "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                        borderRadius: 1,
                      }}
                    />
                    Bio
                  </Typography>

                  <Typography mb={3} sx={{ color: "#1F2937" }}>
                    {profile.bio}
                  </Typography>

                  <Divider
                    sx={{ my: 3, borderColor: "rgba(229, 231, 235, 0.5)" }}
                  />

                  <Typography
                    fontWeight={700}

                    mb={2}

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
                        height: 20,
                        background:
                          "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                        borderRadius: 1,
                      }}
                    />
                    Skills
                  </Typography>

                  <Box display="flex" gap={1} flexWrap="wrap" mb={3}>
                    {profile.skills.map((skill) => (
                      <Chip
                        key={skill}

                        label={skill}

                        sx={{
                          background: "rgba(16, 185, 129, 0.1)",
                          color: "#10B981",
                          fontWeight: 500,
                        }}
                      />
                    ))}
                  </Box>

                  <Divider
                    sx={{ my: 3, borderColor: "rgba(229, 231, 235, 0.5)" }}
                  />

                  <Typography
                    fontWeight={700}

                    mb={2}

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
                        height: 20,
                        background:
                          "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                        borderRadius: 1,
                      }}
                    />
                    Professional Information
                  </Typography>

                  <Typography sx={{ color: "#1F2937", mb: 1 }}>
                    <strong>Company:</strong> {profile.currentCompany}
                  </Typography>

                  <Typography sx={{ color: "#1F2937", mb: 1 }}>
                    <strong>Role:</strong> {profile.currentRole}
                  </Typography>

                  <Typography sx={{ color: "#1F2937" }}>
                    <strong>Experience:</strong> {profile.yearsOfExperience}{" "}
                    years
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Photo Upload Dialog */}

      <Dialog
        open={showPhotoDialog}

        onClose={() => setShowPhotoDialog(false)}

        PaperProps={{
          sx: {
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            borderRadius: 4,
            border: "1px solid rgba(229, 231, 235, 0.3)",
          },
        }}
      >
        <DialogTitle sx={{ color: "#111827", fontWeight: 700 }}>
          Upload Profile Photo
        </DialogTitle>

        <DialogContent sx={{ pt: 2 }}>
          <Typography variant="body2" sx={{ color: "#6B7280", mb: 2 }}>
            Choose an image to upload as your profile picture.
          </Typography>

          <input
            type="file"

            accept="image/*"

            onChange={handlePhotoUpload}

            style={{
              padding: "12px",
              border: "2px dashed rgba(16, 185, 129, 0.3)",
              borderRadius: "8px",
              width: "100%",
              cursor: "pointer",
              color: "#10B981",
            }}
          />
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => setShowPhotoDialog(false)}

            sx={{
              color: "#111827",
              borderColor: "#D1D5DB",
              "&:hover": {
                background: "rgba(0, 0, 0, 0.02)",
              },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
}
