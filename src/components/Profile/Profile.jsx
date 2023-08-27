import React,{useEffect} from 'react'
import { Typography,Button, Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { ExitToApp } from '@mui/icons-material'
import {userSelector} from '../../Features/Auth'
import { useGetListQuery } from '../Services/TMDB'
// import MovieInfo from '../MovieInfo/MovieInfo'

const Profile = () => {
  const {user} = useSelector(userSelector)
  
 const { data: favoriteMovies } = useGetListQuery({
   listName: "favorite/movies",
   acountId: user.id,
   sessionId: localStorage.getItem("session_id"),
   page: 1,
 });

 const { data: watchListMovies } = useGetListQuery({
   listName: "watchList/movies",
   acountId: user.id,
   sessionId: localStorage.getItem("session_id"),
   page: 1,
 });
  console.log(user)
  const logout = ( ) =>{
    localStorage.clear() 
    window.location.href ='/'
  }
useEffect(()=> {

},[])
  return (

  <Box>
  
    <Box display='flex' justifyContent='space-between'>
      <Typography variant='h4' gutterBottom>My Profile</Typography>
    <Button color='inherit' onClick={logout}>
     Logout &nbsp; <ExitToApp/>
    </Button>
    </Box>
    {!favoriteMovies?.results?.length  && !watchListMovies?.results?.length ?
    <Typography varaint='h5'>
      Add favorite or  some watchlist  movies to see here!
    </Typography>
    :(
      <Box>
      <RatedCard title='Favorite Movie ' data={favoriteMovies}/>
      <RatedCard title='watchList ' data= {watchListMovies}/>
      </Box>
    )
    }
    
  </Box>
  );
}

export default Profile