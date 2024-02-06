import { useState } from "react";
import { Badge, Button, Card, Stack } from "react-bootstrap";
import {
  FaRegComments,
  FaRegArrowAltCircleUp,
  FaRegArrowAltCircleDown,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { patchArticle } from "../utils";
import { TfiFaceSad } from "react-icons/tfi";

export default function ArticleCard({ article }) {
  const dateCreated = new Date(article.created_at);
  const date = dateCreated.toLocaleDateString();
  const navigate = useNavigate();
  const [votes, setVotes] = useState(article.votes);
  const [error, setError] = useState(null);

  function handleClick() {
    navigate(`/articles/${article.article_id}`);
  }

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
      <Card bg="dark" text="light">
        <Card.Body>
          <Card.Title>{article.title}</Card.Title>
          <Card.Subtitle>Written by: {article.author}</Card.Subtitle>
          <Card.Img src={article.article_img_url} />
          <Card.Text>
            Topic: {article.topic} Date posted: {date}
          </Card.Text>
          <Stack direction="horizontal" gap={2}>
            <Button variant="outline-primary" onClick={handleClick}>
              Read Article
            </Button>
            <Badge bg="primary">
              <FaRegComments /> {article.comment_count}
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
        </Card.Body>
        
      </Card>
      {error ? (
          <p>
            <TfiFaceSad />
            {error}
          </p>
        ) : null}
    </div>
  );
}
