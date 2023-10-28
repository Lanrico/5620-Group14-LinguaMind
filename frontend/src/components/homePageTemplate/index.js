import { Button, Grid, Paper, Typography, useTheme } from "@mui/material";
import PageTemplate from "../pageTemplate";

import { useContext } from "react";
import DrawerContent from "../userProfileInfo/layout/MainLayout/Drawer/DrawerContent";
import { AuthContext } from "../../context/authContext";
import { Link, useParams } from "react-router-dom";
import img from '../../images/Unauthenticate.webp'
import UserProfile from "../homePageTabs/userProfile";
import AiTranslationTabPane from "../AiTranslationTabPane";
import AiContentPolishTabPane from "../AiContentPolishTabPane";
import AiEmailTabPane from "../AiEmailTabPane";
import AISchedule from "../homePageTabs/AISchedule";
import AINotification from "../homePageTabs/AINotification";

import Profile from "../homePageTabs/profile/profile";
import Dashboard from "../homePageTabs/dashboard";
import VersionPane from "../homePageTabs/version";

const HomePageTemplete = (props) => {
  const theme = useTheme();
  const { tab } = useParams();
  const authContext = useContext(AuthContext);

  const TabComponent = () => {
    switch (tab) {
      case 'AI_translation': return <AiTranslationTabPane />;
      case 'profile': return <UserProfile />;
      case 'profile-mgt': return <Profile />;
      case 'dashboard': return <Dashboard />;
      case 'version': return <VersionPane />;
      case 'AI_polish': return <AiContentPolishTabPane />;
      case 'AI_schedule': return <AISchedule />;
      case 'AI_notification': return <AINotification />;
      case 'AI_email': return <AiEmailTabPane />;
      default: return <></>;
    }
  }


  console.log(props.user)
  return (
    <PageTemplate>
      {
        props.user.id === authContext.userProfile.id ? (
          <Paper sx={{ backgroundColor: theme.palette.primary.light }} elevation={0}>
            <Paper sx={{ backgroundColor: theme.palette.primary.main, height: 200, display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
              <Typography textAlign={"center"} color={theme.palette.primary.contrastText} variant="h2">
                Welcome, {props.user.username}
              </Typography>
            </Paper>
            <Paper elevation={0} sx={{ borderRadius: 0 }}>
              <Grid container  >
                <Grid xs={3}>
                  <DrawerContent />
                </Grid>
                <Grid xs={9} p={3}>
                  {TabComponent()}
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