import { useEffect, useState } from "react"
import { getArticles } from "../utils"
import ArticleCard from "./ArticleCard"
import { TfiFaceSad } from "react-icons/tfi";
import { CircularProgress } from "@mui/material";
import { useSearchParams } from "react-router-dom";

export default function ArticlesList({articles, setArticles}) {
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams()
    const topic = searchParams.get('topic')

    useEffect(() => {
        setIsLoading(true)
        getArticles({params: {topic}}).then((data) => {
            setIsLoading(false)
            const {articles} = data
            setArticles(articles)
        })
        .catch(() => {
            setIsLoading(false)
            setIsError(true)
        })
    }, [topic])

    if(isLoading) {
        return (
        <>
        <CircularProgress/><p>Loading...</p>
        </>)}

    if(isError) {
        return(
            <>
            <TfiFaceSad /><p>Something went wrong! Please try again.</p>
            </>
        )
    }

    return (
        <section>
            <h2>Articles</h2>
                {articles.map((article) => {
                    return <ArticleCard key={article.article_id} article={article}/>
                })}
        </section>
    )
}