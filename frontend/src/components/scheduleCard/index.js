import { Button, Card, TextField, useTheme } from "@mui/material";

import { DateTimePicker, LocalizationProvider, renderTimeViewClock } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import 'dayjs/locale/en-gb';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';

const ScheduleCard = (props) => {
  const theme = useTheme();
  const [lock, setLock] = useState(true);
  const [remove, setRemove] = useState(false);
  const [description, setDescription] = useState(props.description);
  const handleRemove = () => {
    setRemove(true);
  }

  const importanceColor = {
    "low": "success",
    "medium": "warning",
    "high": "error",
  }

  return (
    remove ? null :
      <Card variant="outlined" sx={{ p: 1, my: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
          <DateTimePicker
            closeOnSelect={true}
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
              seconds: renderTimeViewClock,
            }}
            sx={{ width: '25%' }}
            label="Time"
            value={props.time}
            focused
            disabled={lock}
          />
        </LocalizationProvider>
        <TextField
          label="Description"
          color={importanceColor[props.importance]}
          variant="standard"
          sx={{ width: '50%' }}
          InputProps={{
            readOnly: lock,
          }}
          focused
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <div style={{ marginLeft: 'auto' }} >
          {
            !lock ?
              <Button size="small" variant="outlined" startIcon={<LockIcon />} onClick={() => setLock(true)} sx={{ mr: 1 }}>lock</Button>
              :
              <Button size="small" variant="outlined" startIcon={<EditIcon />} onClick={() => setLock(false)} sx={{ mr: 1 }}>edit</Button>
          }
          <Button size="small" variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={handleRemove}>Delete</Button>
        </div>
      </Card>
  );
};


export default ScheduleCard;