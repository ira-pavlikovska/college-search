import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const CollegeItem = ({college, handleSchoolSelect}) => {
  return (
    <ListItem
      onClick={() => handleSchoolSelect(college)}
      alignItems="flex-start" divider={true}>
      <ListItemText
        primary={college['school.name']}
        secondary={
          <React.Fragment>
            <Typography
              sx={{display: 'inline'}}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {college['school.city']}, {college['school.state']}
            </Typography>
          </React.Fragment>
        }
      />
    </ListItem>
  )
}

export default function CollegeList({colleges, handleSchoolSelect}) {
  return (
    <List sx={{width: '100%', bgcolor: 'background.paper'}}>
      {
        colleges.map(college => <CollegeItem key={college.id} college={college}
                                             handleSchoolSelect={handleSchoolSelect}/>)
      }
    </List>
  );
}
