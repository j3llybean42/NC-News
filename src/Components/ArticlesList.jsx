import { useEffect } from "react"
import { getArticles } from "../utils"
import ArticleCard from "./ArticleCard"

export default function ArticlesList({articles, setArticles}) {

    useEffect(() => {
        getArticles().then((data) => {
            const {articles} = data
            setArticles(articles)
        })
    }, [])
    return (
        <div>
            <h2>Articles</h2>
            <ul>
                {articles.map((article) => {
                    return <li key={article.article_id}><ArticleCard article={article}/></li>
                })}
            </ul>
        </div>
    )
}