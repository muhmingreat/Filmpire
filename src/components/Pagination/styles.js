import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
container:{
    display :'flex',
    alignItems:'center',
    justifyContent:'center'
},
 button:{
  margin:'30px 2px',  
 },
 pageName:{
    margin: '0 20px !important',
    color: theme.palette.text.primary
 }
}));
