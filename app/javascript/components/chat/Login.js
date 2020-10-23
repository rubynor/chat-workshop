import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import axios from 'axios'

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
  }
});

export default function Login(props) {
  const classes = useStyles()
  const [ email, setEmail ] = useState(props.email)
  const [ nickname, setNickname ] = useState(props.nickname)
  const [ submitting, setSubmitting ] = useState(false)
  const [ validate, setValidate ] = useState(false)

  useEffect(() => {
    if (submitting && !nicknameIsInvalid() && !emailIsInvalid()) {
      axios.post('/login', { user: { email: email, nickname: nickname } })
        .then(function (response) {
          window.location = response.data.redirect_path;
        })
    }

    return () => {
      setSubmitting(false)
    }
  }, [submitting])

  function login(e) {
    setValidate(true)
    setSubmitting(true)
  }

  function nicknameIsInvalid() {
    if (!validate)
      return false

    return nickname.length < 2
  }

  function emailIsInvalid() {
    if (!validate)
      return false

    return !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
  }

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            Enter chat!
          </Typography>

          <TextField
            className={classes.spacing}
            id="email"
            label="Email"
            variant="outlined"
            onChange={e => setEmail(e.target.value)}
            value={email}
            error={emailIsInvalid()}
          />

          <TextField
            className={classes.spacing}
            id="nickname"
            label="Nickname"
            variant="outlined"
            onChange={e => setNickname(e.target.value)}
            value={nickname}
            error={nicknameIsInvalid()}
          />

          <Button
            className={classes.spacing}
            variant="contained"
            color="primary"
            onClick={login}
          >
            Primary
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
