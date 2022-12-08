import React, {useEffect, useState} from 'react';
import {Box} from '@mui/system';
import Grid from '@mui/system/Unstable_Grid';
import {getSchools} from "../api/schools";
import CollegeList from "../components/CollegeList";
import {InputAdornment} from "@mui/material";
import {ContainerItem, SearchIcon, SearchInput} from "./CollegeSearchPage.styled";
import MapComponent from "../components/MapComponent";

// The places I want to create markers for.
const initPlaces = [
  // { id: "place1", pos: { lat: 39.09366509575983, lng: -94.58751660204751 } },
  // { id: "place2", pos: { lat: 39.10894664788252, lng: -94.57926449532226 } },
  // { id: "place3", pos: { lat: 39.07602397235644, lng: -94.5184089401211 } }
];



export default function CollegeSearchPage() {

  const [colleges, setColleges] = useState([])
  const [places, setPlaces] = useState(initPlaces)

  useEffect(() => {
    getSchools()
      .then((resp) => {
        // console.log(JSON.stringify(resp.data.results))
        setColleges(resp.data.results)
        setPlaces(resp.data.results.map(school => ({
          id: school['school.name'],
          pos: {
            lat: school['location.lat'],
            lng: school['location.lon']
          }
        })))
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
          <MapComponent places={places} center={places[0].pos}/>
        </Grid>
      </Grid>
    </Box>
  )
}
