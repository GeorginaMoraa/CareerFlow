import { createContext, useCallback, useMemo } from "react";
import toast from "react-hot-toast";

import { useLocalStorage } from "../hooks/useLocalStorage";
import { STORAGE_KEYS } from "../constants/application";
import { newId, normalizeJob } from "../utils/helpers";
import { buildSampleJobs } from "../utils/sampleData";

// eslint-disable-next-line react-refresh/only-export-components
export const JobContext = createContext(null);

const event = (title, description) => ({
  id: newId(),
  title,
  description,
  date: new Date().toISOString(),
});

export function JobProvider({ children }) {
  const [storedJobs, setJobs] = useLocalStorage(STORAGE_KEYS.jobs, []);

  const jobs = useMemo(
    () =>
      (Array.isArray(storedJobs) ? storedJobs : [])
        .map(normalizeJob)
        .filter(Boolean),
    [storedJobs]
  );

  const patchJob = useCallback(
    (id, fn) => {
      setJobs((prev) =>
        prev.map((raw) => {
          const job = normalizeJob(raw);
          if (job.id !== String(id)) return raw;
          return { ...fn(job), updatedAt: new Date().toISOString() };
        })
      );
    },
    [setJobs]
  );

  const addJob = useCallback(
    (data) => {
      const { notes: initialNote, ...rest } = data;
      const now = new Date().toISOString();
      const job = normalizeJob({
        ...rest,
        id: newId(),
        createdAt: now,
        updatedAt: now,
        timeline: [event("Application Submitted", "Added to CareerFlow.")],
        notes: initialNote?.trim()
          ? [{ id: newId(), text: initialNote.trim(), createdAt: now }]
          : [],
      });
      setJobs((prev) => [job, ...prev]);
      toast.success("Application added");
      return job;
    },
    [setJobs]
  );

  const updateJob = useCallback(
    (id, changes) => {
      patchJob(id, (job) => {
        const next = { ...job, ...changes };
        if (changes.status && changes.status !== job.status) {
          next.timeline = [
            ...job.timeline,
            event(
              `Moved to ${changes.status}`,
              `Status changed from ${job.status} to ${changes.status}.`
            ),
          ];
        }
        return next;
      });
      toast.success("Application updated");
    },
    [patchJob]
  );

  // Used by the pipeline board; quiet because the card visibly moves.
  const updateJobStatus = useCallback(
    (id, status) => {
      patchJob(id, (job) =>
        job.status === status
          ? job
          : {
              ...job,
              status,
              timeline: [
                ...job.timeline,
                event(
                  `Moved to ${status}`,
                  `Status changed from ${job.status} to ${status}.`
                ),
              ],
            }
      );
    },
    [patchJob]
  );

  const deleteJob = useCallback(
    (id) => {
      setJobs((prev) => prev.filter((j) => String(j.id) !== String(id)));
      toast.success("Application deleted");
    },
    [setJobs]
  );

  const getJobById = useCallback(
    (id) => jobs.find((job) => job.id === String(id)),
    [jobs]
  );

  const addNote = useCallback(
    (id, text) => {
      patchJob(id, (job) => ({
        ...job,
        notes: [
          { id: newId(), text, createdAt: new Date().toISOString() },
          ...job.notes,
        ],
      }));
    },
    [patchJob]
  );

  const deleteNote = useCallback(
    (id, noteId) => {
      patchJob(id, (job) => ({
        ...job,
        notes: job.notes.filter((n) => n.id !== noteId),
      }));
    },
    [patchJob]
  );

  const saveInterview = useCallback(
    (jobId, interview) => {
      patchJob(jobId, (job) => {
        const exists = job.interviews.some((i) => i.id === interview.id);
        const interviews = exists
          ? job.interviews.map((i) => (i.id === interview.id ? interview : i))
          : [...job.interviews, { ...interview, id: newId() }];
        return {
          ...job,
          interviews,
          timeline: exists
            ? job.timeline
            : [
                ...job.timeline,
                event(
                  "Interview scheduled",
                  `${interview.type || "Interview"} on ${interview.date}.`
                ),
              ],
        };
      });
      toast.success("Interview saved");
    },
    [patchJob]
  );

  const deleteInterview = useCallback(
    (jobId, interviewId) => {
      patchJob(jobId, (job) => ({
        ...job,
        interviews: job.interviews.filter((i) => i.id !== interviewId),
      }));
      toast.success("Interview removed");
    },
    [patchJob]
  );

  const importJobs = useCallback(
    (incoming) => {
      if (!Array.isArray(incoming)) throw new Error("Invalid file format");
      const cleaned = incoming
        .map((raw) => normalizeJob({ ...raw, id: newId() }))
        .filter((j) => j && (j.company || j.position));
      setJobs((prev) => [...cleaned, ...prev]);
      toast.success(`Imported ${cleaned.length} applications`);
    },
    [setJobs]
  );

  const loadSampleData = useCallback(() => {
    setJobs((prev) => [...buildSampleJobs(), ...prev]);
    toast.success("Sample data loaded");
  }, [setJobs]);

  const clearJobs = useCallback(() => {
    setJobs([]);
    toast.success("All applications deleted");
  }, [setJobs]);

  const value = useMemo(
    () => ({
      jobs,
      addJob,
      updateJob,
      updateJobStatus,
      deleteJob,
      getJobById,
      addNote,
      deleteNote,
      saveInterview,
      deleteInterview,
      importJobs,
      loadSampleData,
      clearJobs,
    }),
    [
      jobs,
      addJob,
      updateJob,
      updateJobStatus,
      deleteJob,
      getJobById,
      addNote,
      deleteNote,
      saveInterview,
      deleteInterview,
      importJobs,
      loadSampleData,
      clearJobs,
    ]
  );

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
}
