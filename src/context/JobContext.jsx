import { createContext, useContext, useEffect, useState } from "react";

const JobContext = createContext();

export const useJobs = () => useContext(JobContext);

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);

  // Load jobs from localStorage
  useEffect(() => {
    const savedJobs = localStorage.getItem("careerflow-jobs");

    if (savedJobs) {
      setJobs(JSON.parse(savedJobs));
    }
  }, []);

  // Save jobs whenever they change
  useEffect(() => {
    localStorage.setItem("careerflow-jobs", JSON.stringify(jobs));
  }, [jobs]);

  const addJob = (job) => {
    setJobs((prev) => [
      {
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
},
      ...prev,
    ]);
  };

  const updateJob = (updatedJob) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === updatedJob.id ? updatedJob : job
      )
    );
  };

  const deleteJob = (id) => {
  setJobs((prev) => prev.filter((job) => job.id !== id));
};
const getJobById = (id) => {
  return jobs.find((job) => job.id === Number(id));
};

  const importJobs = (newJobs) => {
    setJobs(newJobs);
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        addJob,
        updateJob,
        deleteJob,
        importJobs,
        getJobById,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};