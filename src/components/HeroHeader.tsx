import { Typography, TypographySystem } from '@mui/joy'

const HeroHeader = ({ msg, level = 'h1' }: { msg: string, level: keyof TypographySystem | "inherit" | undefined }) => {
    return (
        <Typography level={level} sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "12px",
            marginBottom: "10px"
        }}>
            {msg}
        </Typography>)
}
HeroHeader.defaultProps = {
    level: "h1"
}

export default HeroHeader