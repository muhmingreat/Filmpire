import React from 'react'
import { useParams ,useHistory } from 'react-router-dom';
import { useState } from 'react';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useGetActorsDetailsQuery } from '../Services/TMDB';

// use params to get actor id 
// make a new call using redux toolkik query => to get actor detail call
//research tmdb api doc
// use newly created useGetactorHook to get actor info to the component

const Actors = () => {
  const {id} = useParams()
const {data, isFetching, error} = useGetActorsDetailsQuery(id);
if(isFetching){
  return (
    <Box display='flex' justifyContent='center'>
     <CircularProgress size='8rem' />
     </Box>
  )

}
  if(error){
    return (
      <Box display="flex" alignItem="çenter" justifyContent="center">
        <Button
          startIcon={<ArrowBack />}
          onClick={() => history.goBack()}
          color='primary'
        >Go Back</Button>
      </Box>
    );
  }

  return (
    <>
      <Grid container spacing = {3}>
<Grid item lg={5} xl={4}>
<img className={classes.image}
src={`https://image.tmdb.org/t/p/w780${data?.profile_path}`}
alt={data?.name}/>
</Grid>
      </Grid>
    </>
  );
}

export default Actors