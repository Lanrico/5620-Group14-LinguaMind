import { Alert, Autocomplete, Box, Button, Collapse, Grid, IconButton, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/authContext';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AnimateButton from '../userProfileInfo/components/@extended/AnimateButton';
import CloseIcon from '@mui/icons-material/Close';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const UserProfile = () => {

  const authContext = useContext(AuthContext);
  console.log(authContext.userProfile);
  const labelWidth = 4;
  const [name, setName] = React.useState(authContext.userProfile.name);
  const [phone, setPhone] = React.useState(authContext.userProfile.phone);
  const [bio, setBio] = React.useState(authContext.userProfile.bio);
  // const [birthDate, setBirthDate] = React.useState(authContext.userProfile.birthday);
  const [birthDate, setBirthDate] = React.useState("01/01/2000");
  const [openPassword, setOpenPassword] = React.useState(false);

  const handleSetName = (e) => {
    setName(e.target.value);
  }

  const handleSetBio = (e) => {
    setBio(e.target.value);
  }

  const handleSetPhone = (e) => {
    setPhone(e.target.value);
  }

  const handleSave = () => {
    const newUserProfile = authContext.userProfile;
    newUserProfile.name = name;
    newUserProfile.phone = phone;
    newUserProfile.bio = bio;
    newUserProfile.birthday = birthDate;
    console.log(newUserProfile);

    authContext.handleSetUserProfile(newUserProfile);
    // setOpenSuccess(true);
    /* eslint-disable no-restricted-globals */
    // location.reload()
    /* eslint-enable no-restricted-globals */

  }

  const handleSavePassword = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    console.log(user)
    sendPasswordResetEmail(auth, user.email).then(() => {
      setOpenPassword(true)
    }).catch((error) => {
      console.log(error)
    });
  }

  return (
    <Grid container marginLeft={5}>
      <Typography variant='h6' color={'grey'}>Change your profile</Typography>
      <Grid container style={{ alignItems: 'center' }} marginY={1}>
        <Grid item xs={labelWidth}>
          <Typography variant='h6' >Name</Typography>
        </Grid>
        <Grid item>
          <TextField
            sx={{ width: 300 }}
            name="name"
            variant="outlined"
            id='name'
            value={name}
            onChange={handleSetName}
            placeholder='Your name'
          />
        </Grid>
      </Grid>
      <Grid container style={{ alignItems: 'center' }} marginY={1}>
        <Grid item xs={labelWidth}>
          <Typography variant='h6' >Bio</Typography>
        </Grid>
        <Grid item>
          <TextField
            multiline
            minRows={3}
            sx={{ width: 300 }}
            name="bio"
            variant="outlined"
            id='bio'
            value={bio}
            onChange={handleSetBio}
            placeholder='Write something about yourself'
          />
        </Grid>
      </Grid>
      <Grid container style={{ alignItems: 'center' }} marginY={1}>
        <Grid item xs={labelWidth}>
          <Typography variant='h6'>Phone</Typography>
        </Grid>
        <Grid item>
          <TextField
            sx={{ width: 300 }}
            name="phone"
            variant="outlined"
            id='phone'
            value={phone}
            onChange={handleSetPhone}
            placeholder='Your phone number'
          />
        </Grid>
      </Grid>
      <Grid container style={{ alignItems: 'center' }} marginY={1}>
        <Grid item xs={labelWidth}>
          <Typography variant='h6' >Birth Date</Typography>
        </Grid>
        <Grid item>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              // value={birthDate}
              onChange={(newValue) => {
                setBirthDate(newValue);
              }}
              inputFormat="DD/MM/YYYY"
              openTo="year"
              // maxDate={new Date()}
              renderInput={(params) => <TextField sx={{ width: 300 }} fullWidth {...params} />}
              placeholder="DD/MM/YYYY"
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
      <Grid container style={{ alignItems: 'center' }} marginY={1} marginBottom={5}>
        <Grid item xs={labelWidth}></Grid>
        <Grid >
          <AnimateButton>
            <Button
              disableElevation
              disabled={name === '' || ((isNaN(parseFloat(phone)) || !isFinite(phone)) && phone)}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleSave}
            >
              Save
            </Button>
          </AnimateButton>
        </Grid>
      </Grid>

      <Button onClick={handleSavePassword} >I want to change my password</Button>
      <Box sx={{ width: '100%' }}>
        <Collapse in={openPassword}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpenPassword(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            A email has been sent to your email address. Please check your email to reset your password.
          </Alert>
        </Collapse>
      </Box>
    </Grid>
  )
}

export default UserProfile;