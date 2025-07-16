import React from 'react'
import { Backdrop, CircularProgress } from '@mui/material'
import { useSelector } from 'react-redux'

function Loading() {
   const {loading} = useSelector((store) => store.product);

   return (
      <Backdrop
         sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
         open={loading}
      >
         <CircularProgress color='inherit'/>
      </Backdrop>
   )
}

export default Loading
