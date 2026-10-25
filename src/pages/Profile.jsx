import { useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  IconButton,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Close, Edit, PhotoCamera, Save } from "@mui/icons-material";
import toast from "react-hot-toast";

import PageHeader from "../components/common/PageHeader";
import { useSettings } from "../hooks/useSettings";
import { useJobs } from "../hooks/useJobs";
import { getStats } from "../utils/stats";

const MAX_PHOTO_BYTES = 1024 * 1024;

function ProfileForm({ profile, onSave, onCancel }) {
  const [draft, setDraft] = useState(profile);
  const [skill, setSkill] = useState("");
  const fileRef = useRef(null);

  const set = (name) => (e) =>
    setDraft((d) => ({ ...d, [name]: e.target.value }));

  const addSkill = () => {
    const value = skill.trim();
    if (
      value &&
      !draft.skills.some((s) => s.toLowerCase() === value.toLowerCase())
    ) {
      setDraft((d) => ({ ...d, skills: [...d.skills, value] }));
    }
    setSkill("");
  };

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/"))
      return toast.error("Please choose an image file");
    if (file.size > MAX_PHOTO_BYTES)
      return toast.error("Image must be under 1 MB");
    const reader = new FileReader();
    reader.onload = () => setDraft((d) => ({ ...d, photo: reader.result }));
    reader.readAsDataURL(file);
  };

  const submit = (e) => {
    e.preventDefault();
    if (draft.email && !/^\S+@\S+\.\S+$/.test(draft.email.trim())) {
      return toast.error("Enter a valid email address");
    }
    onSave({
      ...draft,
      firstName: draft.firstName.trim(),
      lastName: draft.lastName.trim(),
    });
  };

  return (
    <Box component="form" onSubmit={submit}>
      <Stack direction="row" spacing={2} sx={{ alignItems: "center", mb: 3 }}>
        <Avatar
          src={draft.photo || undefined}
          sx={{ width: 72, height: 72, bgcolor: "primary.main" }}
        >
          {(draft.firstName || "?").charAt(0).toUpperCase()}
        </Avatar>
        <Button
          startIcon={<PhotoCamera />}
          onClick={() => fileRef.current?.click()}
        >
          Change photo
        </Button>
        {draft.photo && (
          <Button
            color="inherit"
            onClick={() => setDraft((d) => ({ ...d, photo: "" }))}
          >
            Remove
          </Button>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handlePhoto}
        />
      </Stack>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="First name"
            value={draft.firstName}
            onChange={set("firstName")}
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Last name"
            value={draft.lastName}
            onChange={set("lastName")}
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Email"
            type="email"
            value={draft.email}
            onChange={set("email")}
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Phone"
            value={draft.phone}
            onChange={set("phone")}
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Location"
            value={draft.location}
            onChange={set("location")}
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Headline"
            placeholder="e.g. Frontend Developer"
            value={draft.headline}
            onChange={set("headline")}
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="LinkedIn URL"
            value={draft.linkedin}
            onChange={set("linkedin")}
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Portfolio / GitHub URL"
            value={draft.portfolio}
            onChange={set("portfolio")}
            fullWidth
          />
        </Grid>
        <Grid size={12}>
          <TextField
            label="About me"
            value={draft.bio}
            onChange={set("bio")}
            multiline
            minRows={3}
            fullWidth
          />
        </Grid>
        <Grid size={12}>
          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              size="small"
              label="Add a skill"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSkill();
                }
              }}
              fullWidth
            />
            <Button variant="outlined" onClick={addSkill}>
              Add
            </Button>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1.5 }}>
            {draft.skills.map((s) => (
              <Chip
                key={s}
                label={s}
                onDelete={() =>
                  setDraft((d) => ({
                    ...d,
                    skills: d.skills.filter((x) => x !== s),
                  }))
                }
              />
            ))}
          </Box>
        </Grid>
      </Grid>

      <Stack
        direction="row"
        spacing={1}
        sx={{ justifyContent: "flex-end", mt: 3 }}
      >
        <Button startIcon={<Close />} onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" startIcon={<Save />}>
          Save profile
        </Button>
      </Stack>
    </Box>
  );
}

function ProfileView({ profile }) {
  const fullName = [profile.firstName, profile.lastName]
    .filter(Boolean)
    .join(" ");
  const link = (url) =>
    url ? (
      <Link href={url} target="_blank" rel="noopener noreferrer">
        {url}
      </Link>
    ) : (
      "—"
    );

  return (
    <>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={3}
        sx={{ alignItems: { sm: "center" }, mb: 3 }}
      >
        <Avatar
          src={profile.photo || undefined}
          sx={{ width: 96, height: 96, fontSize: 36, bgcolor: "primary.main" }}
        >
          {(profile.firstName || "?").charAt(0).toUpperCase()}
        </Avatar>
        <Box>
          <Typography variant="h5">{fullName || "Your name"}</Typography>
          <Typography color="text.secondary">
            {profile.headline || "Add a headline"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {profile.location}
          </Typography>
        </Box>
      </Stack>

      <Divider sx={{ mb: 2 }} />

      <Grid container spacing={2}>
        {[
          ["Email", profile.email || "—"],
          ["Phone", profile.phone || "—"],
          ["LinkedIn", link(profile.linkedin)],
          ["Portfolio", link(profile.portfolio)],
        ].map(([label, value]) => (
          <Grid key={label} size={{ xs: 12, sm: 6 }}>
            <Typography variant="caption" color="text.secondary">
              {label}
            </Typography>
            <Typography>{value}</Typography>
          </Grid>
        ))}
        <Grid size={12}>
          <Typography variant="caption" color="text.secondary">
            About
          </Typography>
          <Typography sx={{ whiteSpace: "pre-wrap" }}>
            {profile.bio || "—"}
          </Typography>
        </Grid>
        <Grid size={12}>
          <Typography variant="caption" color="text.secondary">
            Skills
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 0.5 }}>
            {profile.skills.length
              ? profile.skills.map((s) => (
                  <Chip key={s} label={s} color="primary" variant="outlined" />
                ))
              : "—"}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default function Profile() {
  const { profile, updateProfile } = useSettings();
  const { jobs } = useJobs();
  const [editing, setEditing] = useState(!profile.firstName);
  const stats = getStats(jobs);

  return (
    <>
      <PageHeader
        title="Profile"
        subtitle="Your details are stored only in this browser"
        action={
          !editing && (
            <Button
              variant="contained"
              startIcon={<Edit />}
              onClick={() => setEditing(true)}
            >
              Edit profile
            </Button>
          )
        }
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card>
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
              {editing ? (
                <ProfileForm
                  profile={profile}
                  onCancel={() => setEditing(false)}
                  onSave={(next) => {
                    updateProfile(next);
                    setEditing(false);
                    toast.success("Profile saved");
                  }}
                />
              ) : (
                <ProfileView profile={profile} />
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" mb={2}>
                Job search summary
              </Typography>
              {[
                ["Applications", stats.total],
                ["In progress", stats.active],
                ["Offers", stats.byStatus.Offer],
                ["Rejected", stats.byStatus.Rejected],
              ].map(([label, value]) => (
                <Box
                  key={label}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    py: 0.75,
                  }}
                >
                  <Typography color="text.secondary">{label}</Typography>
                  <Typography fontWeight={700}>{value}</Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
