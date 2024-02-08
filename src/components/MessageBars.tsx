import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const Item = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    border: '1px solid',
    borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
    padding: theme.spacing(1),
    margin: theme.spacing(0.4),
    borderRadius: '4px',
    textAlign: 'center',
}));


export const LeftMessageBar = ({ msg }: { msg: string }) => (
    <>
        <Grid xs={6} >
            <Item sx={{
                backgroundColor: "#FAEED1",
                color: "#000",
                borderStartEndRadius: '20px',
                borderEndEndRadius: '20px',
                borderStartStartRadius: '20px',
            }}
                dangerouslySetInnerHTML={{ __html: msg }} />
        </Grid>
        <Grid xs={6}></Grid>
    </>
)

export const RightMessageBar = ({ msg }: { msg: string }) => (
    <>
        <Grid xs={6}></Grid>
        <Grid xs={6}>
            <Item sx={{
                backgroundColor: "#A1EEBD",
                color: "#000",
                borderStartEndRadius: '20px',
                borderStartStartRadius: '20px',
                borderEndStartRadius: '20px'
            }}>{msg}</Item>
        </Grid>
    </>
)