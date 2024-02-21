import { Box, Button, Container, TextField } from '@mui/material'
import HeroHeader from '../../components/HeroHeader'
import { useState } from 'react'
import { Send } from '@mui/icons-material'
import { toast } from 'react-toastify'
import { useAuthStore } from '../../store'
import api from "../../http"
import { ITextToImageRes } from '../../@types'
import { } from '@mui/material'
import { BallTriangle, } from 'react-loader-spinner'

const TextToImage = () => {
    const [keyWord, setKeyWord] = useState<string | null>(null)
    const [responseFromServer, setResponseFromServer] = useState<ITextToImageRes | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const { userInfo } = useAuthStore()

    const textToImageHandler = async () => {
        setResponseFromServer(null)
        if (!keyWord) {
            toast.warning("Keyword is required")
        } else {
            setLoading(true)
            const body = {
                "text": keyWord,
                "user_id": userInfo?.user._id
            }
            try {
                const response = await api.POST("/generateimage", body, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userInfo?.token.access_token}`
                    }
                })
                console.log(response);
                setLoading(false)
                setResponseFromServer(response.data)
            } catch (error) {
                setLoading(false)
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
                <Button sx={{ marginX: "5px", }} variant="contained" endIcon={<Send />} onClick={textToImageHandler}>
                    Send
                </Button >
            </Container>
            {loading &&
                <Box sx={{ marginTop: "5%", display: "flex", justifyContent: "center" }}>
                    <BallTriangle
                        height={100}
                        width={100}
                        radius={5}
                        color="#4fa94d"
                        ariaLabel="ball-triangle-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                </Box>
            }
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