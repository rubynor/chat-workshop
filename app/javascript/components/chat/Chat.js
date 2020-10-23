import React, { useState, useEffect, useReducer, useRef } from "react"
import PropTypes from "prop-types"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import consumer from '../../channels/consumer';

const useStyles = makeStyles({
  root: {
    maxHeight: 700,
    maxWidth: 1000,
    //margin: '0px auto',
    //marginTop: '1%',
    overflowY: 'scroll',
    overflowX: 'hidden'
  },
  row: {
    marginBottom: '10px',
  },
  messageList: {
    listStyle: 'none',
    margin: 0,
    padding: 0
  },
  message: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  messageBody: { 
    marginTop: '5px'
  },
  messageContainer: {
    display: 'flex',
    marginBottom: '10px'
  },
  avatar: {
    width: '40px',
    marginRight: '10px',
    display: 'flex',
    flexShrink: 0
  }
});

function reducer(state, action) {
  switch (action.type) {
    case "set":
      return { messages: action.payload };
    case "add":
      return { messages: [...state.messages, action.payload] };
  }
}

export default function Chat(props) {
  const classes = useStyles();
  const [ newMessage, setNewMessage ] = useState('');
  const [state, dispatch] = useReducer(reducer, { messages: props.messages || [] });
  const [ channel, setChannel ] = useState(null);
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView()
  }

  useEffect(scrollToBottom, [state.messages]);

  useEffect(() => {
    const channel = consumer.subscriptions.create(
      'ChatChannel', {
        received: (data) => {
          dispatch({ type: 'add', payload: data.message })
        },
      }
    )

    setChannel(channel)
  }, [])

  async function addMessage() {
    scrollToBottom()
    await channel.send({ email: props.email, body: newMessage })
    setNewMessage('')
  }

  return (
    <>
      <h1> Chat </h1>
      <Card className={classes.root}>
        <ul className={classes.messageList}>
          { state.messages.map((msg) => (
              <li key={msg.id} className={classes.messageContainer}>
                <div className={classes.avatar}>
                  <Avatar alt={msg.user.nickname} src={msg.user.avatar_url} />
                </div>

                <div className={classes.message}>
                  <div>
                    <strong>{ msg.user.nickname }</strong>
                  </div>
                  <p className={classes.messageBody} >
                    {msg.body}
                  </p>
                </div>
              </li>
            )
          )}
        </ul>
        <div ref={messagesEndRef} />
      </Card>
        <TextField
          className={classes.spacing}
          id="message"
          label="message"
          variant="outlined"
          onChange={e => setNewMessage(e.target.value)}
          value={newMessage}
        />
        <Button
          type="submit"
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
