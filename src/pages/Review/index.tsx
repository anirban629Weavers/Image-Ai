import { useState } from "react"
import { Box, Button, Container, TextField } from '@mui/material'
import HeroHeader from '../../components/HeroHeader'
import { Send } from '@mui/icons-material'
import { BallTriangle, } from 'react-loader-spinner'
import { moderatorAnalysis } from "../../http/api"
import { useAuthStore } from "../../store"
import { toast } from "react-toastify"

const ModeratorReview = () => {
    const [keyWord, setKeyWord] = useState<string | null>(null)
    const [response, setResponse] = useState<Array<string> | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    // const [moderatorArray, setModeratorArray] = useState<string>("")


    const { userInfo } = useAuthStore()

    const submitHandler = async () => {
        setLoading(true)
        if (!keyWord) {
            toast.warning("Blank Field is not allowed")
            setLoading(false)
        } else {
            const response = await moderatorAnalysis({ usertext: keyWord }, userInfo?.token.access_token)
            if (response) {
                setResponse(response.message)
                setLoading(false)
            } else {
                console.log(response);
                toast.warning("Something went wrong!!")
                setLoading(false)
            }
        }
    }

    return (
        <>
            <HeroHeader msg='Moderator Analysis' />

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
                                {response.length > 0
                                    ? <ul>
                                        {response.map((e, indx: number) => <li key={indx}>{e}</li>)}
                                    </ul>
                                    : <h4>Give more information..</h4>
                                }
                            </Box>
                        </>
                        : !loading ? <>
                            <HeroHeader msg='What is sentiment Analysis' level='h4' />
                            <Box sx={{ marginTop: "4%", display: "flex", justifyContent: "center" }}>
                                <ul>
                                    <h4>
                                        Moderator analysis is a statistical technique used in research to examine the effect of an additional variable (the moderator) on the relationship between two other variables. Here's an overview:
                                    </h4>
                                    Purpose:
                                    <li>

                                        Moderator analysis helps researchers understand under what conditions the relationship between two variables changes.It explores whether the strength or direction of the relationship varies depending on different levels of the moderator.
                                    </li>
                                    Methodology:
                                    <li>
                                        Typically conducted using regression analysis or ANOVA, moderator analysis involves including interaction terms between the predictor variable and the moderator variable in the statistical model.This allows researchers to assess whether the moderator influences the relationship between the predictor and the outcome variable.

                                    </li>
                                    Example
                                    <li>
                                        Let's say you're studying the relationship between studying time and exam performance.You suspect that the relationship might be moderated by intelligence level.You would include intelligence level as a moderator variable and test whether the effect of studying time on exam performance varies for different levels of intelligence.
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

export default ModeratorReview

