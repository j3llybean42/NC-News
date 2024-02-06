import { Card, Stack, Badge } from "react-bootstrap";
import { LuDot } from "react-icons/lu";
import { LuVote } from "react-icons/lu";

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
              <LuVote /> {comment.votes}
            </Badge>
          </Stack>
        </Card.Body>
      </Card>
    </div>
  );
}
