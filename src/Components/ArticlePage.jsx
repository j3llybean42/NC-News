import { useEffect, useState, useContext } from "react";
import { getArticleID } from "../utils";
import { useParams } from "react-router-dom";
import CommentsList from "./CommentsList";
import { TfiFaceSad } from "react-icons/tfi";
import { patchArticle } from "../utils";
import { CardHeader, ButtonGroup, Card, CardMedia, Chip, IconButton, CardContent, Typography} from "@mui/material";
import ForumIcon from '@mui/icons-material/Forum';
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { UserContext } from "../contexts/UserContext";

export default function ArticlePage() {
  const { user } = useContext(UserContext);
  const [currentArticle, setCurrentArticle] = useState({});
  const { article_id } = useParams();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [votes, setVotes] = useState(currentArticle.votes);
  const [error, setError] = useState(null);
  const [userVote, setUserVote] = useState(null);

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
    setUserVote(!userVote ? vote : null);
    setError(null);
    setVotes((currentVotes) => currentVotes + vote);
    patchArticle(currentArticle.article_id, { inc_votes: vote }).catch(
      (err) => {
        setVotes((currentVotes) => currentVotes - vote);
        setError(err);
        setUserVote(null);
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
        <ErrorHandler code={error.response.status} msg={error.response.data.msg}/>
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
        <CommentsList article_id={article_id} setCurrentArticle={setCurrentArticle}/>
      </div>
    </>
  );
}
