import { Box, Typography, Button } from "@mui/material";


export default function ErrorHandler({code, msg}){

    return(
        <>
            <Box component="div">
                <Typography variant="h2" fontWeight={"bold"}>Error: {code}</Typography>
                <Typography variant="h3">Uh oh!</Typography>
                <Typography variant="h5">{msg ? msg : "The page you're looking for doesn't exist."}</Typography>
                <Typography variant="body2">Have you checked the URL is correct?</Typography>
                <br/>
                <Button variant="contained" href="/">Back to Home</Button>
            </Box>
        </>
    )
}