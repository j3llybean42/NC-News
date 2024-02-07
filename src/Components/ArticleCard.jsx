import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { patchArticle } from "../utils";
import { LuDot } from "react-icons/lu";
import { TfiFaceSad } from "react-icons/tfi";
import {Button, ButtonGroup, Card, CardActions, CardContent, CardMedia, Chip, IconButton, Typography} from "@mui/material"
import ForumIcon from '@mui/icons-material/Forum';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

export default function ArticleCard({ article }) {
  const dateCreated = new Date(article.created_at);
  const date = dateCreated.toLocaleDateString();
  const navigate = useNavigate();
  const [votes, setVotes] = useState(article.votes);
  const [error, setError] = useState(null);

  function handleVoteClick(vote) {
    setError(null);
    setVotes((currentVotes) => currentVotes + vote);
    patchArticle(article.article_id, { inc_votes: vote }).catch((error) => {
      setVotes((currentVotes) => currentVotes - vote);
      setError("Something went wrong! Please try again");
    });
  }

  return (
    <div>
      <Card >
        <CardMedia sx={{height: 200}} image={article.article_img_url} title="article image"/>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div"><Link to={`/articles/${article.article_id}`}>{article.title}</Link></Typography>
          <Typography variant="body2" color="text-secondary">Written by: {article.author} <LuDot/> Date posted: {date}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" variant="outlined" href={`/articles/${article.article_id}`}>Read Article</Button>
          <Chip icon={<ForumIcon/>} label={article.comment_count} />
          <ButtonGroup variant="contained" aria-label="Basic button group">
            <IconButton onClick={() => handleVoteClick(1)} aria-label="thumbs up" colour="primary" size="small"><ThumbUpAltIcon /></IconButton><p>{votes}</p>
            <IconButton onClick={() => handleVoteClick(-1)} aria-label="thumbs down" colour="secondary" size="small"><ThumbDownAltIcon /></IconButton>
          </ButtonGroup>
        </CardActions>
      </Card>
      {error ? (
          <p>
            <TfiFaceSad />
            {error}
          </p>
        ) : null}
        <br/>
    </div>
  );
}
