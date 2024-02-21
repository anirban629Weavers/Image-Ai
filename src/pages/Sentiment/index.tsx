import { useState } from "react"
import { Box, Button, Container, TextField } from '@mui/material'
import HeroHeader from '../../components/HeroHeader'
import { Send } from '@mui/icons-material'
import { BallTriangle, } from 'react-loader-spinner'
import { sentimentAnalysis } from "../../http/api"
import { useAuthStore } from "../../store"
import { toast } from "react-toastify"

const SentimentAnalysis = () => {
    const [keyWord, setKeyWord] = useState<string | null>(null)
    const [response, setResponse] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    const { userInfo } = useAuthStore()

    const submitHandler = async () => {
        setLoading(true)
        if (!keyWord) {
            toast.warning("Blank Field is not allowed")
            setLoading(false)
        } else {
            const response = await sentimentAnalysis({ usertext: keyWord }, userInfo?.token.access_token)
            if (response) {
                setResponse(response.response)
                setLoading(false)
            } else {
                toast.warning("Something went wrong!!")
                setLoading(false)
            }
        }
    }

    return (
        <>
            <HeroHeader msg='Let&apos; Analysis Sentiment in your words..!' />

            <Container sx={{ display: "flex", justifyContent: "center", marginTop: "3%" }}>
                <TextField
                    label={'Enter Description'}
                    id="margin-none"
                    onChange={(e) => setKeyWord(e.target.value)}
                    value={keyWord!}
                    required
                />
                <Button sx={{ marginX: "5px", }} variant="contained" endIcon={<Send />} onClick={submitHandler}>
                    Submit
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
            <Box sx={{ marginTop: "5%" }}>
                {
                    response
                        ? <>
                            <HeroHeader msg='The Description Consist ' level='h4' />
                            <Box sx={{ marginTop: "5%", display: "flex", justifyContent: "center" }}>
                                {response}
                            </Box>
                        </>
                        : !loading ? <>
                            <HeroHeader msg='What is sentiment Analysis' level='h4' />
                            <Box sx={{ marginTop: "4%", display: "flex", justifyContent: "center" }}>
                                <ul>
                                    <h4>
                                        Sentiment analysis, also referred to as opinion mining, involves analyzing text to determine the emotional tone conveyed within. Here are key points about sentiment analysis:
                                    </h4>
                                    Positive Aspects:
                                    <li>


                                        Provides insights into customer satisfaction levels.
                                        Helps businesses understand public opinion about products or services.
                                        Enables tracking of sentiment trends over time for brands and topics.
                                        Facilitates the identification of positive feedback for marketing purposes.
                                    </li>
                                    Negative Aspects:
                                    <li>


                                        Challenges in accurately interpreting sarcasm, irony, and nuanced language.
                                        Difficulty in handling context-specific sentiments.
                                        Limited effectiveness in analyzing languages with complex grammar or sentiment expressions.
                                        Ethical concerns regarding privacy and the potential misuse of sentiment analysis data.
                                        Neutral Aspects:

                                    </li>
                                    <li>

                                        Can be applied across various domains including social media, customer reviews, and news articles.
                                        Utilizes natural language processing and machine learning techniques for classification.
                                        Continuously evolving with advancements in technology and data analytics.
                                        Offers valuable insights for decision-making in business, marketing, and research contexts.
                                    </li>
                                </ul>
                            </Box>
                        </>
                            : <></>
                }
            </Box>
        </>
    )
}

export default SentimentAnalysis