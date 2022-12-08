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

  const [keyword, setKeyword] = useState('')
  const [colleges, setColleges] = useState([])
  const [selectedCollege, setSelectedCollege] = useState()

  const handleSchoolSelect = (college) => {
    console.log(`selected ${college['school.name']} on the page`)
    setSelectedCollege(college)
  }

  useEffect(() => {
    setSelectedCollege(null)
    getSchools(keyword)
      .then((resp) => {
        // console.log(JSON.stringify(resp.data.results))
        setColleges(resp.data.results)
      })
      .catch(err => console.log(err))

  }, [keyword])

  return (
    <Box sx={{flexGrow: 1}}>
      <Grid container spacing={1}>
        <Grid xs={12}>
          <ContainerItem style={{height: 50, backgroundColor: '#ebeef2'}}>
            <SearchInput
              placeholder="Search for college"
              variant="outlined"
              onChange={(e) => setKeyword(e.target.value)}
              value={keyword}
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
        <Grid xs={selectedCollege? 1 : 4}>
        </Grid>
        <Grid xs={4}>
          {colleges.length > 0 && (
            <ContainerItem>
              <CollegeList colleges={colleges} handleSchoolSelect={handleSchoolSelect}/>
            </ContainerItem>
          )}
        </Grid>
        <Grid xs={selectedCollege? 7 : 4}>
          {selectedCollege && <MapComponent college={selectedCollege} />}
        </Grid>
      </Grid>
    </Box>
  )
}
