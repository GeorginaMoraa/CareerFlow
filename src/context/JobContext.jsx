import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import toast from "react-hot-toast";

export const JobContext = createContext();

export const useJobs = () => {
  const context = useContext(JobContext);

  if (!context) {
    throw new Error("useJobs must be used within a JobProvider");
  }

  return context;
};

export const JobProvider = ({ children }) => {
  // Load jobs from localStorage
  let initialJobs = [];
  let initialError = null;

  try {
    const savedJobs = localStorage.getItem("careerflow-jobs");

    if (savedJobs) {
      const parsedJobs = JSON.parse(savedJobs);
      initialJobs = Array.isArray(parsedJobs) ? parsedJobs : [];
    }
  } catch (err) {
    console.error("Error loading jobs:", err);
    initialError = "Failed to load applications. Starting fresh.";
  }

  const [jobs, setJobs] = useState(initialJobs);
  const [loading] = useState(false);
  const [error, setError] = useState(initialError);

  // Skip first save
  const skipSaveRef = useRef(true);

  useEffect(() => {
    if (skipSaveRef.current) {
      skipSaveRef.current = false;
      return;
    }

    try {
      localStorage.setItem("careerflow-jobs", JSON.stringify(jobs));
    } catch (err) {
      console.error("Error saving jobs:", err);

      setTimeout(() => {
        setError("Failed to save changes. Try again.");
      }, 0);

      toast.error("Failed to save changes");
    }
  }, [jobs]);

  // Add Job
  const addJob = useCallback((job) => {
    const newJob = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      timeline: [
        {
          id: Date.now(),
          title: "Application Submitted",
          description: "Application was created in CareerFlow.",
          date: new Date().toISOString(),
        },
      ],
      notes: [],
      interviews: [],
      documents: [],
      ...job,
    };

    setJobs((prev) => [newJob, ...prev]);
    toast.success("Application added successfully");

    return newJob;
  }, []);

  // Update Job
  const updateJob = useCallback((updatedJob) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === updatedJob.id
          ? {
              ...updatedJob,
              updatedAt: new Date().toISOString(),
            }
          : job
      )
    );

    toast.success("Application updated successfully");
    return updatedJob;
  }, []);

  // Delete Job
  const deleteJob = useCallback((id) => {
    setJobs((prev) => prev.filter((job) => job.id !== id));
    toast.success("Application deleted");
  }, []);

  // Find by ID
  const getJobById = useCallback(
    (id) => jobs.find((job) => job.id === Number(id)),
    [jobs]
  );

  // Filter by status
  const getJobsByStatus = useCallback(
    (status) => {
      if (status === "All") return jobs;
      return jobs.filter((job) => job.status === status);
    },
    [jobs]
  );

  // Search
  const searchJobs = useCallback(
    (query) => {
      const lower = query.toLowerCase();

      return jobs.filter(
        (job) =>
          job.company?.toLowerCase().includes(lower) ||
          job.position?.toLowerCase().includes(lower) ||
          job.location?.toLowerCase().includes(lower)
      );
    },
    [jobs]
  );

  // Import
  const importJobs = useCallback((newJobs) => {
    if (!Array.isArray(newJobs)) {
      throw new Error("Invalid jobs format");
    }

    setJobs(newJobs);
    toast.success(`Imported ${newJobs.length} applications`);
  }, []);

  // Export
  const exportJobs = useCallback(() => {
    return JSON.stringify(jobs, null, 2);
  }, [jobs]);

  // Statistics
  const getStats = useCallback(() => {
    return {
      total: jobs.length,
      applied: jobs.filter((j) => j.status === "Applied").length,
      interviews: jobs.filter((j) => j.status === "Interview").length,
      assessments: jobs.filter((j) => j.status === "Assessment").length,
      offers: jobs.filter((j) => j.status === "Offer").length,
      rejected: jobs.filter((j) => j.status === "Rejected").length,
    };
  }, [jobs]);

  return (
    <JobContext.Provider
      value={{
        jobs,
        loading,
        error,
        addJob,
        updateJob,
        deleteJob,
        getJobById,
        getJobsByStatus,
        searchJobs,
        importJobs,
        exportJobs,
        getStats,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};
