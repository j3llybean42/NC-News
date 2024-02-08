import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { postComment } from "../utils";
import {
  Box,
  Button,
  Card,
  CardActions,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

export default function CommentAdder({
  setComments,
  article_id,
  setCurrentArticle,
}) {
  const { user } = useContext(UserContext);
  const [userComment, setUserComment] = useState("");
  const [inputError, setInputError] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleInput(input) {
    setInputError(false);
    setUserComment(input);
  }

  function handleSubmit() {
    if (!userComment.length) {
      setInputError(true);
      setIsSubmitted(false);
    }
    setIsSubmitted(true);
    setError(null);
    const date = new Date();
    const userCommentObj = {
        created_at: date,
        comment_id: date,
      article_id,
      body: userComment,
      author: user.username,
    };
    setComments((currentComments) => {
      return [userCommentObj, ...currentComments];
    });
    setCurrentArticle((currentCurrentArticle) => {
      return {
        ...currentCurrentArticle,
        comment_count: ++currentCurrentArticle.comment_count,
      };
    });
    postComment(article_id, { username: user.username, body: userComment })
      .then((result) => {
        const comment = result.data
        setIsSubmitted(false);
        setUserComment("");
        setComments((currentComments) => {
          const updatedComments = [...currentComments];
          updatedComments[0].comment_id = comment.comment_id;
          return [...updatedComments];
        });
      })
      .catch((err) => {
        setIsSubmitted(false);
        setComments((currentComments) => {
          currentComments.shift();
          return [...currentComments];
        });
        setCurrentArticle((currentCurrentArticle) => {
          return {
            ...currentCurrentArticle,
            comment_count: --currentCurrentArticle.comment_count,
          };
        });
        setError("Something went wrong! Please try again");
      });
  }

  return (
    <>
      <Card sx={{ maxWidth: 700 }}>
        <Typography sx={{ fontSize: 14 }}>Add a comment:</Typography>
        <Box component="form">
          <TextField
            id="comment"
            label="Type comment here"
            variant="outlined"
            required
            multiline
            maxRows={3}
            fullWidth
            onChange={(event) => handleInput(event.target.value)}
            helperText={inputError ? "Cannot post empty comment" : null}
            value={userComment}
          />
          <CardActions>
            {isSubmitted ? (
              <LoadingButton
                loading
                variant="outlined"
                loadingIndicator="Posting..."
              ></LoadingButton>
            ) : (
              <Button variant="contained" onClick={handleSubmit}>
                Post Comment
              </Button>
            )}
          </CardActions>
          {error ? (
            <Typography sx={{ fontSize: 12, lineHeight: 1 }}>
              {error}
            </Typography>
          ) : null}
          {isSubmitted ? <Typography sx={{ fontSize: 12, lineHeight: 1 }}>
              Comment posted!
            </Typography> : null}
        </Box>
      </Card>
      <br />
    </>
  );
}
