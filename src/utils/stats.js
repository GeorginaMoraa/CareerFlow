import {
  eachMonthOfInterval,
  format,
  parseISO,
  startOfMonth,
  subMonths,
  isValid,
} from "date-fns";

import { APPLICATION_STATUS } from "../constants/application";
import { interviewDateTime } from "./helpers";

const pct = (part, whole) => (whole ? Math.round((part / whole) * 100) : 0);

export function getStats(jobs) {
  const total = jobs.length;
  const byStatus = Object.fromEntries(
    APPLICATION_STATUS.map((s) => [
      s,
      jobs.filter((j) => j.status === s).length,
    ])
  );
  const active = byStatus.Applied + byStatus.Assessment + byStatus.Interview;

  // "Heard back" = anything past the initial Applied stage.
  const heardBack = total - byStatus.Applied;
  const reachedInterview = jobs.filter(
    (j) =>
      j.status === "Interview" ||
      j.status === "Offer" ||
      j.interviews.length > 0
  ).length;

  return {
    total,
    byStatus,
    active,
    responseRate: pct(heardBack, total),
    interviewRate: pct(reachedInterview, total),
    offerRate: pct(byStatus.Offer, total),
  };
}

export function applicationsByMonth(jobs, months = 6) {
  const end = startOfMonth(new Date());
  const buckets = eachMonthOfInterval({
    start: subMonths(end, months - 1),
    end,
  });
  const counts = Object.fromEntries(
    buckets.map((d) => [format(d, "yyyy-MM"), 0])
  );

  jobs.forEach((job) => {
    const date = job.dateApplied ? parseISO(job.dateApplied) : null;
    if (!date || !isValid(date)) return;
    const key = format(date, "yyyy-MM");
    if (key in counts) counts[key] += 1;
  });

  return buckets.map((d) => ({
    month: format(d, "MMM"),
    applications: counts[format(d, "yyyy-MM")],
  }));
}

export function upcomingInterviews(jobs, limit = 5) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  return jobs
    .flatMap((job) =>
      job.interviews.map((interview) => ({
        job,
        interview,
        at: interviewDateTime(interview),
      }))
    )
    .filter((x) => x.at && x.at >= now)
    .sort((a, b) => a.at - b.at)
    .slice(0, limit);
}

export function recentActivity(jobs, limit = 6) {
  return jobs
    .flatMap((job) => job.timeline.map((event) => ({ job, event })))
    .filter(({ event }) => event.date)
    .sort((a, b) => b.event.date.localeCompare(a.event.date))
    .slice(0, limit);
}
