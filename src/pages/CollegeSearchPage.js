import React, {useEffect, useState} from 'react';
import {Box} from '@mui/system';
import Grid from '@mui/system/Unstable_Grid';
import {getSchools} from "../api/schools";
import CollegeList from "../components/CollegeList";
import {InputAdornment} from "@mui/material";
import {ContainerItem, SearchIcon, SearchInput} from "./CollegeSearchPage.styled";
import MapComponent from "../components/MapComponent";

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
          <ContainerItem style={{height: 50, backgroundColor: '#ebeef2'}}>
            <SearchInput
              placeholder="Search for college"
              variant="outlined"
              onChange={() => {}}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon/>
                  </InputAdornment>
                )
              }}
            />
          </ContainerItem>
        </Grid>
        <Grid xs={4}>
        </Grid>
        <Grid xs={4}>
          <ContainerItem>
            <CollegeList colleges={colleges} />
          </ContainerItem>
        </Grid>
        <Grid xs={4}>
          <MapComponent/>
        </Grid>
      </Grid>
    </Box>
  )
}
