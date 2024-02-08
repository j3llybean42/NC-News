import { LuDot } from "react-icons/lu";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
  ButtonGroup,
  IconButton,
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import DeleteComment from "./DeleteComment";

export default function CommentCard({ comment, setComments, setCurrentArticle }) {
  const dateCreated = new Date(comment.created_at);
  const date = dateCreated.toLocaleString();

  return (
    <div>
      <Card>
        <CardHeader
          subheader={
            <>
              {comment.author} <LuDot /> {date}
            </>
          }
        />
        <CardContent>
          <Typography variant="body1">{comment.body}</Typography>
        </CardContent>
        <CardActions>
          <ButtonGroup variant="contained" aria-label="Basic button group">
            <IconButton aria-label="thumbs up" colour="primary" size="small">
              <ThumbUpAltIcon />
            </IconButton>
            <p>{comment.votes}</p>
            <IconButton
              aria-label="thumbs down"
              colour="secondary"
              size="small"
            >
              <ThumbDownAltIcon />
            </IconButton>
          </ButtonGroup>
          <DeleteComment comment={comment} setComments={setComments} setCurrentArticle={setCurrentArticle}/>
        </CardActions>
      </Card>
      <br />
    </div>
  );
}
