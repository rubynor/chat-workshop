import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import consumer from '../../channels/consumer';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 400,
    margin: '0px auto',
    marginTop: '10%'
  },
  spacing: {
    marginTop: '10px',
    display: 'block'
  },
  ul: {
    listStyle: 'none',
    margin: 0,
    padding: 0
  },
  message: {
    marginTop: '10px'
  }
});



export default function Chat(props) {
  const classes = useStyles();
  const [ messages, setMessages ] = useState(props.messages);
  const [ newMessage, setNewMessage ] = useState('');
  //const [ channel, setChannel ] = useState(null);
  let channel = null

  function updateMessages(data) {
    console.log(messages)
    setMessages([...messages, data.message])
  }

  useEffect(() => {
    channel = consumer.subscriptions.create(
      'ChatChannel', {
        received: updateMessages
      }
    );

  }, [])


  async function addMessage() {
    console.log(channel)
    await channel.send({ email: props.email, body: newMessage })
    setNewMessage('')
  }


  return (
    <>
      <h1> Chat </h1>

      <ul className={classes.ul} >
       { messages.map((msg) => (
           <li key={msg.id} className={classes.message}>
              <strong>{ msg.user.nickname }</strong>
              <br />
             {msg.body}
           </li>
         )
       )}
      </ul>

      <TextField
        className={classes.spacing}
        id="message"
        label="message"
        variant="outlined"
        onChange={e => setNewMessage(e.target.value)}
        value={newMessage}
      />

      <Button
        className={classes.spacing}
        variant="contained"
        color="primary"
        onClick={addMessage}
      >
        send
      </Button>
    </>
  );
}
