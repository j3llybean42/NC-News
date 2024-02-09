import { useState, useContext } from "react";
import { Link} from "react-router-dom";
import { patchArticle } from "../utils";
import { LuDot } from "react-icons/lu";
import { TfiFaceSad } from "react-icons/tfi";
import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Typography,
} from "@mui/material";
import ForumIcon from "@mui/icons-material/Forum";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

export default function ArticleCard({ article }) {
  const dateCreated = new Date(article.created_at);
  const date = dateCreated.toLocaleDateString();
  const [votes, setVotes] = useState(article.votes);
  const [error, setError] = useState(null);
  const [userVote, setUserVote] = useState(null);

  function handleVoteClick(vote) {
    setUserVote(!userVote ? vote : null);
    setError(null);
    setVotes((currentVotes) => currentVotes + vote);
    patchArticle(article.article_id, { inc_votes: vote }).catch((error) => {
      setVotes((currentVotes) => currentVotes - vote);
      setError("Something went wrong! Please try again");
      setUserVote(null);
    });
  }

  return (
    <>
      <Card>
        <CardMedia
          sx={{ height: 200 }}
          image={article.article_img_url}
          title="article image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <Link to={`/articles/${article.article_id}`}>{article.title}</Link>
          </Typography>
          <Typography variant="body2" color="text-secondary">
            Written by: {article.author} <LuDot /> Date posted: {date} <LuDot /> Topic: {article.topic}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant="outlined"
            href={`/articles/${article.article_id}`}
          >
            Read Article
          </Button>
          <Chip icon={<ForumIcon />} label={article.comment_count} />
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
        </CardActions>
      </Card>
      {error ? (
        <p>
          <TfiFaceSad />
          {error}
        </p>
      ) : null}
      <br />
    </>
  );
}
