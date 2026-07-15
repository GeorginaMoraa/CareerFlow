import Grid from "@mui/material/Grid";

import {
  Work,
  CalendarMonth,
  EmojiEvents,
  TrendingUp,
} from "@mui/icons-material";

import StatCard from "./StatCard";

import { useJobs } from "../../context/JobContext";


export default function DashboardCards() {


  const { jobs } = useJobs();



  const applications = jobs.length;



  const interviews = jobs.filter(
    (job) => job.status === "Interview"
  ).length;



  const offers = jobs.filter(
    (job) => job.status === "Offer"
  ).length;



  const successRate =
    applications === 0
      ? 0
      : Math.round(
          (offers / applications) * 100
        );





  const cards = [

    {
      title:"Applications",
      value:applications,
      color:"#2563EB",
      icon:<Work/>
    },


    {
      title:"Interviews",
      value:interviews,
      color:"#F59E0B",
      icon:<CalendarMonth/>
    },


    {
      title:"Offers",
      value:offers,
      color:"#22C55E",
      icon:<EmojiEvents/>
    },


    {
      title:"Success Rate",
      value:`${successRate}%`,
      color:"#7C3AED",
      icon:<TrendingUp/>
    },


  ];





  return (

    <Grid

      container

      spacing={3}

    >


      {
        cards.map((card)=>(


          <Grid

            item

            key={card.title}

            xs={12}

            sm={6}

            lg={3}

          >


            <StatCard

              title={card.title}

              value={card.value}

              color={card.color}

              icon={card.icon}

            />


          </Grid>


        ))
      }



    </Grid>

  );

}