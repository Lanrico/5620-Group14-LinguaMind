import { Alert, Box, Button, Card, Collapse, Grid, IconButton, Typography } from "@mui/material";

import { useState } from "react";
import dayjs from "dayjs";
import schedule from "../../sampleData/schedule";
import NotificationCard from "../notificationCard";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';

const AINotification = (props) => {
  const [cards, setCards] = useState([]);
  const [cardsData, setCardsData] = useState([]);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFail, setOpenFail] = useState(false);
  const importantPrefix = {
    "low": "Not important: ",
    "medium": "Medium important: ",
    "high": "Very important: ",
  }

  const handleSubmit = () => {
    scheduleNotifications(cardsData);
  }

  function sendBrowserNotification(title, message, importance) {
    if (Notification.permission === 'granted') {
      new Notification(title, {
        body: importantPrefix[importance] + message,
      });
    }
    else {
      console.log('not granted');
    }
  }

  function scheduleNotifications(cardsData) {
    let validNotificationCount = 0;
    cardsData.forEach(card => {
      const timeDifference = card.time.diff(dayjs(), 'millisecond');
      if (!card.remove) {
        validNotificationCount++;
        setTimeout(() => {
          sendBrowserNotification(card.topic || 'Notification', card.content, card.importance);
        }, timeDifference);
      }
    });
    if (validNotificationCount === 0) {
      setOpenFail(true);
      setOpenSuccess(false);
    }
    else {
      setOpenSuccess(true);
      setOpenFail(false);
    }
  }

  // const handleImportSchedule = () => {
  //   let scheduleCards = schedule.map((item) => <NotificationCard importance={item.importance} time={dayjs(item.time)} content={item.description} />)
  //   setCards([...cards, scheduleCards]);
  // }

  // const addCard = () => {
  //   setCards([...cards,
  //   <NotificationCard />
  //   ]);
  // };

  const handleClearAll = () => {
    setCards([]);
    setCardsData([]);
  }

  const handleImportSchedule = () => {
    let scheduleCards = schedule.map((item, index) => {
      const newCardData = {
        importance: item.importance,
        time: dayjs(item.time),
        content: item.description,
        remove: false,
        topic: ''
      };
      setCardsData(prev => [...prev, newCardData]);
      return (
        <NotificationCard
          key={index}
          data={newCardData}
          setData={setCardsData}
          index={cards.length + index}
        />
      );
    });
    setCards(prev => [...prev, ...scheduleCards]);
  };

  const addCard = () => {
    const newCardData = {
      importance: "",
      time: dayjs(),
      content: "",
      remove: false,
      topic: ""
    };
    setCardsData(prev => [...prev, newCardData]);
    setCards(prev => [...prev,
    <NotificationCard
      data={newCardData}
      setData={setCardsData}
      index={cards.length}
    />
    ]);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="outlined" onClick={handleImportSchedule}>
          import schedule
        </Button>
        <Button variant="outlined" color="error" onClick={handleClearAll}>
          Clear All
        </Button>
      </div>
      <Typography variant="h5" sx={{ m: 1 }}>All Notifications</Typography>
      <Grid item container spacing={1}>
        {cards}
        <Grid item xs={4}>
          <Card sx={{ height: "320px", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <IconButton aria-label="delete" size="large" color="primary" style={{ width: '100px', height: '100px' }} onClick={addCard}>
              <AddCircleOutlineIcon fontSize="100px" style={{ width: '50px', height: '50px' }} />
            </IconButton>
          </Card>
        </Grid>
      </Grid>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
        <Alert severity="info">Please make sure the permisson of <strong>Notification</strong> on your browser and PC is granted!</Alert>

        <Button variant="outlined" color="success" onClick={handleSubmit}>
          Submit notifications
        </Button>
      </div>
      <Box sx={{ width: '100%' }}>
        <Collapse in={openSuccess}>
          <Alert
            severity="success"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpenSuccess(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mt: 2 }}
          >
            Notifications have been established successfully!
          </Alert>
        </Collapse>
      </Box>
      <Box sx={{ width: '100%' }}>
        <Collapse in={openFail}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpenFail(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mt: 2 }}
          >
            You don't have any notifications!
          </Alert>
        </Collapse>
      </Box>
    </>
  );
};

export default AINotification;