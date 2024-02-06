import { useEffect, useState } from "react";
import { getComments } from "../utils";
import CommentCard from "./CommentCard";
import { Card } from "react-bootstrap";

export default function CommentsList({ article_id }) {
  const [comments, setComments] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getComments(article_id)
      .then((data) => {
        const { comments } = data;
        setComments(comments);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  }, []);

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

  return (
    <>
      <h3>Comments</h3>
      <ul>
        {comments.length ? (
          comments.map((comment) => {
            return (
              <li key={comment.comment_id}>
                <CommentCard comment={comment} />
              </li>
            );
          })
        ) : (
          <Card>
            <Card.Body>No comments...</Card.Body>
          </Card>
        )}
      </ul>
    </>
  );
}
