import { addDays, format } from "date-fns";
import { newId } from "./helpers";

const day = (offset) => format(addDays(new Date(), offset), "yyyy-MM-dd");
const iso = (offset) => addDays(new Date(), offset).toISOString();

const ev = (title, description, offset) => ({
  id: newId(),
  title,
  description,
  date: iso(offset),
});

export function buildSampleJobs() {
  const base = [
    {
      company: "Safaricom",
      position: "Software Engineer",
      location: "Nairobi, Kenya",
      workType: "Hybrid",
      salary: "KES 250k/mo",
      status: "Interview",
      priority: "High",
      dateApplied: day(-14),
      interviews: [
        {
          date: day(2),
          time: "10:00",
          type: "Technical",
          notes: "Bring laptop",
        },
      ],
      timeline: [
        ev("Application Submitted", "Applied via careers portal.", -14),
        ev("Moved to Assessment", "Status changed to Assessment.", -9),
        ev("Moved to Interview", "Status changed to Interview.", -4),
      ],
    },
    {
      company: "Andela",
      position: "Frontend Developer",
      location: "Remote",
      workType: "Remote",
      salary: "$3,500/mo",
      status: "Assessment",
      priority: "High",
      dateApplied: day(-8),
      timeline: [
        ev("Application Submitted", "Applied via referral.", -8),
        ev("Moved to Assessment", "Take-home challenge received.", -3),
      ],
    },
    {
      company: "Flutterwave",
      position: "React Engineer",
      location: "Lagos, Nigeria",
      workType: "Remote",
      salary: "$4,000/mo",
      status: "Applied",
      priority: "Medium",
      dateApplied: day(-5),
      timeline: [ev("Application Submitted", "Applied on LinkedIn.", -5)],
    },
    {
      company: "Microsoft",
      position: "Software Engineer II",
      location: "Dublin, Ireland",
      workType: "On-site",
      salary: "€75k/yr",
      status: "Offer",
      priority: "High",
      dateApplied: day(-30),
      interviews: [
        { date: day(-10), time: "14:00", type: "Final round", notes: "" },
      ],
      timeline: [
        ev("Application Submitted", "Applied online.", -30),
        ev("Moved to Interview", "Status changed to Interview.", -18),
        ev("Moved to Offer", "Offer received 🎉", -2),
      ],
    },
    {
      company: "Twiga Foods",
      position: "Full-Stack Developer",
      location: "Nairobi, Kenya",
      workType: "On-site",
      salary: "KES 200k/mo",
      status: "Rejected",
      priority: "Low",
      dateApplied: day(-25),
      timeline: [
        ev("Application Submitted", "Applied via email.", -25),
        ev("Moved to Rejected", "Position was filled.", -12),
      ],
    },
    {
      company: "Cellulant",
      position: "Backend Engineer",
      location: "Nairobi, Kenya",
      workType: "Hybrid",
      salary: "",
      status: "Applied",
      priority: "Medium",
      dateApplied: day(-2),
      timeline: [ev("Application Submitted", "Applied on company site.", -2)],
    },
  ];

  const now = new Date().toISOString();
  return base.map((job) => ({
    id: newId(),
    createdAt: now,
    updatedAt: now,
    jobUrl: "",
    contactName: "",
    contactEmail: "",
    notes: [],
    ...job,
    interviews: (job.interviews || []).map((i) => ({ id: newId(), ...i })),
  }));
}
