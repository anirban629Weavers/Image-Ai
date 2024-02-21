import React, { useState } from "react";
import HeroHeader from "../../components/HeroHeader"
import { toast } from "react-toastify";
import { Box, Container, Grid, Paper, styled } from "@mui/material";
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Textarea, Typography } from "@mui/joy";
import { DNA } from "react-loader-spinner";
import { imageModify } from "../../http/api";
import { useAuthStore } from "../../store";


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

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const ModifyImage = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileUrl, setFileUrl] = useState<string>('');
    const [inputText, setInputText] = useState<string | null>(null)
    const [submit, setSubmit] = useState<boolean>(false);
    const { userInfo } = useAuthStore()
    const [imageFromServer, setImageFromServer] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const handleSubmit = async () => {
        setImageFromServer('')
        setLoading(true)
        if (selectedFile && inputText) {
            setSubmit(!submit);
            console.log(selectedFile, inputText);
            if (userInfo?.token.access_token) {
                const response = await imageModify(
                    {
                        uploaded_file: selectedFile,
                        inputtext: inputText
                    },
                    userInfo.token.access_token
                )
                setLoading(false)
                setImageFromServer(response.improve_image || 'https://t4.ftcdn.net/jpg/05/24/04/51/360_F_524045110_UXnCx4GEDapddDi5tdlY96s4g0MxHRvt.jpg')
            } else {
                setLoading(false)
                toast.warning("Token not found!")
            }
        } else {
            setLoading(false)
            toast.warning("Enter Required Fileds")
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setFileUrl(URL.createObjectURL(files[0]));
            setSelectedFile(files[0]);
        }
    };

    return (
        <>
            <HeroHeader msg='Modify Your own Image' />
            <Container fixed sx={{ marginTop: "3%" }}>
                <Grid container spacing={2} >
                    <Grid item xs={12} md={3} sm={12}>
                        <Item sx={{ border: 'none', boxShadow: 'none' }}>
                            <Box sx={{ my: "auto" }}>
                                <Typography level="h3" sx={{ my: 4 }}>Image</Typography>
                                <VisuallyHiddenInput type="file" onChange={handleFileChange} />
                                <input
                                    type="file"
                                    accept='.pdf, .jpg'
                                    onChange={handleFileChange}
                                />
                            </Box>
                            <Box sx={{ mt: 7 }}>
                                <Typography level="h3" sx={{ my: 4 }}>Describe</Typography>
                                <Textarea
                                    minRows={1}
                                    variant="outlined"
                                    placeholder={'Description'}
                                    onChange={(e) => setInputText(e.target.value)}
                                    value={inputText!}
                                    required
                                />
                            </Box>
                            <Box sx={{ my: 5 }}>
                                <Button type='submit' onClick={handleSubmit} startIcon={<CloudUploadIcon />} >
                                    Submit
                                </Button>
                            </Box>

                        </Item>
                    </Grid>
                    <Grid item xs={6} md={9} sm={12}>
                        <Item sx={{ border: 'none', boxShadow: 'none', mx: 4 }}>
                            {fileUrl &&
                                <Box sx={{ display: "flex", justifyContent: 'space-between', gap: 6 }}>
                                    <Box >
                                        <Typography level="h3">Selected Image</Typography>
                                        <img
                                            src={fileUrl || 'https://www.shutterstock.com/shutterstock/photos/2020488875/display_1500/stock-vector-realistic-yellow-triangle-warning-sign-vector-illustration-2020488875.jpg'}
                                            width={400}
                                            height={400}
                                        />
                                    </Box>
                                    {imageFromServer
                                        ? <Box>
                                            <Typography level="h3">Generated Image</Typography>
                                            <img
                                                src={imageFromServer || 'https://www.shutterstock.com/shutterstock/photos/2020488875/display_1500/stock-vector-realistic-yellow-triangle-warning-sign-vector-illustration-2020488875.jpg'}
                                                width={400}
                                                height={400}
                                            />
                                        </Box>
                                        : <>
                                            {loading && <Box sx={{ my: 12 }}>
                                                <DNA
                                                    visible={true}
                                                    height="150"
                                                    width="150"
                                                    ariaLabel="dna-loading"
                                                    wrapperStyle={{}}
                                                    wrapperClass="dna-wrapper"
                                                />
                                            </Box>}
                                        </>
                                    }
                                </Box>
                            }
                            {
                                !fileUrl && !imageFromServer
                                && <Box sx={{ my: 10 }}>
                                    <Typography level="h3">Select a Image & Ask to do Something</Typography>
                                    <img
                                        src={'https://static.vecteezy.com/system/resources/previews/007/567/154/non_2x/select-image-icon-vector.jpg'}
                                        width={230}
                                        height={230}
                                    />
                                </Box>
                            }
                        </Item>
                    </Grid>
                </Grid>
            </Container >

        </>
    )
}

export default ModifyImage