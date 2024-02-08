import { Box, Button, Container, TextField } from '@mui/material'
import HeroHeader from '../../components/HeroHeader'
import { useState } from 'react'
import { Send } from '@mui/icons-material'
import { toast } from 'react-toastify'
import { useAuthStore } from '../../store'
import api from "../../http"
import { ITextToImageRes } from '../../@types'
import { } from '@mui/material'
import LoaderWithValue from '../../components/LoaderWithValue'

const TextToImage = () => {
    const [keyWord, setKeyWord] = useState<string | null>(null)
    const [responseFromServer, setResponseFromServer] = useState<ITextToImageRes | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [progress, setProgress] = useState<number>(0)

    const { userInfo } = useAuthStore()

    const textToImageHandler = async () => {
        setProgress(30)
        if (!keyWord) {
            toast.warning("Keyword is required")
        } else {
            setLoading(true)
            setProgress(40)
            const body = {
                "text": keyWord,
                "user_id": userInfo?.user._id
            }
            setProgress(50)
            try {
                setProgress(60)
                const response = await api.POST("/generateimage", body, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userInfo?.token.access_token}`
                    }
                })
                setProgress(80)
                setLoading(false)
                setResponseFromServer(response.data)
                console.log(responseFromServer);
                setProgress(100)
            } catch (error) {
                setLoading(false)
                setProgress(0)
                console.log(error);
                toast.error("Something went wrong")
            }
        }
    }

    return (
        <>
            <HeroHeader msg='Give me a word..! I&apos;ll generate Picture for you' />

            <Container sx={{ display: "flex", justifyContent: "center", marginTop: "3%" }}>
                <TextField
                    label={'Enter Word'}
                    id="margin-none"
                    onChange={(e) => setKeyWord(e.target.value)}
                    value={keyWord!}
                    required
                />
                {!loading
                    ? <Button sx={{ marginX: "5px", }} variant="contained" endIcon={<Send />} onClick={textToImageHandler}>
                        Send
                    </Button >
                    : <Box sx={{ marginTop: "9px" }}>
                        <LoaderWithValue value={progress} />
                    </Box>
                }
            </Container>
            {responseFromServer
                ? <Box sx={{ marginTop: "5%" }}>
                    <HeroHeader msg='Your Awesome Image is here' level='h4' />
                    <Box sx={{ marginTop: "5%", display: "flex", justifyContent: "center" }}>
                        <img src={responseFromServer.image_path} alt="..." width={"20%"} />
                    </Box>
                </Box>
                : <></>
            }
        </>
    )
}

export default TextToImage