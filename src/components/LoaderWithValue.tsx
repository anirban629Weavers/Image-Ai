import * as React from 'react';
import CircularProgress, {
    CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CircularProgressWithLabel(
    props: CircularProgressProps & { value: number },
) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" color='success' {...props} />
            <Box
                sx={{
                    top: 2, // Default 0
                    left: 2, // Default 0
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography
                    variant="caption"
                    component="div"
                    color="text.secondary"
                >{`${Math.round(props.value)}%`}</Typography>
            </Box>
        </Box>
    );
}

export default function LoaderWithValue({ value }: { value: number }) {
    const [progress, setProgress] = React.useState(value);

    React.useEffect(() => {
        setProgress(value)
    }, [value]);

    return <CircularProgressWithLabel value={progress} />;
}
