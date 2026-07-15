import { useState } from "react";

import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Divider,
} from "@mui/material";

import {
  Camera,
  Save,
  Edit2,
} from "lucide-react";

import Layout from "../components/layout/Layout";


export default function Profile() {


  const [isEditing,setIsEditing] = useState(false);

  const [profilePhoto,setProfilePhoto] = useState(null);

  const [showPhotoDialog,setShowPhotoDialog] = useState(false);


  const [profile,setProfile] = useState({

    firstName:"Georgina",

    lastName:"Mora",

    email:"georgina@example.com",

    phone:"+254 700 000 000",

    location:"Nairobi, Kenya",

    bio:
    "Passionate software engineering student interested in building useful technology solutions.",

    currentCompany:"Career Development",

    currentRole:"Software Engineering Student",

    yearsOfExperience:"1",

    skills:[
      "React",
      "JavaScript",
      "Python",
      "Node.js",
      "TypeScript"
    ]

  });



  const [editedProfile,setEditedProfile]=useState(profile);

  const [newSkill,setNewSkill]=useState("");



  const handleSave=()=>{

    setProfile(editedProfile);

    setIsEditing(false);

  };



  const handleCancel=()=>{

    setEditedProfile(profile);

    setIsEditing(false);

  };



  const addSkill=()=>{

    if(
      newSkill &&
      !editedProfile.skills.includes(newSkill)
    ){

      setEditedProfile({

        ...editedProfile,

        skills:[
          ...editedProfile.skills,
          newSkill
        ]

      });

      setNewSkill("");

    }

  };



  const removeSkill=(skill)=>{

    setEditedProfile({

      ...editedProfile,

      skills:
      editedProfile.skills.filter(
        item=>item!==skill
      )

    });

  };



  const handlePhotoUpload=(e)=>{

    const file=e.target.files[0];


    if(file){

      const reader=new FileReader();


      reader.onload=(event)=>{

        setProfilePhoto(event.target.result);

        setShowPhotoDialog(false);

      };


      reader.readAsDataURL(file);

    }

  };




return(

<Layout>


<Box

mb={4}

display="flex"

justifyContent="space-between"

alignItems={{
xs:"flex-start",
md:"center"
}}

flexDirection={{
xs:"column",
md:"row"
}}

gap={2}

>


<Box>

<Typography

variant="h4"

fontWeight={800}

>

Profile

</Typography>


<Typography

color="text.secondary"

>

Manage your professional information

</Typography>


</Box>



{

!isEditing &&

<Button

variant="contained"

startIcon={<Edit2 size={20}/>}

onClick={()=>setIsEditing(true)}

sx={{

background:"#2563EB",

borderRadius:3,

px:3,

textTransform:"none",

fontWeight:700

}}

>

Edit Profile

</Button>

}



</Box>





<Grid container spacing={3}>


{/* LEFT PROFILE CARD */}


<Grid item xs={12} lg={4}>


<Card

sx={{

borderRadius:4,

height:"100%",

boxShadow:
"0 8px 30px rgba(15,23,42,.08)"

}}

>


<CardContent

sx={{

textAlign:"center",

pt:5,

px:3

}}

>


<Box

position="relative"

display="inline-block"

mb={2}

>


<Avatar

src={profilePhoto}

sx={{

width:130,

height:130,

fontSize:"3rem",

fontWeight:700,

background:"#2563EB",

boxShadow:
"0 10px 25px rgba(37,99,235,.3)"

}}

>

{profile.firstName[0]}

{profile.lastName[0]}

</Avatar>



{

isEditing &&

<IconButton

onClick={()=>setShowPhotoDialog(true)}

sx={{

position:"absolute",

bottom:5,

right:5,

background:"#2563EB",

color:"#fff",

"&:hover":{
background:"#1D4ED8"
}

}}

>

<Camera size={20}/>

</IconButton>

}



</Box>



<Typography

variant="h5"

fontWeight={800}

>

{profile.firstName}

{" "}

{profile.lastName}

</Typography>



<Typography

color="text.secondary"

>

{profile.currentRole}

</Typography>



<Typography

variant="body2"

color="text.secondary"

>

{profile.location}

</Typography>



<Divider sx={{my:3}}/>




<Typography

fontWeight={700}

textAlign="left"

mb={2}

>

Contact Information

</Typography>



<Box textAlign="left">


<Typography variant="caption">
Email
</Typography>


<Typography mb={2}>
{profile.email}
</Typography>



<Typography variant="caption">
Phone
</Typography>


<Typography mb={2}>
{profile.phone}
</Typography>



<Typography variant="caption">
Experience
</Typography>


<Typography>
{profile.yearsOfExperience} years
</Typography>


</Box>



</CardContent>


</Card>


</Grid>





{/* RIGHT CONTENT */}


<Grid item xs={12} lg={8}>


<Card

sx={{

borderRadius:4,

boxShadow:
"0 8px 30px rgba(15,23,42,.08)"

}}

>


<CardContent

sx={{

p:4

}}

>



{

isEditing ?


<Box>


<Typography

variant="h6"

fontWeight={800}

mb={3}

>

Edit Profile

</Typography>



<Grid container spacing={2}>


{

[

["firstName","First Name"],

["lastName","Last Name"],

["email","Email"],

["phone","Phone"],

["location","Location"],

["currentCompany","Company"],

["currentRole","Role"]

].map(([field,label])=>(


<Grid

item

xs={12}

sm={6}

key={field}

>


<TextField

fullWidth

label={label}

value={editedProfile[field]}

onChange={(e)=>

setEditedProfile({

...editedProfile,

[field]:e.target.value

})

}

/>


</Grid>


))


}



<Grid item xs={12}>


<TextField

fullWidth

multiline

rows={3}

label="Bio"

value={editedProfile.bio}

onChange={(e)=>

setEditedProfile({

...editedProfile,

bio:e.target.value

})

}

/>


</Grid>


</Grid>





<Box mt={3}>


<Typography fontWeight={700} mb={2}>

Skills

</Typography>



<Box display="flex" gap={1} flexWrap="wrap">


{

editedProfile.skills.map(skill=>(


<Chip

key={skill}

label={skill}

onDelete={()=>removeSkill(skill)}

sx={{

background:"#EFF6FF",

color:"#2563EB"

}}

/>


))

}


</Box>



<Box display="flex" gap={1} mt={2}>


<TextField

size="small"

value={newSkill}

onChange={(e)=>setNewSkill(e.target.value)}

placeholder="Add skill"

/>


<Button

variant="outlined"

onClick={addSkill}

>

Add

</Button>


</Box>


</Box>




<Box mt={4} display="flex" gap={2}>


<Button

variant="contained"

startIcon={<Save size={18}/>}

onClick={handleSave}

>

Save

</Button>



<Button

variant="outlined"

onClick={handleCancel}

>

Cancel

</Button>


</Box>


</Box>



:


<Box>


<Typography

fontWeight={700}

mb={1}

>

Bio

</Typography>


<Typography mb={3}>

{profile.bio}

</Typography>



<Divider sx={{my:3}}/>



<Typography

fontWeight={700}

mb={2}

>

Skills

</Typography>


<Box display="flex" gap={1} flexWrap="wrap">


{

profile.skills.map(skill=>(

<Chip

key={skill}

label={skill}

sx={{

background:"#EFF6FF",

color:"#2563EB",

fontWeight:600

}}

/>


))

}


</Box>


<Divider sx={{my:3}}/>


<Typography

fontWeight={700}

mb={2}

>

Professional Information

</Typography>

<Typography>

Company: {profile.currentCompany}

</Typography>

<Typography>

Role: {profile.currentRole}

</Typography>


<Typography>

Experience: {profile.yearsOfExperience} years

</Typography>


</Box>


}



</CardContent>


</Card>


</Grid>



</Grid>





<Dialog

open={showPhotoDialog}

onClose={()=>setShowPhotoDialog(false)}

>


<DialogTitle>
Upload Profile Photo
</DialogTitle>


<DialogContent>


<input

type="file"

accept="image/*"

onChange={handlePhotoUpload}

/>


</DialogContent>



<DialogActions>


<Button

onClick={()=>setShowPhotoDialog(false)}

>

Close

</Button>


</DialogActions>


</Dialog>

</Layout>

);

}