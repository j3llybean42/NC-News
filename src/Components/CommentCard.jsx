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
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import DeleteComment from "./DeleteComment";
import { patchComment } from "../utils";
import { useState } from "react";

export default function CommentCard({ comment, setComments, setCurrentArticle }) {
  const dateCreated = new Date(comment.created_at);
  const date = dateCreated.toLocaleString();
  const [votes, setVotes] = useState(comment.votes);
  const [error, setError] = useState(null);
  const [userVote, setUserVote] = useState(null);

  function handleVoteClick(vote) {
    setUserVote(!userVote ? vote : null);
    setError(null);
    setVotes((currentVotes) => currentVotes + vote);
    patchComment(comment.comment_id, { inc_votes: vote }).catch((error) => {
      setVotes((currentVotes) => currentVotes - vote);
      setError("Something went wrong! Please try again");
      setUserVote(null);
    });
  }

  return (
    <>
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
          <IconButton
              onClick={() => handleVoteClick(userVote ? -1 : 1)}
              aria-label={userVote === 1 ? "remove vote up" : "vote up"}
              disabled={userVote === -1 ? true : false}
              colour="primary"
              size="small"
            >
              {userVote === 1 ? (<ThumbUpAltIcon />) : (<ThumbUpOffAltIcon/>)}
              
            </IconButton>
            <p>{votes}</p>
            <IconButton
              onClick={() => handleVoteClick(userVote ? 1 : -1)}
              aria-label={userVote === -1 ? "remove vote down" : "vote down"}
              disabled={userVote === 1 ? true : false}
              colour="secondary"
              size="small"
            >
             {userVote === -1 ? (<ThumbDownAltIcon />) : (<ThumbDownOffAltIcon />)}
            </IconButton>
          </ButtonGroup>
          <DeleteComment comment={comment} setComments={setComments} setCurrentArticle={setCurrentArticle}/>
        </CardActions>
      </Card>
      <br />
    </>
  );
}
