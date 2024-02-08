import React from 'react'
import { Mail, Send } from '@mui/icons-material'
import { Box, Button, Container, CssBaseline, Grid } from '@mui/material'
import Input from '@mui/joy/Input';
import { LeftMessageBar, RightMessageBar } from '../../components/MessageBars';
import HeroHeader from '../../components/HeroHeader';

const MainPage = () => {
  const [userMessage, setUserMessage] = React.useState<string | null>(null)
  const [dummyMessages, setDummyMessages] = React.useState<Array<React.ReactElement>>(
    [
      <LeftMessageBar msg='I&apos;m Your Chat Assitant For the day' />,
      <LeftMessageBar msg='Let me Know! How can I help you?' />,
      <RightMessageBar msg='What&apos;s your name' />,
      <LeftMessageBar msg='I&apos;m a Ai here to help you some lorem asd' />,
    ]
  )
  return (
    <>
      <CssBaseline />
      <HeroHeader msg='Let&apos;s Play with AI' />
      <Container fixed>
        {/* CHAT BOX */}
        <Box sx={{ bgcolor: '#FFF7F1', height: '70vh', paddingX: "20px", paddingY: "16px", overflowY: "scroll" }} >
          <Grid container >
            {dummyMessages.map((msg, index) => <React.Fragment key={index}>{msg}</React.Fragment>)}
          </Grid>
        </Box>
        {/* CHAT BOX */}
        <Grid container sx={{ marginTop: '10px' }} gap={1}>
          <Grid xs={10}>
            <Input
              startDecorator={<Mail />}
              sx={{
                "--Input-radius": "24px",
              }}
              placeholder='Type a message ...'
              onChange={(e) => setUserMessage(e.target.value.trim())}
              value={userMessage!}
              id='inputMessageButton'
            />
          </Grid>
          <Grid xs={1}>
            <Button variant="contained" endIcon={<Send />}
              onClick={() => {
                if (userMessage) {
                  setDummyMessages([...dummyMessages, <RightMessageBar msg={userMessage!} />])
                  setUserMessage('')
                  const element = document.getElementById('inputMessageButton')
                  element?.focus()
                }
              }}
              type='submit'>
              Send
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default MainPage