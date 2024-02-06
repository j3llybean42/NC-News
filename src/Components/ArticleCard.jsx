import {Badge, Card, Stack} from 'react-bootstrap'
import { FaRegComments } from "react-icons/fa";
import { LuVote } from "react-icons/lu";

export default function ArticleCard({ article }) {
    const dateCreated = new Date(article.created_at)
    const date = dateCreated.toLocaleDateString()
  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>{article.title}</Card.Title>
          <Card.Subtitle>Written by: {article.author}</Card.Subtitle>
          <Card.Img src={article.article_img_url} />
          <Card.Text>
            Topic: {article.topic} Date posted: {date}
          </Card.Text>
          <Stack direction="horizontal" gap={2}>
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
