import {Card, CardActionArea, CardContent, Typography} from '@mui/material'

export default function TopicCard({topic}){
    return(
        <>
        <Card >
            <CardActionArea href={`/articles?topic=${topic.slug}`}>
                <CardContent>
                    <Typography gutterBottom variant='h5' component="div">{topic.slug}</Typography>
                    <Typography variant="body2" color="text.secondary">{topic.description}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
        <br />
        </>
    )
}