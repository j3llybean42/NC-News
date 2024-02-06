import { useEffect, useState } from "react";
import { getArticleID } from "../utils";
import { Card, Stack, Badge } from "react-bootstrap";
import { FaRegComments } from "react-icons/fa";
import { LuVote } from "react-icons/lu";
import { useParams } from "react-router-dom";
import CommentsList from "./CommentsList";

export default function ArticlePage() {
  const [currentArticle, setCurrentArticle] = useState({});
  const { article_id } = useParams();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getArticleID(article_id).then((data) => {
      const { article } = data;
      setCurrentArticle(article);
    }).catch(() => {
        setIsLoading(false)
        setIsError(true)
    })
}, [])

if(isLoading) {
    return (
    <>
    <Spinner animation="border" variant="dark" /><p>Loading...</p>
    </>)}

if(isError) {
    return(
        <>
        <TfiFaceSad /><p>Something went wrong! Please try again.</p>
        </>
    )
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
              <LuVote /> {currentArticle.votes}
            </Badge>
          </Stack>
        </Card.Header>
        <Card.Body>{currentArticle.body}</Card.Body>
      </Card>
      <div>
        <CommentsList article_id={article_id}/>
      </div>
    </>
  );
}
