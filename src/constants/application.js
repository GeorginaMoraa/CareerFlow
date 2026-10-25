export const APPLICATION_STATUS = [
  "Applied",
  "Assessment",
  "Interview",
  "Offer",
  "Rejected",
];

export const STATUS_COLORS = {
  Applied: "primary",
  Assessment: "secondary",
  Interview: "warning",
  Offer: "success",
  Rejected: "error",
};

// Hex values for charts (MUI palette names can't be used by recharts).
export const STATUS_HEX = {
  Applied: "#3B82F6",
  Assessment: "#8B5CF6",
  Interview: "#F59E0B",
  Offer: "#10B981",
  Rejected: "#EF4444",
};

export const PRIORITIES = ["High", "Medium", "Low"];

export const WORK_TYPES = ["Remote", "Hybrid", "On-site"];

export const INTERVIEW_TYPES = [
  "Phone screen",
  "Technical",
  "Behavioral",
  "Onsite",
  "Final round",
];

export const STORAGE_KEYS = {
  jobs: "careerflow-jobs",
  settings: "careerflow-settings",
};

export const DEFAULT_SETTINGS = {
  profile: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    headline: "",
    bio: "",
    skills: [],
    linkedin: "",
    portfolio: "",
    photo: "",
  },
  preferences: {
    darkMode: false,
    interviewReminders: true,
  },
};
