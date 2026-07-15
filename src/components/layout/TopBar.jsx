import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
  Tooltip,
} from "@mui/material";

import {
  NotificationsOutlined,
  DarkModeOutlined,
  Search,
} from "@mui/icons-material";

import { DRAWER_WIDTH } from "./Layout";


export default function TopBar() {

  return (

    <AppBar

      position="fixed"

      elevation={0}

      sx={{

        width:{
          md:`calc(100% - ${DRAWER_WIDTH}px)`,
          xs:"100%"
        },


        ml:{
          md:`${DRAWER_WIDTH}px`,
          xs:0
        },


        background:"#ffffff",

        color:"#0F172A",

        borderBottom:"1px solid #E2E8F0",

        zIndex:(theme)=>theme.zIndex.drawer + 1,

      }}

    >



      <Toolbar

        sx={{

          height:70,

          px:{
            xs:2,
            md:4
          }

        }}

      >



        <Box flexGrow={1}>


          <Typography

            variant="h6"

            fontWeight={800}

            sx={{
              lineHeight:1.2
            }}

          >

            Good Evening, Georgina 👋

          </Typography>



          <Typography

            variant="body2"

            color="text.secondary"

          >

            Track your job applications and career progress

          </Typography>


        </Box>





        <Tooltip title="Search">

          <IconButton>

            <Search/>

          </IconButton>

        </Tooltip>




        <Tooltip title="Dark mode">

          <IconButton>

            <DarkModeOutlined/>

          </IconButton>

        </Tooltip>




        <Tooltip title="Notifications">

          <IconButton>

            <NotificationsOutlined/>

          </IconButton>

        </Tooltip>





        <Avatar

          sx={{

            ml:2,

            bgcolor:"#2563EB",

            fontWeight:700

          }}

        >

          G

        </Avatar>




      </Toolbar>



    </AppBar>


  );

}