import { format, parseISO, isValid } from "date-fns";

export const newId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

export const todayISO = () => format(new Date(), "yyyy-MM-dd");

export function formatDate(value, pattern = "MMM d, yyyy") {
  if (!value) return "—";
  const date = typeof value === "string" ? parseISO(value) : value;
  return isValid(date) ? format(date, pattern) : "—";
}

export function getGreeting(date = new Date()) {
  const hour = date.getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

/** Combine an interview's date + time into a sortable Date. */
export function interviewDateTime(interview) {
  const date = parseISO(`${interview.date}T${interview.time || "00:00"}`);
  return isValid(date) ? date : null;
}

/** Make sure data loaded from storage/import has the shape the app expects. */
export function normalizeJob(raw) {
  if (!raw || typeof raw !== "object") return null;

  const now = new Date().toISOString();
  const toArray = (value) => (Array.isArray(value) ? value : []);

  // Older versions stored notes as a single string.
  let notes = toArray(raw.notes);
  if (typeof raw.notes === "string" && raw.notes.trim()) {
    notes = [{ id: newId(), text: raw.notes.trim(), createdAt: now }];
  }

  return {
    company: "",
    position: "",
    location: "",
    salary: "",
    status: "Applied",
    priority: "Medium",
    workType: "",
    jobUrl: "",
    contactName: "",
    contactEmail: "",
    dateApplied: "",
    createdAt: now,
    updatedAt: now,
    ...raw,
    id: String(raw.id ?? newId()),
    notes,
    timeline: toArray(raw.timeline).map((e) => ({ ...e, id: e.id ?? newId() })),
    interviews: toArray(raw.interviews).map((i) => ({
      ...i,
      id: i.id ?? newId(),
    })),
  };
}

export function downloadFile(filename, content, type = "text/plain") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

const csvCell = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;

export function jobsToCSV(jobs) {
  const columns = [
    ["Company", "company"],
    ["Position", "position"],
    ["Location", "location"],
    ["Work type", "workType"],
    ["Salary", "salary"],
    ["Status", "status"],
    ["Priority", "priority"],
    ["Date applied", "dateApplied"],
    ["Job URL", "jobUrl"],
    ["Contact", "contactName"],
    ["Contact email", "contactEmail"],
  ];
  const header = columns.map(([label]) => csvCell(label)).join(",");
  const rows = jobs.map((job) =>
    columns.map(([, key]) => csvCell(job[key])).join(",")
  );
  return [header, ...rows].join("\n");
}
