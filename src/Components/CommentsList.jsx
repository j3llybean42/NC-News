import { useEffect, useState } from "react";
import { getComments } from "../utils";
import CommentCard from "./CommentCard";
import { Card, CardContent } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { TfiFaceSad } from "react-icons/tfi";

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
        <CircularProgress/><p>Loading...</p>
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
        {comments.length ? (
          comments.map((comment) => {
            return (
                <CommentCard key={comment.comment_id} comment={comment} />
            );
          })
        ) : (
          <Card>
            <CardContent>No comments...</CardContent>
          </Card>
        )}
    </>
  );
}
