import React ,{useState, useEffect}from 'react'
import {
  Movie as MovieIcon,
  Theaters,
  Language,
  PlusOne,
  Favorite,
  FavoriteBorderOutlined ,
  Remove,
  ArrowBack,
} from '@mui/icons-material';
import genreIcons from "../../assets/genres";
import { Modal,Typography, Button, ButtonGroup, Grid, Box,
        CircularProgress,useMediaQuery, Rating } from '@mui/material';
import { useParams,Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import axios from 'axios';
import { useGetMovieQuery, useGetRecommendationsQuery,useGetListQuery } from "../Services/TMDB";
import useStyles from './Styles'
import {MovieList} from '..';
import { userSelector } from '../../Features/Auth';
import { selectGenreOrCategory } from '../../Features/CurrentGenreOrCategory';


const MovieInfo = () => {
   const { id } = useParams();
   const classes = useStyles();
   const dispatch = useDispatch()
   const {user} = useSelector(userSelector)
   
   const [open , setOpen] =useState(false)

   const { data, isFetching, error } = useGetMovieQuery(id);
   console.log(data);
   const { data: recommendations, isFetching: isRecommendationFectching } =
     useGetRecommendationsQuery({
       list: "/recommendations",
       movie_id: id,
     });

   const [isMovieFavorited, setIsMovieFavorited] = useState(false);
   const [isMovieWatchList, setIsMovieWatchList] = useState(false);

  //  const isMovieFavorited = false
  //  const isMovieListed = false


 const {data: favoriteMovies} = useGetListQuery
 ({
  listName:'favorite/movies',acountId:user.id, 
  sessionId: localStorage.getItem('session_id'), page:1})

 const {data: watchListMovies} = useGetListQuery
 ({
  listName:'watchList/movies',acountId:user.id, 
  sessionId: localStorage.getItem('session_id'), page:1})

useEffect(() => {
setIsMovieFavorited(!!favoriteMovies?.results?.find((movie) => movie.id === data?.id))
},[favoriteMovies,data])

useEffect(() => {
setIsMovieWatchList(!watchListMovies?.results?.find((movie) => movie.id === data?.id))
},[watchListMovies,data])

   const addToFavorite = async () => {
    await axios.post(`https://api.themoviedb.org/3/3account/${user.id}
    favorite?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`,{
      media_type:'movie',
      media_id:id,
      favorite:!isMovieFavorited
    })
    setIsMovieFavorited((prev) =>!prev)
   }
   const addToWatchList = async () => {
       await axios.post(`https://api.themoviedb.org/3/3account/${user.id}
    favorite?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`,{
      media_type:'movie',
      media_id:id,
      watchList:!isMovieWatchList
    })
    setIsMovieListed((prev) =>!prev)
   }
  
  console.log(recommendations)
  console.log(data)
  if(isFetching){
    return(
      <Box display='flex' justifyContent='center' alignItems='center'>
        <CircularProgress size='8rem'/>
      </Box>
)
}
if(error){
    return(
    <Box display='flex' justifyContent='center' alignItems='center'>
      <Link to='/'></Link>
      </Box>  
    )
  }
 

  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid item sm={12} lg={4} style={{display:'flex', marginBottom:'30px'}}>
        <img
          className={classes.poster}
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          alt={data?.title}
        />
      </Grid>

      <Grid item container direction="column" lg={7}>
        <Typography variant="h3" align="center" gutterBottom>
          {data?.title} ({data.release_date.split("-")[0]})
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {data?.tagline}
        </Typography>
        <Grid item className={classes.containerSpaceAround}>
          <Box display="flex" align="center">
            <Rating readOnly value={data.volt_average / 2} />
            <Typography
              variant="subtitle1"
              gutterBottom
              style={{ marginLeft: "10px" }}
            >
              {data.vote_avarage}/ 10
            </Typography>
          </Box>
          <Typography variant="h6" align="center" gutterBottom>
          {data?.runtime} min language:{data?.spoken_languages.length >
           0 ?`/${data?.spoken_languages[0].name}` : ''} 
            {/* {data?.runtime} min
            {data?.spoken_languages.length > 0
              ? `/${data?.spoken_languages[0].name}`
              : ''} */}
          </Typography>
        </Grid>
        <Grid item className={classes.genresContainer}>
          {data?.genres?.map((genre) => (
            <Link
              key={genre.name}
              className={classes.links}
              to="/"
              onClick={() => dispatch(selectGenreOrCategory(genre.id))}
            >
              <img
                src={genreIcons[genre.name.toLowerCase()]}
                className={classes.genreImage}
                height={30}
              />
            </Link>
          ))}
        </Grid>
        <Typography variant="h5" gutterBottom sytle={{ marginTop: 1 }}>
          Overview
        </Typography>
        <Typography style={{ marginBottom: "2rem" }}>
          {data?.overview}
        </Typography>

        <Grid item container style={{ marginTop: "2rem" }}>
          <div className={classes.buttonsContainer}>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size="small" variant="outlined">
                <Button
                  target="_blank"
                  rel="noopener noreferer"
                  href={data?.homepage}
                  endIcon={<Language />}
                >
                  Website
                </Button>

                <Button
                  target="_blank"
                  rel="noopener noreferer"
                  href={`https://www.imdb.com/title/${data?.imdb_id}`}
                  endIcon={<MovieIcon />}
                >
                  IMDB
                </Button>
                <Button
                  onClick={() => setOpen(true)}
                  href="#"
                  endIcon={<Theaters />}
                >
                  {/* {" "} */}
                  Trailer
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.buttonContainer}>
              <ButtonGroup>
                <Button
                  onClick={addToFavorite}
                  endIcon={
                    isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />
                  }
                >
                  {isMovieFavorited ? "unFavorite" : "Favorite"}
                </Button>
                <Button
                  onClick={addToWatchList}
                  endIcon={isMovieWatchList ? <Remove /> : <PlusOne />}
                >
                  Watchlist
                </Button>
                <Button
                  endIcon={<ArrowBack />}
                  sx={{ borderColor: "primary.main" }}
                >
                  <Typography
                    style={{ textDecoration: "none" }}
                    component={Link}
                    to="/"
                    color="inherit"
                    variant="subtitle2"
                  >
                    BACK
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>
      {/*   Recomendation*/}
      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" gutterBottom align="center">
          You might also like
        </Typography>
        {recommendations ? (
          <MovieList movies={recommendations} />
        ) : (
          <Box>Opps nothing was found</Box>
        )}
      </Box>
      
      
      <Modal closeAfterTransition className={classes.modal} 
      open={open} onClose={()=> setOpen(false)}>
{data?.videos?.results?.length > 0 && (
 <iframe
 autoplay className={classes.videos}
 frameBorder ='0'
 title= 'trailer' 
 src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}

 allow='autoplay'
 />
)}
      </Modal>
    </Grid>
  );
}

export default MovieInfo