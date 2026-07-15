import Layout from "../components/layout/Layout";

import DashboardCards from "../components/dashboard/DashboardCards";
import ApplicationsChart from "../components/dashboard/ApplicationsChart";
import StatusPieChart from "../components/dashboard/StatusPieChart";
import CareerInsights from "../components/dashboard/CareerInsights";

import {
  Typography,
  Grid,
  Box,
} from "@mui/material";


export default function Dashboard() {


  return (

    <Layout>


      <Box

        sx={{

          maxWidth:"1400px",

          mx:"auto"

        }}

      >



        {/* Header */}

        <Box mb={5}>


          <Typography

            variant="h4"

            fontWeight={800}

            color="#0F172A"

          >

            Dashboard

          </Typography>



          <Typography

            color="text.secondary"

            mt={1}

          >

            Welcome back, Georgina 👋 Here's your career progress overview.

          </Typography>


        </Box>








        {/* Statistics Cards */}


        <Box mb={5}>


          <DashboardCards />


        </Box>









        {/* Analytics Section */}


        <Grid

          container

          spacing={3}

          alignItems="stretch"

        >




          <Grid

            item

            xs={12}

            lg={8}

          >


            <Box

              sx={{

                height:"100%"

              }}

            >


              <ApplicationsChart />


            </Box>


          </Grid>








          <Grid

            item

            xs={12}

            lg={4}

          >


            <Box

              sx={{

                height:"100%"

              }}

            >


              <StatusPieChart />


            </Box>


          </Grid>



        </Grid>









        {/* Career Insights */}


        <Box mt={6}>


          <Typography

            variant="h5"

            fontWeight={800}

            mb={3}

            color="#0F172A"

          >

            Career Insights

          </Typography>




          <CareerInsights />



        </Box>





      </Box>



    </Layout>

  );

}