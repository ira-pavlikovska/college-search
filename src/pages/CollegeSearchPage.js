import React, {useEffect, useState} from 'react';
import {Box} from '@mui/system';
import Grid from '@mui/system/Unstable_Grid';
import {getSchools} from "../api/schools";
import CollegeList from "../components/CollegeList";
import {InputAdornment} from "@mui/material";
import {ContainerItem, SearchIcon, SearchInput} from "./CollegeSearchPage.styled";
import MapComponent from "../components/MapComponent";

export default function CollegeSearchPage() {

  const [keyword, setKeyword] = useState('')
  const [colleges, setColleges] = useState([])
  const [selectedCollege, setSelectedCollege] = useState()

  const handleSchoolSelect = (college) => {
    setSelectedCollege(college)
    setColleges(colleges.map(col => {
      if(col['school.name'] === college['school.name']) {
        return {...col, isSelected: true}
      } else {
        return {...col, isSelected: false}
      }
    }))
  }

  useEffect(() => {
    setSelectedCollege(null)
    getSchools(keyword)
      .then((resp) => setColleges(resp.data.results))
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
