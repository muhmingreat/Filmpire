import { makeStyles } from "@mui/styles";


    

export default makeStyles((theme) => ({
 containerSpaceAround:{
 display:'flex',
 justifyContent:'space-around',
 margin:'10px 0 !important ',
 [theme.breakpoints.down('sm')] :{
    flexDirection:'column',
    flexWrap:'wrap'
 }
},
poster:{
   borderRadius: '20px',
   boxShadow:"0.5rem 1em 1em rgba(64,64,70)",
   width:'80%',
   [theme.breakpoints.down('sm')] :{
      margin: '0 auto ',
      width: '100%',
   }
},
[theme.breakpoints.down('sm')] :{
   margin:'0 auto',
   width: '100%',
   height:'350',
   marginBottom: '30px'
},
genresContainer:{
margin:'10px 0 !important',
display:'flex',
justifyContent:'space-between',
flexWrap:'wrap'
},
genreImage:{
   filter:theme.palette.mode === 'dark' && 'invert(1)',
   marginRight: '10px',

},
links:{
   display:'flex',
   justifyContent:'center',
   TextDecoration:'none',
   alignItems:'center',
   [theme.breakpoints.down('sm')] :{
      padding:'0.5rem 1rem',
   },
},
buttonsContainer:{
   display:'flex',
   justifyContent:'space-between',
   width:'100%',
   [theme.breakpoints.down('sm')]:{
      flexDirection:'çolumn'
   }
},
modal :{
display:'flex',
alignItems: 'center',
justifyContent:'center'
},

videos:{
   // display:'flex',
   // justifyContent:'center',
   // alignItems:'center',
   width:'50%',
   height:'50%',
   [theme.breakpoints.down('sm')]:{
      width:'90%',
      height:'90%'
   }
}
}));
