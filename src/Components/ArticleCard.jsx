import {Badge, Button, Card, Stack} from 'react-bootstrap'
import { FaRegComments } from "react-icons/fa";
import { LuVote } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';

export default function ArticleCard({ article }) {
    const dateCreated = new Date(article.created_at)
    const date = dateCreated.toLocaleDateString()
    const navigate = useNavigate()

    function handleClick(){
      navigate(`/articles/${article.article_id}`)
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
            <Button variant="outline-primary" onClick={handleClick}>Read Article</Button>
            <Badge bg="primary">
              <FaRegComments /> {article.comment_count}
            </Badge>
            <Badge bg="primary">
              <LuVote /> {article.votes}
            </Badge>
          </Stack>
        </Card.Body>
      </Card>
    </div>
  );
}
