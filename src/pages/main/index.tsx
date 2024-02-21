import React, { useEffect, useRef, useState } from 'react'
import { Mail, Send } from '@mui/icons-material'
import { Box, Button, Container, CssBaseline, Grid } from '@mui/material'
import Input from '@mui/joy/Input';
import { DotLoader, LeftMessageBar, LeftMessageSpinner, RightMessageBar } from '../../components/MessageBars';
import HeroHeader from '../../components/HeroHeader';
import { useAuthStore, useChatStore } from '../../store';
import { chatQuery } from '../../http/api';


const MainPage = () => {

  const [userMessage, setUserMessage] = React.useState<string>('')
  const { userInfo } = useAuthStore()
  const { setMessage, allChats } = useChatStore()
  const [chatLoading, setChatLoading] = useState<boolean>(false)


  if (allChats.length === 0) {
    setMessage({
      by: 'system', msg: "Hey! I'm your chat Assistant for the day <br> How may I help you?",
    })
  }

  const chatRequestHandler = async () => {
    setChatLoading(true)
    const response = await chatQuery({ usertext: userMessage.trim() }, userInfo?.token.access_token)
    if (response) {
      setChatLoading(false)
      setMessage({ by: 'system', msg: response.generated_text })
    }
    else {
      setChatLoading(false)
      setMessage({ by: 'system', msg: 'Something went wrong! Trying again later' })
    }
  }

  /**
   * @description This is basically for scrolling down the chat down automatically
   */
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [allChats]);

  return (
    <>
      <CssBaseline />
      <HeroHeader msg='Let&apos;s Play with AI' />
      <Container fixed>
        {/* CHAT BOX */}
        <Box sx={{ bgcolor: '#FFF7F1', height: '70vh', paddingX: "20px", paddingY: "16px", overflowY: "scroll" }} >
          <Grid container >
            {allChats.map((chat, index) => {
              if (chat) {
                return chat.by === 'system'
                  ? <LeftMessageBar msg={chat.msg} key={index} />
                  : <RightMessageBar msg={chat.msg} key={index} />
              }
              return <></>
            })}
            {chatLoading && <LeftMessageSpinner />}
            <div ref={messagesEndRef} />
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
              onChange={(e) => setUserMessage(e.target.value)}
              value={userMessage!}
              id='inputMessageButton'
            />
          </Grid>
          <Grid xs={1}>
            <Button variant="contained" endIcon={<Send />}
              onClick={() => {
                if (userMessage) {
                  setMessage({ by: 'user', msg: userMessage })
                  chatRequestHandler()
                  setUserMessage('')
                  const element = document.getElementById('inputMessageButton')
                  element?.focus()
                }
              }}
              disabled={chatLoading}
              type='submit'>
              {chatLoading ? <DotLoader /> : 'Send'}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default MainPage