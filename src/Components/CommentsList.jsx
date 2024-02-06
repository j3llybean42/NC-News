import { useEffect, useState } from "react"
import { getComments } from "../utils"
import CommentCard from "./CommentCard"

export default function CommentsList({article_id}) {
    const [comments, setComments] = useState([])

    useEffect(() => {
        getComments(article_id).then((data) => {
            const {comments} = data
            setComments(comments)
        })
    }, [])

    return(
        <>
        <h3>Comments</h3>
        <ul>
        {comments.map((comment) => {
                    console.log(comment)
                    return <li key={comment.comment_id}><CommentCard comment={comment}/></li>
                })}
        </ul>
        </>
    )
}