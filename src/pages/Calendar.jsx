import { Box, Typography, Card, CardContent, Chip } from "@mui/material";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import Layout from "../components/layout/Layout";
import { useJobs } from "../context/JobContext";



export default function Calendar() {


const {jobs}=useJobs();




const events = jobs.flatMap((job)=>


(job.interviews || []).map((interview)=>({


id:`${job.id}-${interview.date}`,


title:
`${job.company} Interview`,


date:
interview.date,


backgroundColor:"#2563EB",


borderColor:"#2563EB",



extendedProps:{

company:
job.company,


position:
job.position,


time:
interview.time || "Time not set"


}



}))


);







return(


<Layout>


<Box mb={4}>


<Typography

variant="h4"

fontWeight={800}

>

Calendar

</Typography>


<Typography color="text.secondary">

Manage interviews and career events.

</Typography>


</Box>







<Box

sx={{

display:"flex",

gap:3,

flexDirection:{

xs:"column",

lg:"row"

}

}}

>







{/* MAIN CALENDAR */}


<Card

sx={{

flex:1,

borderRadius:4,

boxShadow:
"0 8px 30px rgba(15,23,42,.08)"

}}

>


<CardContent>


<Box

sx={{

"& .fc-button":{

background:"#2563EB",

border:"none",

borderRadius:"10px"

},


"& .fc-daygrid-day":{

minHeight:"110px"

},


"& .fc-event":{

borderRadius:"8px"

}


}}

>


<FullCalendar


plugins={[
dayGridPlugin
]}


initialView="dayGridMonth"


height="700px"


events={events}


headerToolbar={{

left:
"prev,next today",

center:
"title",

right:""

}}



/>


</Box>


</CardContent>


</Card>









{/* UPCOMING EVENTS */}



<Card

sx={{

width:{

xs:"100%",

lg:350

},


borderRadius:4,


boxShadow:
"0 8px 30px rgba(15,23,42,.08)"

}}

>


<CardContent>


<Typography

variant="h6"

fontWeight={800}

mb={3}

>

Upcoming Events

</Typography>






{

events.length===0

?

<Typography

color="text.secondary"

>

No upcoming events

</Typography>



:


events

.sort(
(a,b)=>
new Date(a.date)-new Date(b.date)
)


.slice(0,5)


.map(event=>(


<Box

key={event.id}

sx={{

mb:2,

p:2,

background:"#F8FAFC",

borderRadius:3,

borderLeft:
"4px solid #2563EB"

}}

>


<Typography

fontWeight={700}

>

{event.extendedProps.company}

</Typography>



<Typography

variant="body2"

>

{event.extendedProps.position}

</Typography>



<Chip

label="Interview"

size="small"

sx={{

mt:1,

background:"#DBEAFE",

color:"#1E40AF"

}}

/>



<Typography

variant="caption"

display="block"

mt={1}

color="text.secondary"

>

{event.date}

{" • "}

{event.extendedProps.time}

</Typography>



</Box>


))


}



</CardContent>


</Card>




</Box>



</Layout>


);


}