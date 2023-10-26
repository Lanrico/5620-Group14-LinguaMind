import { Avatar, Button, Card, CardActions, CardContent, CardHeader, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, useTheme } from "@mui/material";

import { DateTimePicker, LocalizationProvider, renderTimeViewClock } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import 'dayjs/locale/en-gb';

import DeleteIcon from '@mui/icons-material/Delete';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { green, red, yellow } from "@mui/material/colors";

const NotificationCard = ({ data, setData, index }) => {
  const importanceColor = {
    "low": green[500],
    "medium": yellow[500],
    "high": red[500],
  }

  const theme = useTheme();
  const [remove, setRemove] = useState(false);
  const [importance, setImportance] = useState(data.importance); // ["low", "medium", "high"]
  const [content, setContent] = useState(data.content);
  const [time, setTime] = useState(data.time); // dayjs object
  const [topic, setTopic] = useState(data.topic);
  const [color, setColor] = useState(importanceColor[data.importance]); // ["success", "warning", "error"]
  const handleRemove = () => {
    setRemove(true);
    setData(prev => {
      const newCardsData = [...prev];
      newCardsData[index].remove = true;
      return newCardsData;
    });
  }
  const handleImportanceChange = (event) => {
    setColor(importanceColor[event.target.value]);
    setImportance(event.target.value);
    setData(prev => {
      const newCardsData = [...prev];
      newCardsData[index].importance = event.target.value;
      return newCardsData;
    });
  };

  const handleChange = () => {
    // Update the data in the parent
    setData(prev => {
      const newCardsData = [...prev];
      newCardsData[index].importance = importance;
      newCardsData[index].content = content;
      newCardsData[index].topic = topic;
      newCardsData[index].time = time;
      newCardsData[index].remove = remove;
      return newCardsData;
    });
  }


  return (
    remove ? null :
      <Grid item xs={4}>
        <Card variant="outlined" >
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: color }}>
                <NotificationsIcon />
              </Avatar>
            }
            title={
              <TextField
                label="Topic"
                variant="filled"
                size="small"
                onChange={(e) => {
                  setTopic(e.target.value);
                  handleChange();
                }}
                value={topic}
              />
            }
          />
          <CardContent sx={{ py: 0 }}>
            <TextField
              label="Content"
              fullWidth
              multiline
              rows={3}
              onChange={(e) => {
                setContent(e.target.value)
                handleChange();
              }}
              value={content}
              sx={{ mb: 2 }}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
              <DateTimePicker
                closeOnSelect={true}
                label="Time"
                value={data.time}
                onChange={(newTime) => {
                  setTime(newTime)
                  handleChange();
                }}
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                  seconds: renderTimeViewClock,
                }}
                minutesStep={1}
              />
            </LocalizationProvider>
          </CardContent>
          <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 150, margin: 'auto' }}>
              <InputLabel id="demo-simple-select-standard-label">Importance</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={importance}
                onChange={handleImportanceChange}
                label="Importance"
                // autoWidth
                fullWidth
              >
                <MenuItem value={"low"}>Low</MenuItem>
                <MenuItem value={"medium"}>Medium</MenuItem>
                <MenuItem value={"high"}>High</MenuItem>
              </Select>
            </FormControl>
            <IconButton aria-label="delete" onClick={handleRemove} sx={{ marginTop: 1, marginX: 'auto' }}>
              <DeleteIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
  );
};


export default NotificationCard;