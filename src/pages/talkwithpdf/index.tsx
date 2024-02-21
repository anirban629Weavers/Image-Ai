import * as React from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, Container, CssBaseline, Grid } from '@mui/material';
import Input from '@mui/joy/Input';
import Button from '@mui/material/Button';
import Mail from '@mui/icons-material/Mail';
import { CancelPresentation, Send } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { DotLoader, LeftMessageBar, LeftMessageSpinner, RightMessageBar } from '../../components/MessageBars';
import { toast } from 'react-toastify';
import HeroHeader from '../../components/HeroHeader';
import usePDFChatStore from '../../store/usePDFChatStore';
import { pdfChatQuery, uploadPdf } from '../../http/api';
import { useAuthStore } from '../../store';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});


const TalkWithPdf = () => {
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    const [submit, setSubmit] = React.useState<boolean>(false);
    const [userMessage, setUserMessage] = React.useState<string>('')

    const { setMessage, allChats, pdfPath, setPdfPath, deletePdfPath, deleteChats } = usePDFChatStore()
    const { userInfo } = useAuthStore()
    const [chatQueryLoading, setChatQueryLoading] = React.useState<boolean>(false)

    const chatRequestHandler = async () => {
        setChatQueryLoading(true)
        const response = await pdfChatQuery({ question: userMessage.trim(), path: pdfPath }, userInfo?.token.access_token)
        setChatQueryLoading(true)
        if (response) {
            setMessage({ by: 'system', msg: response.answer })
            setChatQueryLoading(false)
        }
        else {
            setSubmit(false)
            setChatQueryLoading(false)
            setMessage({ by: 'system', msg: 'Something went wrong! Trying again later' })
        }
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setSelectedFile(files[0]);
        }
    };

    const handleSubmit = async () => {
        if (selectedFile) {
            setSubmit(!submit);
            const response = await uploadPdf({ uploaded_file: selectedFile }, userInfo?.token.access_token)
            if (response) {
                setPdfPath(response.path)
                setMessage({ by: 'system', msg: "We've your pdf data..! Now ask me anything.." })
            } else {
                setSubmit(false)
                toast.error('Something went wrong!')
            }
        } else {
            toast.warning("No files selected")
        }
    };


    /**
     * @description This is basically for scrolling down the chat down automatically
     * @summary
       const messagesEndRef = React.useRef<HTMLDivElement>(null);
          const scrollToBottom = () => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
           };
       React.useEffect(scrollToBottom, [allChats]);
       <div ref={messagesEndRef} />
     */
    const messagesEndRef = React.useRef<HTMLDivElement>(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    React.useEffect(scrollToBottom, [allChats]);

    return (
        <>
            <CssBaseline />
            <HeroHeader msg='Let&apos;s Talk with PDF' />
            <Container fixed>

                {!submit && !pdfPath ?
                    <>
                        <VisuallyHiddenInput type="file" onChange={handleFileChange} />
                        <input
                            type="file"
                            accept='.pdf'
                            onChange={handleFileChange}
                        />
                        <Button type='submit' onClick={handleSubmit} startIcon={<CloudUploadIcon />} >
                            Submit
                        </Button>
                    </>
                    : <></>}

                {/* CHAT BOX */}
                {submit || pdfPath ?
                    <Container fixed>
                        <div id='scroll-control'>
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
                                    {chatQueryLoading && <LeftMessageSpinner />}
                                    <div ref={messagesEndRef} />
                                </Grid>
                            </Box>
                            {/* CHAT BOX */}
                            <Grid container sx={{ marginTop: '10px' }} gap={1}>
                                <Grid xs={9}>
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
                                        disabled={chatQueryLoading}
                                        type='submit'>
                                        {chatQueryLoading ? <DotLoader /> : 'Send'}

                                    </Button>
                                </Grid>
                                <Grid xs={1}>
                                    <Button variant="outlined" color='error' endIcon={<CancelPresentation />}
                                        onClick={() => {
                                            deletePdfPath()
                                            deleteChats()
                                            setSelectedFile(null)
                                            setSubmit(false)
                                            usePDFChatStore.persist.clearStorage()
                                        }}
                                        type='submit'>
                                        Exit
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                    : <></>
                }
                {/* CHAT BOX */}
            </Container >
        </>
    );
};

export default TalkWithPdf;



