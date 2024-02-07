import { useEffect, useState } from "react";
import { getArticleID } from "../utils";
import { useParams } from "react-router-dom";
import CommentsList from "./CommentsList";
import { TfiFaceSad } from "react-icons/tfi";
import { patchArticle } from "../utils";
import { CardHeader, ButtonGroup, Card, CardMedia, Chip, IconButton, CardContent, Typography} from "@mui/material";
import ForumIcon from '@mui/icons-material/Forum';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

export default function ArticlePage() {
  const [currentArticle, setCurrentArticle] = useState({});
  const { article_id } = useParams();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [votes, setVotes] = useState(currentArticle.votes);
  const [error, setError] = useState(null);

  useEffect(() => {
    getArticleID(article_id)
      .then((data) => {
        const { article } = data;
        setCurrentArticle(article);
        setVotes(article.votes);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  }, []);

  function handleVoteClick(vote) {
    setError(null);
    setVotes((currentVotes) => currentVotes + vote);
    patchArticle(currentArticle.article_id, { inc_votes: vote }).catch(
      (error) => {
        setVotes((currentVotes) => currentVotes - vote);
        setError("Something went wrong! Please try again");
      }
    );
  }

  if (isLoading) {
    return (
      <>
        <Spinner animation="border" variant="dark" />
        <p>Loading...</p>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <TfiFaceSad />
        <p>Something went wrong! Please try again.</p>
      </>
    );
  }

  let date = null;
  if (currentArticle.created_at) {
    const dateCreated = new Date(currentArticle.created_at);
    date = dateCreated.toLocaleDateString();
  }

  return (
    <>
      <h2>{currentArticle.title}</h2>
      <h3>Written by: {currentArticle.author}</h3>
      <Card>
        <CardHeader
          subheader={`Date posted: ${date}`}
          action={
            <>
              <Chip icon={<ForumIcon />} label={currentArticle.comment_count} />
              <ButtonGroup variant="contained" aria-label="Basic button group">
                <IconButton
                  onClick={() => handleVoteClick(1)}
                  aria-label="thumbs up"
                  colour="primary"
                  size="small"
                >
                  <ThumbUpAltIcon />
                </IconButton>
                <p>{votes}</p>
                <IconButton
                  onClick={() => handleVoteClick(-1)}
                  aria-label="thumbs down"
                  colour="secondary"
                  size="small"
                >
                  <ThumbDownAltIcon />
                </IconButton>
              </ButtonGroup>
            </>
          }
        />
        <CardMedia component="img" height="350" image={currentArticle.article_img_url}/>
        <CardContent>
          <Typography variant="body1" >{currentArticle.body}</Typography>
        </CardContent>
      </Card>
      {error ? (
        <p>
          <TfiFaceSad />
          {error}
        </p>
      ) : null}
      <br/>
      <div>
        <CommentsList article_id={article_id} />
      </div>
    </>
  );
}
