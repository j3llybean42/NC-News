import { LuDot } from "react-icons/lu";
import { Card, CardActions, CardContent, CardHeader, Typography, ButtonGroup, IconButton } from "@mui/material";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

export default function CommentCard({ comment }) {
  const dateCreated = new Date(comment.created_at);
  const date = dateCreated.toLocaleDateString();

  return (
    <div>
      <Card>
        <CardHeader subheader={<>{comment.author} <LuDot/> {date}</>}/>
        <CardContent>
        <Typography variant="body1" >{comment.body}</Typography>
        </CardContent>
        <CardActions>
        <ButtonGroup variant="contained" aria-label="Basic button group">
            <IconButton aria-label="thumbs up" colour="primary" size="small"><ThumbUpAltIcon /></IconButton><p>{comment.votes}</p>
            <IconButton aria-label="thumbs down" colour="secondary" size="small"><ThumbDownAltIcon /></IconButton>
          </ButtonGroup>
        </CardActions>
      </Card>
      <br/>
    </div>
  );
}
