import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

import toast from "react-hot-toast";


const JobContext = createContext();


export const useJobs = () => {

  const context = useContext(JobContext);

  if (!context) {
    throw new Error(
      "useJobs must be used within a JobProvider"
    );
  }

  return context;

};




export const JobProvider = ({ children }) => {


  const [jobs,setJobs] = useState([]);

  const [loading,setLoading] = useState(true);

  const [error,setError] = useState(null);




  // Load saved jobs

  useEffect(()=>{

    try{

      const savedJobs =
      localStorage.getItem(
        "careerflow-jobs"
      );


      if(savedJobs){

        const parsed =
        JSON.parse(savedJobs);


        setJobs(
          Array.isArray(parsed)
          ? parsed
          : []
        );

      }


    }catch(err){

      console.error(err);

      setError(
        "Failed to load applications"
      );

      toast.error(
        "Failed to load applications"
      );

    }

    finally{

      setLoading(false);

    }


  },[]);






  // Save jobs correctly

  useEffect(()=>{


    if(loading) return;


    try{


      localStorage.setItem(

        "careerflow-jobs",

        JSON.stringify(jobs)

      );


    }catch(err){


      console.error(err);

      setError(
        "Failed to save changes"
      );

      toast.error(
        "Failed to save changes"
      );


    }


  },[jobs,loading]);







  const addJob = useCallback((job)=>{


    const newJob={


      id:Date.now(),


      createdAt:
      new Date().toISOString(),


      updatedAt:
      new Date().toISOString(),


      timeline:[

        {

          id:Date.now(),

          title:
          "Application Submitted",

          description:
          "Application created in CareerFlow.",

          date:
          new Date().toISOString(),

        }

      ],


      interviews:[],


      notes:[],


      documents:[],


      ...job,

    };



    setJobs(prev=>[
      newJob,
      ...prev
    ]);



    toast.success(
      "Application added"
    );


    return newJob;


  },[]);








  const updateJob = useCallback(
    (updatedJob)=>{


      setJobs(prev=>

        prev.map(job=>

          job.id===updatedJob.id

          ?

          {

            ...updatedJob,

            updatedAt:
            new Date().toISOString()

          }

          :

          job

        )

      );


      toast.success(
        "Application updated"
      );


    },
    []
  );







  const deleteJob = useCallback(
    (id)=>{


      setJobs(prev=>

        prev.filter(
          job=>job.id!==id
        )

      );


      toast.success(
        "Application deleted"
      );


    },
    []
  );








  const getJobById = useCallback(
    (id)=>{

      return jobs.find(
        job=>job.id===Number(id)
      );

    },
    [jobs]
  );






  const getJobsByStatus =
  useCallback(
    (status)=>{

      if(status==="All")
        return jobs;


      return jobs.filter(
        job=>job.status===status
      );

    },
    [jobs]
  );







  const searchJobs =
  useCallback(
    (query)=>{


      const q =
      query.toLowerCase();



      return jobs.filter(job=>

        job.company
        ?.toLowerCase()
        .includes(q)

        ||

        job.position
        ?.toLowerCase()
        .includes(q)

        ||

        job.location
        ?.toLowerCase()
        .includes(q)

      );


    },
    [jobs]
  );









  const getStats =
  useCallback(()=>{


    return {

      total:jobs.length,


      applied:
      jobs.filter(
        j=>j.status==="Applied"
      ).length,


      interviews:
      jobs.filter(
        j=>j.status==="Interview"
      ).length,


      assessments:
      jobs.filter(
        j=>j.status==="Assessment"
      ).length,


      offers:
      jobs.filter(
        j=>j.status==="Offer"
      ).length,


      rejected:
      jobs.filter(
        j=>j.status==="Rejected"
      ).length,

    };


  },[jobs]);







  const value={

    jobs,

    loading,

    error,


    addJob,

    updateJob,

    deleteJob,


    getJobById,

    getJobsByStatus,

    searchJobs,

    getStats,


  };




  return (

    <JobContext.Provider value={value}>

      {children}

    </JobContext.Provider>

  );


};