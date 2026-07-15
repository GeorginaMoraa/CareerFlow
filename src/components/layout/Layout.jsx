import React from "react";

import {
  Box,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import AppDrawer from "./AppDrawer";
import TopBar from "./TopBar";


export const DRAWER_WIDTH = 260;


export default function Layout({ children }) {

  const theme = useTheme();

  const isMobile = useMediaQuery(
    theme.breakpoints.down("md")
  );


  const [mobileDrawerOpen, setMobileDrawerOpen] =
    React.useState(false);

  const drawerOpen = isMobile ? mobileDrawerOpen : true;



  return (

    <Box
      sx={{
        display:"flex",
        minHeight:"100vh",
        background:"#F8FAFC",
      }}
    >


      <AppDrawer
        open={drawerOpen}
        mobile={isMobile}
      />



      <Box

        component="main"

        sx={{

          flexGrow:1,

          width:"100%",

          ml:{
            xs:0,
            md:0
          },

        }}

      >


        <TopBar
          onMenuClick={() =>
            setMobileDrawerOpen(!drawerOpen)
          }
        />



        {/* pushes content below fixed navbar */}

        <Toolbar />



        <Box

          sx={{

            px:{
              xs:2,
              sm:3,
              md:3
            },


            py:{
              xs:2,
              md:3
            },


            maxWidth:"1500px",

            mx:"auto",

          }}

        >

          {children}


        </Box>



      </Box>


    </Box>

  );

}