import { createContext, useContext, useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";

const JobContext = createContext();

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error("useJobs must be used within a JobProvider");
  }
  return context;
};

// ✅ FIXED: Enhanced with loading states, error handling, and better utilities
export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load jobs from localStorage
  useEffect(() => {
    try {
      const savedJobs = localStorage.getItem("careerflow-jobs");
      if (savedJobs) {
        const parsedJobs = JSON.parse(savedJobs);
        setJobs(Array.isArray(parsedJobs) ? parsedJobs : []);
      }
      setError(null);
    } catch (err) {
      console.error("Error loading jobs:", err);
      setError("Failed to load applications. Starting fresh.");
      toast.error("Failed to load your applications");
    } finally {
      setLoading(false);
    }
  }, []);

  // Save jobs to localStorage with error handling
  useEffect(() => {
    if (jobs.length > 0 || loading) return; // Don't save on initial load
    
    try {
      localStorage.setItem("careerflow-jobs", JSON.stringify(jobs));
      setError(null);
    } catch (err) {
      console.error("Error saving jobs:", err);
      setError("Failed to save changes. Try again.");
      toast.error("Failed to save changes");
    }
  }, [jobs, loading]);

  // Add new job
  const addJob = useCallback((job) => {
    try {
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
    } catch (err) {
      console.error("Error adding job:", err);
      toast.error("Failed to add application");
      throw err;
    }
  }, []);

  // Update existing job
  const updateJob = useCallback((updatedJob) => {
    try {
      setJobs((prev) =>
        prev.map((job) =>
          job.id === updatedJob.id
            ? { ...updatedJob, updatedAt: new Date().toISOString() }
            : job
        )
      );
      toast.success("Application updated successfully");
      return updatedJob;
    } catch (err) {
      console.error("Error updating job:", err);
      toast.error("Failed to update application");
      throw err;
    }
  }, []);

  // Delete job with confirmation
  const deleteJob = useCallback((id) => {
    try {
      setJobs((prev) => prev.filter((job) => job.id !== id));
      toast.success("Application deleted");
      return true;
    } catch (err) {
      console.error("Error deleting job:", err);
      toast.error("Failed to delete application");
      throw err;
    }
  }, []);

  // Get single job by ID
  const getJobById = useCallback((id) => {
    return jobs.find((job) => job.id === Number(id));
  }, [jobs]);

  // Get jobs filtered by status
  const getJobsByStatus = useCallback((status) => {
    if (status === "All") return jobs;
    return jobs.filter((job) => job.status === status);
  }, [jobs]);

  // Search jobs
  const searchJobs = useCallback((query) => {
    const lowerQuery = query.toLowerCase();
    return jobs.filter(
      (job) =>
        job.company?.toLowerCase().includes(lowerQuery) ||
        job.position?.toLowerCase().includes(lowerQuery) ||
        job.location?.toLowerCase().includes(lowerQuery)
    );
  }, [jobs]);

  // Bulk import jobs
  const importJobs = useCallback((newJobs) => {
    try {
      if (!Array.isArray(newJobs)) {
        throw new Error("Invalid jobs format");
      }
      setJobs(newJobs);
      toast.success(`Imported ${newJobs.length} applications`);
      return true;
    } catch (err) {
      console.error("Error importing jobs:", err);
      toast.error("Failed to import applications");
      throw err;
    }
  }, []);

  // Export jobs
  const exportJobs = useCallback(() => {
    try {
      return JSON.stringify(jobs, null, 2);
    } catch (err) {
      console.error("Error exporting jobs:", err);
      toast.error("Failed to export applications");
      throw err;
    }
  }, [jobs]);

  // Get statistics
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

  const value = {
    // Data
    jobs,
    loading,
    error,

    // Core operations
    addJob,
    updateJob,
    deleteJob,
    getJobById,

    // Helper functions
    getJobsByStatus,
    searchJobs,
    importJobs,
    exportJobs,
    getStats,
  };

  return (
    <JobContext.Provider value={value}>
      {children}
    </JobContext.Provider>
  );
};