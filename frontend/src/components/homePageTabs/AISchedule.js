import { Button, CircularProgress, Divider, IconButton, InputAdornment, TextField, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import ScheduleCard from "../scheduleCard";
import dayjs from "dayjs";
import PublishIcon from '@mui/icons-material/Publish';
// import schedule from "../../sampleData/schedule";
import scheduleService from "../../services/scheduleService";

const AISchedule = (props) => {

  const [cards, setCards] = useState([]);
  const [cardsData, setCardsData] = useState([]);
  const [newTasks, setNewTasks] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    scheduleService.getScheduleByEmail(props.user.email)
      .then((res) => {
        const initialCards = res.data.map(item => {
          console.log(item)
          const newCardData = {
            importance: item.importance,
            time: dayjs(item.time),
            description: item.description,
            remove: false,
          }
          setCardsData(prev => [...prev, newCardData])
          return <ScheduleCard data={newCardData} setData={setCardsData} index={cards.length} />;
        });

        // const initialCards = schedule.map(item => {
        //   console.log(item)
        //   const newCardData = {
        //     importance: item.importance,
        //     time: dayjs(item.time),
        //     description: item.description,
        //     remove: false,
        //   }
        //   setCardsData(prev => [...prev, newCardData])
        //   return <ScheduleCard data={newCardData} setData={setCardsData} index={cards.length} />;
        // });
        setCards(initialCards);
      });
  }, []);

  const handleSubmit = () => {
    setIsLoading(true);
    console.log(newTasks);
    var finalTasks = newTasks;
    cardsData.map((task) => {
      console.log(task)
      if (!task.remove) {
        // schedule.map((task) => {
        finalTasks += ". Then I want to do ";
        finalTasks += task.description;
        finalTasks += " at ";
        finalTasks += task.time.format();
        finalTasks += " this task is at importance level: ";
        finalTasks += task.importance;
      }
      return null;
    })
    console.log(finalTasks);
    scheduleService.generateSchedule(props.user.email, finalTasks)
      .then((res) => {
        console.log(res);
        setCards([])
        setCardsData([])
        res.data.map((item) => {
          const newCardData = {
            importance: item.importance,
            time: dayjs(item.time),
            description: item.description,
            remove: false,
          };
          setCardsData(prev => [...prev, newCardData]);
          setCards([...cards,
          <ScheduleCard data={newCardData} setData={setCardsData} index={cards.length} />
          ]);
          return null;
        })
        setNewTasks('');
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      })

  }

  const addCard = () => {
    const newCardData = {
      importance: "",
      time: dayjs(),
      description: "",
      remove: false,
    };
    setCardsData(prev => [...prev, newCardData]);
    setCards([...cards,
    <ScheduleCard data={newCardData} setData={setCardsData} index={cards.length} />
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
            isLoading ?
              <CircularProgress />
              :
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
      {/* {
        schedule.map((item) => {
          const newCardData1 = {
            importance: item.importance,
            time: dayjs(item.time),
            description: item.description,
            remove: false,
          };
          setCardsData(prev => [...prev, newCardData1]);
          return (
            <ScheduleCard data={newCardData1} setData={setCardsData} index={cards.length} />
          )
        })
      } */}
      {cards}
      <Button variant="outlined" onClick={addCard}>
        Add Task
      </Button>
    </>
  );
};

export default AISchedule;