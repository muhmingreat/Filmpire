import React, {useState, useEffect} from 'react'
import { TextField, InputAdornment,useMediaQuery } from '@mui/material'
import {Search as SearchIcon}  from '@mui/icons-material'
import {useDispatch, useSelector} from 'react-redux'
import { useLocation } from 'react-router-dom'
import useStyle from './style'
import { searchMovie } from "../../Features/CurrentGenreOrCategory";

const Search = () => {
const classes = useStyle();
const dispatch = useDispatch();
const location = useLocation();
const [query, setQuery] = useState('');
const isMobile = useMediaQuery("(max-width: 600px)");
const handleKeyPress = (event) => {
if(event.key === 'Enter'){
  dispatch(searchMovie(query))  
}
}
if(location.pathname !== '/') return null;

   return (
     <div className={classes.searchContainer}>
     {!isMobile ? 
       <TextField
         onKeyPress={handleKeyPress}
         onChange={(event) => setQuery(event.target.value)}
         value={query}
         variant="standard"
         InputProps={{
           className: classes.input,
           startAdornment: (
             <InputAdornment position="start">
               <SearchIcon />
              
             </InputAdornment>
           ),
         }} />
         : null}
     </div>
   );
}

export default Search