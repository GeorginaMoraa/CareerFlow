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
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Camera, Save, Edit2, X } from "lucide-react";
import Layout from "../components/layout/Layout";

export default function Profile() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [isEditing, setIsEditing] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [showPhotoDialog, setShowPhotoDialog] = useState(false);

  const [profile, setProfile] = useState({
    firstName: "Georgina",
    lastName: "Mora",
    email: "georgina@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Passionate software engineer looking for my next opportunity.",
    currentCompany: "Tech Startup",
    currentRole: "Senior Software Engineer",
    yearsOfExperience: "5",
    skills: ["React", "JavaScript", "Python", "Node.js", "TypeScript"],
  });

  const [editedProfile, setEditedProfile] = useState(profile);
  const [newSkill, setNewSkill] = useState("");

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleAddSkill = () => {
    if (newSkill && !editedProfile.skills.includes(newSkill)) {
      setEditedProfile({
        ...editedProfile,
        skills: [...editedProfile.skills, newSkill],
      });
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skill) => {
    setEditedProfile({
      ...editedProfile,
      skills: editedProfile.skills.filter((s) => s !== skill),
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
      <Box mb={4} display="flex" justifyContent="space-between" alignItems="center">
        <div>
          <Typography variant="h4" fontWeight="700" gutterBottom>
            Profile
          </Typography>
          <Typography color="text.secondary" variant="body2">
            Manage your professional information
          </Typography>
        </div>
        {!isEditing && (
          <Button
            variant="contained"
            startIcon={<Edit2 size={20} />}
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </Button>
        )}
      </Box>

      <Grid container spacing={3}>
        {/* Profile Card */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: "center", pt: 4 }}>
              {/* Profile Photo */}
              <Box position="relative" display="inline-block" mb={2}>
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    margin: "0 auto",
                    backgroundColor: theme.palette.primary.main,
                    fontSize: "3rem",
                  }}
                  src={profilePhoto}
                >
                  {profile.firstName.charAt(0)}
                  {profile.lastName.charAt(0)}
                </Avatar>
                {isEditing && (
                  <IconButton
                    size="small"
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      backgroundColor: theme.palette.primary.main,
                      color: "white",
                      "&:hover": {
                        backgroundColor: theme.palette.primary.dark,
                      },
                    }}
                    onClick={() => setShowPhotoDialog(true)}
                  >
                    <Camera size={20} />
                  </IconButton>
                )}
              </Box>

              {/* Name and Title */}
              <Typography variant="h5" fontWeight="bold" mb={1}>
                {profile.firstName} {profile.lastName}
              </Typography>
              <Typography color="text.secondary" variant="body2" mb={0.5}>
                {profile.currentRole}
              </Typography>
              <Typography color="text.secondary" variant="caption">
                {profile.currentCompany}
              </Typography>

              {/* Contact Info */}
              <Box mt={3} textAlign="left">
                <Typography variant="caption" fontWeight="bold" display="block" mb={1}>
                  Contact Information
                </Typography>
                <Box mb={1}>
                  <Typography variant="caption" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
                    {profile.email}
                  </Typography>
                </Box>
                <Box mb={1}>
                  <Typography variant="caption" color="text.secondary">
                    Phone
                  </Typography>
                  <Typography variant="body2">{profile.phone}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Location
                  </Typography>
                  <Typography variant="body2">{profile.location}</Typography>
                </Box>
              </Box>

              {/* Experience */}
              <Box mt={3} textAlign="left">
                <Typography variant="caption" fontWeight="bold" display="block" mb={1}>
                  Experience
                </Typography>
                <Typography variant="body2">
                  {profile.yearsOfExperience} years
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Details Card */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              {isEditing ? (
                // Edit Mode
                <Box>
                  <Typography variant="h6" fontWeight="bold" mb={3}>
                    Edit Profile Information
                  </Typography>

                  <Grid container spacing={2} mb={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="First Name"
                        value={editedProfile.firstName}
                        onChange={(e) =>
                          setEditedProfile({
                            ...editedProfile,
                            firstName: e.target.value,
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Last Name"
                        value={editedProfile.lastName}
                        onChange={(e) =>
                          setEditedProfile({
                            ...editedProfile,
                            lastName: e.target.value,
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        value={editedProfile.email}
                        onChange={(e) =>
                          setEditedProfile({
                            ...editedProfile,
                            email: e.target.value,
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Phone"
                        value={editedProfile.phone}
                        onChange={(e) =>
                          setEditedProfile({
                            ...editedProfile,
                            phone: e.target.value,
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Location"
                        value={editedProfile.location}
                        onChange={(e) =>
                          setEditedProfile({
                            ...editedProfile,
                            location: e.target.value,
                          })
                        }
                      />
                    </Grid>
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
                        placeholder="Tell us about yourself..."
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Current Company"
                        value={editedProfile.currentCompany}
                        onChange={(e) =>
                          setEditedProfile({
                            ...editedProfile,
                            currentCompany: e.target.value,
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Current Role"
                        value={editedProfile.currentRole}
                        onChange={(e) =>
                          setEditedProfile({
                            ...editedProfile,
                            currentRole: e.target.value,
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        type="number"
                        label="Years of Experience"
                        value={editedProfile.yearsOfExperience}
                        onChange={(e) =>
                          setEditedProfile({
                            ...editedProfile,
                            yearsOfExperience: e.target.value,
                          })
                        }
                      />
                    </Grid>
                  </Grid>

                  {/* Skills Section */}
                  <Box mb={3}>
                    <Typography variant="subtitle2" fontWeight="bold" mb={2}>
                      Skills
                    </Typography>
                    <Box display="flex" gap={1} mb={2} flexWrap="wrap">
                      {editedProfile.skills.map((skill) => (
                        <Chip
                          key={skill}
                          label={skill}
                          onDelete={() => handleRemoveSkill(skill)}
                          color="primary"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                    <Box display="flex" gap={1}>
                      <TextField
                        size="small"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Add a skill..."
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleAddSkill();
                          }
                        }}
                      />
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={handleAddSkill}
                      >
                        Add
                      </Button>
                    </Box>
                  </Box>

                  {/* Action Buttons */}
                  <Box display="flex" gap={2}>
                    <Button
                      variant="contained"
                      onClick={handleSave}
                      startIcon={<Save size={20} />}
                    >
                      Save Changes
                    </Button>
                    <Button variant="outlined" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </Box>
                </Box>
              ) : (
                // View Mode
                <Box>
                  <Box mb={3}>
                    <Typography variant="subtitle2" fontWeight="bold" mb={1}>
                      Bio
                    </Typography>
                    <Typography variant="body2">{profile.bio}</Typography>
                  </Box>

                  <Box mb={3}>
                    <Typography variant="subtitle2" fontWeight="bold" mb={2}>
                      Skills
                    </Typography>
                    <Box display="flex" gap={1} flexWrap="wrap">
                      {profile.skills.map((skill) => (
                        <Chip key={skill} label={skill} color="primary" />
                      ))}
                    </Box>
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" fontWeight="bold" mb={1}>
                      Professional Information
                    </Typography>
                    <Typography variant="body2" mb={0.5}>
                      <strong>Company:</strong> {profile.currentCompany}
                    </Typography>
                    <Typography variant="body2" mb={0.5}>
                      <strong>Role:</strong> {profile.currentRole}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Experience:</strong> {profile.yearsOfExperience} years
                    </Typography>
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Photo Upload Dialog */}
      <Dialog open={showPhotoDialog} onClose={() => setShowPhotoDialog(false)}>
        <DialogTitle>Upload Profile Photo</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            style={{ width: "100%" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPhotoDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
}