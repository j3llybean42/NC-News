import { useEffect, useState } from "react"
import { getArticles } from "../utils"
import ArticleCard from "./ArticleCard"
import { TfiFaceSad } from "react-icons/tfi";
import { CircularProgress } from "@mui/material";

export default function ArticlesList({articles, setArticles}) {
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        getArticles().then((data) => {
            setIsLoading(false)
            const {articles} = data
            setArticles(articles)
        })
        .catch(() => {
            setIsLoading(false)
            setIsError(true)
        })
    }, [])

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