import { Grid, Paper, Typography, useTheme } from "@mui/material";
import PageTemplate from "../pageTemplate";

import { useContext } from "react";
import DrawerContent from "../userProfileInfo/layout/MainLayout/Drawer/DrawerContent";
import { AuthContext } from "../../context/authContext";
import { Link, useParams } from "react-router-dom";
import img from '../../images/Unauthenticate.webp'

const HomePageTemplete = (props) => {
  const theme = useTheme();
  const { tab } = useParams();
  const authContext = useContext(AuthContext);

  console.log(props.user)
  return (
    <PageTemplate>
      {
        props.user.id === authContext.userProfile.id ? (
          <Paper sx={{ backgroundColor: theme.palette.primary.light }} elevation={0}>
            <Paper sx={{ backgroundColor: theme.palette.primary.main, height: 200, display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
              <Typography textAlign={"center"} color={theme.palette.primary.contrastText} variant="h2">
                Welcome, {props.user.name}
              </Typography>
            </Paper>
            <Paper elevation={0} sx={{ borderRadius: 0 }}>
              <Grid container  >
                <Grid xs={3}>
                  <DrawerContent />
                </Grid>
                <Grid xs={9} p={3}>
                  {
                    tab === "checkReview" ?
                      (<>
                        {/* <CheckReview /> */}
                      </>) :
                      tab === "proUserRequest" ?
                        (<>
                          {/* <ProUserRequest /> */}
                        </>) :
                        tab === "updateData" ?
                          (<>
                            {/* <UpdateData /> */}
                          </>) :
                          tab === "profile" ?
                            (<>
                              {/* <UserProfile /> */}
                            </>) :
                            tab === "history" ?
                              (
                                <>
                                  {/* <History /> */}
                                </>
                              ) :
                              tab === "favourite" ?
                                (
                                  <>
                                    {/* <Favourite /> */}
                                  </>
                                ) :
                                tab === "recommendation" ?
                                  (
                                    <>
                                      {/* <Recommendation /> */}
                                    </>
                                  ) :
                                  tab === "interestConfig" ?
                                    (
                                      <>
                                        {/* <InterestConfig /> */}
                                      </>
                                    ) :
                                    null
                  }
                </Grid>
              </Grid>
            </Paper>
          </Paper>
        ) : (
          <Typography variant="h6" textAlign={"center"} sx={{ flexGrow: 1 }}>
            <br /><br />
            You can not access these content.
            <br />
            <img src={img} alt="Unauthenticate" />
            <br />
            Click <Link to={"/"} style={{ color: theme.palette.primary }}>here</Link> to return.
          </Typography>
        )
      }

    </PageTemplate>
  )
}

export default HomePageTemplete;