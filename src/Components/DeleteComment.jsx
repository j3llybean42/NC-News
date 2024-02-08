import { Button, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { deleteComment } from "../utils";

export default function DeleteComment({
  comment,
  setComments,
  setCurrentArticle,
}) {
  const { user } = useContext(UserContext);
  const [hasClicked, setHasClicked] = useState(false);
  const [error, setError] = useState(null);

  function handleDelete() {
    setHasClicked(true);
    setError(null)
    deleteComment(comment.comment_id).then(() => {
        setCurrentArticle((currentCurrentArticle) => {
            return {...currentCurrentArticle, comment_count: --currentCurrentArticle.comment_count}
        })
        setComments((currentComments) => {
            const updatedComments = currentComments.filter((eachComment) => eachComment.comment_id !== comment.comment_id)
            return [...updatedComments]
        })
    }).catch(() => {
        setHasClicked(false)
        setError("Something went wrong! Please try again")
    })
  }

  return (
    <>
      {user.username === comment.author ? (
        <Button
          size="small"
          disabled={hasClicked}
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
        >
          Delete Comment
        </Button>
      ) : null}
      {error ? (
            <Typography sx={{ fontSize: 12, lineHeight: 1 }}>
              {error}
            </Typography>
          ) : null}
    </>
  );
}
