import { useEffect, useState } from "react";
import { getArticleID } from "../utils";
import { Card, Stack, Badge, Button } from "react-bootstrap";
import {
  FaRegComments,
  FaRegArrowAltCircleUp,
  FaRegArrowAltCircleDown,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import CommentsList from "./CommentsList";
import { TfiFaceSad } from "react-icons/tfi";
import { patchArticle } from "../utils";

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
        setVotes(article.votes)
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  }, []);

  function handleVoteClick(vote) {
    setError(null);
    setVotes((currentVotes) => currentVotes + vote);
    patchArticle(currentArticle.article_id, { inc_votes: vote }).catch((error) => {
      setVotes((currentVotes) => currentVotes - vote);
      setError("Something went wrong! Please try again");
    });
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
        <Card.Header>
          Date posted: {date} Topic: {currentArticle.topic}
          <Stack direction="horizontal" gap={2}>
            <Badge bg="primary">
              <FaRegComments /> {currentArticle.comment_count}
            </Badge>
            <Badge bg="primary">
              <Button size="sm" onClick={() => handleVoteClick(1)}>
                <FaRegArrowAltCircleUp />
              </Button>{" "}
              {votes}{" "}
              <Button size="sm" onClick={() => handleVoteClick(-1)}>
                <FaRegArrowAltCircleDown />
              </Button>
            </Badge>
          </Stack>
        </Card.Header>
        <Card.Body>{currentArticle.body}</Card.Body>
      </Card>
      {error ? (
          <p>
            <TfiFaceSad />
            {error}
          </p>
        ) : null}
      <div>
        <CommentsList article_id={article_id} />
      </div>
    </>
  );
}
