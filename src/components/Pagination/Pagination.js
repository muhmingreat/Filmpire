import React from 'react'
import { Typography, Button } from '@mui/material'
import useStyle from './styles'

const Pagination = ({ currentPage, totalPage, setPage }) => {
    const classes = useStyle();

    const handlePrev = () => {
      if (currentPage !== 1) {
        setPage((prevPage) => prevPage - 1);
      }
    };
    const handleNext = () => {
      if (currentPage !== totalPage) {
        setPage((nextPage) => nextPage + 1)
      }
    };
  
  return (
    <div className={classes.container}>
      <Button
        onClick={handlePrev}
        className={classes.button}
        variant="contained"
        color="primary"
        type="button"
      >
        Prev
      </Button>
      <Typography variant="h4" className={classes.pageName}>
        {currentPage}
      </Typography>
      <Button
        onClick={handleNext}
        className={classes.button}
        variant="contained"
        color="primary"
        type="button"
      >
        Next
      </Button>
    </div>
  );
  };

export default Pagination;