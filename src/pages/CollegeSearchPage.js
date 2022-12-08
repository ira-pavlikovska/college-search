import React, {useEffect, useState} from 'react';
import {Box} from '@mui/system';
import Grid from '@mui/system/Unstable_Grid';
import styled from '@mui/system/styled';
import {getSchools} from "../api/schools";
import CollegeList from "../components/CollegeList";
import {TextField} from "@mui/material";


const Item = styled('div')(({theme}) => ({
  backgroundColor: '#ffffff',
  border: '1px solid',
  borderColor: '#ced7e0',
  padding: theme.spacing(1),
  borderRadius: '4px',
  textAlign: 'center',
}));

export default function CollegeSearchPage() {

  const [colleges, setColleges] = useState([])

  useEffect(() => {
    getSchools()
      .then((resp) => {
        // console.log(JSON.stringify(resp))
        setColleges(resp.data.results)
      })
      .catch(err => console.log(err))

  }, [])

  return (
    <Box sx={{flexGrow: 1}}>
      <Grid container spacing={1}>
        <Grid xs={12}>
          <Item>
            <TextField id="outlined-basic" label="Search" variant="outlined" />
          </Item>
        </Grid>
        <Grid xs={4}>
          <Item style={{backgroundColor: '#ced7e0'}}>
            hi
          </Item>
        </Grid>
        <Grid xs={4}>
          <Item style={{backgroundColor: '#ced7e0'}}>
            <CollegeList colleges={colleges} />
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
