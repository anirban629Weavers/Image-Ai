import * as React from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, Container, CssBaseline, Grid } from '@mui/material';
import Input from '@mui/joy/Input';
import Button from '@mui/material/Button';
import Mail from '@mui/icons-material/Mail';
import { Send } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { LeftMessageBar, RightMessageBar } from '../../components/MessageBars';
import { Typography } from '@mui/joy';
import { toast } from 'react-toastify';
import HeroHeader from '../../components/HeroHeader';

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
    const [userMessage, setUserMessage] = React.useState<string | null>(null)
    const [submit, setSubmit] = React.useState<boolean>(false);
    const [dummyMessages, setDummyMessages] = React.useState<Array<React.ReactElement>>(
        [
            <LeftMessageBar msg='Hey What&apos;s Up' />,
            <LeftMessageBar msg={`Please Upload the pdf ☝️`} />,
            <RightMessageBar msg='I&apos;ll Upload' />,
        ]
    )

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setSelectedFile(files[0]);
        }
    };

    const handleSubmit = () => {
        if (selectedFile) {
            setSubmit(!submit);
            console.log(selectedFile);
        } else {
            toast.warning("No files selected")
        }
    };

    return (
        <>
            <CssBaseline />
            <HeroHeader msg='Let&apos;s Talk with PDF' />
            <Container fixed>

                <Typography level="h4" sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "12px",
                    marginBottom: "10px"
                }}>
                    {submit && selectedFile?.name ?
                        <>{selectedFile.name}</>
                        : <>Enter the pdf</>}
                </Typography>

                {!submit ?
                    <>
                        <VisuallyHiddenInput type="file" onChange={handleFileChange} />
                        <input
                            type="file"
                            accept='.pdf, .jpg'
                            onChange={handleFileChange}
                        />
                        <Button type='submit' onClick={handleSubmit} startIcon={<CloudUploadIcon />} >
                            Submit
                        </Button>
                    </>
                    : <></>}

                {/* CHAT BOX */}
                {submit ?
                    <>
                        <Box sx={{ bgcolor: '#FFF7F1', height: '70vh', paddingX: "20px", paddingY: "16px", overflowY: "scroll" }} >
                            <Grid container >
                                {dummyMessages.map((msg, index) => <React.Fragment key={index}>{msg}</React.Fragment>)}
                            </Grid>
                        </Box>


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
                            <Grid xs={1} >
                                <Button variant="contained" endIcon={<Send />}
                                    onClick={() => {
                                        if (userMessage) {
                                            setDummyMessages([...dummyMessages, <RightMessageBar msg={userMessage!} />])
                                            setUserMessage('')
                                            const element = document.getElementById('inputMessageButton')
                                            element?.focus()
                                        }
                                    }}>
                                    Send
                                </Button>
                            </Grid>
                        </Grid>
                    </>
                    : <></>
                }
                {/* CHAT BOX */}
            </Container >
        </>
    );
};

export default TalkWithPdf;



