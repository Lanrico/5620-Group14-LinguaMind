import { Button, Divider, IconButton, InputAdornment, TextField, Typography } from "@mui/material";

import { useState } from "react";
import ScheduleCard from "../scheduleCard";
import dayjs from "dayjs";
import PublishIcon from '@mui/icons-material/Publish';
import schedule from "../../sampleData/schedule";

const AISchedule = (props) => {
  const [cards, setCards] = useState([]);
  const [newTasks, setNewTasks] = useState('');

  const handleSubmit = () => {
    console.log(newTasks);
    var finalTasks = newTasks;
    schedule.map((task) => {
      finalTasks += ". Then I want to do ";
      finalTasks += task.description;
      finalTasks += " at ";
      finalTasks += task.time;
      finalTasks += " this task is at importance level: ";
      finalTasks += task.importance;
      return null;
    })
    console.log(finalTasks);
    setNewTasks('');
  }

  const addCard = () => {
    setCards([...cards,
    <ScheduleCard importance="" time={dayjs('2023-10-31T15:30')} description="" />
    ]);
  };

  return (
    <>
      <TextField
        label="New tasks"
        multiline
        rows={4}
        placeholder="Use natural language to describe your upcoming tasks, include the deadline."
        fullWidth
        onChange={(e) => setNewTasks(e.target.value)}
        InputProps={{
          endAdornment:
            <InputAdornment position="end" >
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleSubmit}
              >
                <PublishIcon />
              </IconButton>
            </InputAdornment >
        }}
      />
      <Divider sx={{ my: 1 }}></Divider>
      <Typography variant="h5" sx={{ m: 1 }}>Current Tasks</Typography>
      {
        schedule.map((item) => {
          return (
            <ScheduleCard importance={item.importance} time={dayjs(item.time)} description={item.description} />
          )
        })
      }
      {cards}
      <Button variant="outlined" onClick={addCard}>
        Add Task
      </Button>
    </>
  );
};

export default AISchedule;