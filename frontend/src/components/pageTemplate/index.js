import { Grid } from "@mui/material";
import React from "react";
import PageFooter from "../pageFooter";

const PageTemplate = (props) => {
  return (
    <Grid container>
      <Grid item xs></Grid>
      <Grid item xs={10} lg={7}>
        <Grid></Grid>
        {props.children}
        <PageFooter />
      </Grid>
      <Grid item xs></Grid>
    </Grid>
  );
};

export default PageTemplate;