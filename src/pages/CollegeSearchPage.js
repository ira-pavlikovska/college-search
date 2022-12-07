import React, {useEffect} from 'react';
import {Box} from '@mui/system';
import Grid from '@mui/system/Unstable_Grid';
import styled from '@mui/system/styled';
import {getSchools} from "../api/schools";


const Item = styled('div')(({theme}) => ({
  backgroundColor: '#ffffff',
  border: '1px solid',
  borderColor: '#ced7e0',
  padding: theme.spacing(1),
  borderRadius: '4px',
  textAlign: 'center',
}));

export default function CollegeSearchPage() {

  useEffect(() => {
    getSchools()
      .then((resp) => {
        console.log(JSON.stringify(resp))
      })
      .catch(err => console.log(err))

  }, [])

  return (
    <Box sx={{flexGrow: 1}}>
      <Grid container spacing={1}>
        <Grid xs={12}>
          <Item>
            Search input
          </Item>
        </Grid>
        <Grid xs={4}>
          <Item style={{backgroundColor: '#ced7e0'}}>
            hi
          </Item>
        </Grid>
        <Grid xs={4}>
          <Item style={{backgroundColor: '#ced7e0'}}>
            search list
          </Item>
        </Grid>
        <Grid xs={4}>
          <Item style={{backgroundColor: '#ced7e0'}}>
            Map
          </Item>
        </Grid>
      </Grid>
    </Box>
  )
}
