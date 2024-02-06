import { Card, Stack, Badge, Button } from "react-bootstrap";
import { LuDot } from "react-icons/lu";
import { FaRegArrowAltCircleUp, FaRegArrowAltCircleDown } from "react-icons/fa";

export default function CommentCard({ comment }) {
  const dateCreated = new Date(comment.created_at);
  const date = dateCreated.toLocaleDateString();

  return (
    <div>
      <Card>
        <Card.Header>
          {comment.author} <LuDot /> {date}
        </Card.Header>
        <Card.Body>
          <Card.Text>{comment.body}</Card.Text>
          <Stack direction="horizontal" gap={2}>
            <Badge bg="primary">
            <Button size="sm"><FaRegArrowAltCircleUp /></Button> {comment.votes} <Button size="sm"><FaRegArrowAltCircleDown /></Button>
            </Badge>
          </Stack>
        </Card.Body>
      </Card>
    </div>
  );
}
