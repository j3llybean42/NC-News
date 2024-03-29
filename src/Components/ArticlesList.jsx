import { useEffect, useState } from "react"
import { getArticles } from "../utils"
import ArticleCard from "./ArticleCard"
import { TfiFaceSad } from "react-icons/tfi";
import { CircularProgress } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import ArticleSort from "./ArticleSort";
import ErrorHandler from "./ErrorHandler";

export default function ArticlesList({articles, setArticles, topics}) {
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams] = useSearchParams()
    const [error, setError] = useState(null)

    const topicQuery = searchParams.get('topic')
    const sortQuery = searchParams.get('sort_by')
    const orderQuery = searchParams.get('order')

    useEffect(() => {
        setIsLoading(true)
        getArticles({params: {topic: topicQuery, sort_by: sortQuery, order: orderQuery}}).then((data) => {
            setIsLoading(false)
            const {articles} = data
            setArticles(articles)
        })
        .catch((err) => {
            setIsLoading(false)
            setIsError(true)
            setError(err)
        })
    }, [topicQuery, sortQuery, orderQuery])

    if(isLoading) {
        return (
        <>
        <CircularProgress/><p>Loading...</p>
        </>)}

    if(isError) {
        return(
            <>
            <ErrorHandler code={error.response.status} msg={error.response.data.msg}/>
            </>
        )
    }

    return (
        <section>
            <h2>Articles</h2>
            <ArticleSort topics={topics}/>
            <p>Currently viewing articles relating to: {topicQuery ? topicQuery : "All topics"}</p>
                {articles.map((article) => {
                    return <ArticleCard key={article.article_id} article={article}/>
                })}
        </section>
    )
}