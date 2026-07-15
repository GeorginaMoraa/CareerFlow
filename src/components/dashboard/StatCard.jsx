import {
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";


export default function StatCard({
  title,
  value,
  icon,
  color,
}) {


  return (

    <Card

      sx={{

        height:"100%",

        minHeight:150,

        borderRadius:4,

        background:"#FFFFFF",

        border:"1px solid #E2E8F0",

        boxShadow:
        "0 4px 20px rgba(15,23,42,0.04)",


        transition:"all .25s ease",


        "&:hover":{

          transform:"translateY(-4px)",

          boxShadow:
          "0 12px 30px rgba(15,23,42,0.10)"

        }

      }}

    >


      <CardContent

        sx={{

          p:3,

          "&:last-child":{

            pb:3

          }

        }}

      >



        <Box

          display="flex"

          justifyContent="space-between"

          alignItems="flex-start"

        >




          <Box>


            <Typography

              variant="body2"

              color="text.secondary"

              fontWeight={600}

              mb={1}

            >

              {title}

            </Typography>




            <Typography

              variant="h3"

              fontWeight={800}

              color="#0F172A"

            >

              {value}

            </Typography>



          </Box>







          <Box

            sx={{

              width:56,

              height:56,

              borderRadius:3,


              display:"flex",

              alignItems:"center",

              justifyContent:"center",


              color:"#fff",


              background:color,


              boxShadow:
              `0 8px 20px ${color}55`

            }}

          >

            {icon}

          </Box>



        </Box>




      </CardContent>


    </Card>

  );

}