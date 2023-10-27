import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import USYDLogo from '../../images/USYDLogo.png';
import { Grid } from "@mui/material";

const PageFooter = (props) => {
  return (
    <Grid container mt={1} spacing={1} sx={{ flexGrow: 1 }}>
      <AppBar elevation={0} position="static" color="primary">
        <Toolbar>
          <img src={USYDLogo} height="50px" alt=""></img>
          <Box sx={{ flexGrow: 1 }} />
          <Typography color="white">
            This website is 5620 Group14 LinguaMind system.
          </Typography>
        </Toolbar>
      </AppBar>
    </Grid>
  )
}

export default PageFooter;